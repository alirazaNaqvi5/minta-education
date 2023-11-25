import Cors from 'cors'
import initMiddleware from '@/lib/init-middleware'
import jwt from 'jsonwebtoken'
import { Test, Question, Option, users as User, courses as Course } from '@/models/index'

// Initialize the cors middleware
const cors = initMiddleware(
    Cors({
        methods: ['GET', 'POST', 'OPTIONS'],
    })
)

export default async (req, res) => {
    await cors(req, res)

    if (!("authorization" in req.headers)) {
        return res.status(401).json({ message: "No authorization token" })
    }

    const {
        title,
        courseId,
        questions
    } = req.body

    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await User.findOne({ where: { id: userId } })

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const course = await Course.findOne({ where: { id: courseId, userId } })

        if (!course) {
            return res.status(400).json({ message: "Course not found" })
        }

        const test = await Test.create({ title, courseId: course.id, userId: user.id })

        for (const question of questions) {
            const createdQuestion = await Question.create({ text: question.questionText, testId: test.id })

            for (const option of question.options) {
                await Option.create({ text: option.optionText, questionId: createdQuestion.id })
                
                if(option.isCorrect) {
                    createdQuestion.correctAnswer = option.optionText;
                    await createdQuestion.save();
                }
            }
        }

        res.status(201).json({ message: "Test created successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
}
