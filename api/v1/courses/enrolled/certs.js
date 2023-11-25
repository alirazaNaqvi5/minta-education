import Cors from 'cors'
import initMiddleware from '@/lib/init-middleware'
import jwt from 'jsonwebtoken'
import {
    courses as Course,
    users as User,
    enroled_courses as Enroled_courses,
    watched_videos,
    certificates,
    videos,
} from '@/models/index'

// Initialize the cors middleware
const cors = initMiddleware(
    Cors({
        methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
    })
)

export default async (req, res) => {
    await cors(req, res)

    if (!("authorization" in req.headers)) {
        return res.status(401).json({ message: "No authorization token" });
    }

    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

        // Fetch enrolled courses for the user
        const enrolledCourses = await Enroled_courses.findAll({
            where: { userId: userId }
        })
        
        let certs = []
        for (const enrolledCourse of enrolledCourses) {
            // Fetch videos for each course
            const courseVideos = await videos.findAll({
                where: { courseId: enrolledCourse.courseId }
            })

           

            // Fetch watched videos for the user for each course
            const watchedVideos = await watched_videos.findAll({
                where: { userId: userId, videoId: courseVideos.map(video => video.id) }
            })

            

            // Compare the number of course videos and watched videos
            if (courseVideos.length === watchedVideos.length) {
                const existingcert = await certificates.findOne({
                    where: { userId: userId, courseId: enrolledCourse.courseId }
                })
             

                if (existingcert) {
                    certs.push(existingcert)
                    continue
                } else {
                    const certificate = await certificates.create({
                        userId: userId,
                        courseId: enrolledCourse.courseId
                    })
                    certs.push(certificate)
                }
            }
        }

        // Send the response back to the client
        res.send({
            message: "Certificate generated",
            certificates: certs
        })
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
}

