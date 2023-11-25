import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import { Button, Card, Container } from 'reactstrap'

const TestAttempt = ({ test, score }) => {

    return (
        <>
            <PageBanner
                pageTitle={test.title}
                homePageUrl="/"
                homePageText="Home"
                activePageText="Test Attempt"
            />
            <Container >
                {
                    score ? <div className='d-flex justify-content-center'>
                        <Card className='p-3' style={{ width: '50%',fontSize:'25px' }}>
                            <p className='text-success text-center'>Congratulations!</p>
                            <p className='text-center'>Your Score</p>
                            <p className='text-center'>{score}</p>
                        </Card>
                    </div>

                        :
                        <form method='POST' >

                            {test.Questions.map((question, index) => (
                                <Card key={index} className="my-3 p-2">
                                    <p className='mb-2 font-bold' style={{ fontSize: '22px' }}>{question.text}</p>
                                    <div className='d-flex justify-space-between'
                                        style={{ width: '100%', borderTop: '1px solid #ccc' }}
                                    >

                                        {question.Options.map((option, index) => (
                                            <Card key={index} className='p-2' style={{
                                                flex: 1,
                                                border: 'none'
                                            }}>
                                                <div className='d-flex'>

                                                    <input
                                                        type="radio"
                                                        id={`question-${question.id}-option-${option.id}`}
                                                        name={question.id}
                                                        value={option.id}

                                                    />
                                                    <label className='ms-2' htmlFor={`question-${question.id}-option-${option.id}`}>{option.text}</label>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </Card>
                            ))}
                            <div className='d-flex pb-3 justify-content-center'>

                                <Button color='outline-danger' type="submit">Submit</Button>
                            </div>
                        </form>
                }
            </Container>
        </>
    )
}

import qs from 'querystring'
import { parseCookies } from 'nookies'
import { verify } from 'jsonwebtoken'
import getRawBody from 'raw-body'

export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx)
    const { req, params } = ctx
    if (!token) {
        return {
            props: {
                test: {},
                error: 'Not authorized'
            }
        }
    }
    

    const { Test, Question, Option, TestAttempt } = await import('@/models/index')

    const { userId } = verify(token, process.env.JWT_SECRET)

    const alreadyAttempted = await TestAttempt.findOne({
        where: {
            testId: params.id,
            userId 
        }
    })

    if (alreadyAttempted) {
        return {
            props: {
                test: {},
                score: alreadyAttempted.score
            }
        }
    }


    const test = await Test.findOne({
        where: { id: params.id },
        include: [
            {
                model: Question,
                include: [Option]
            }
        ]
    })


    if (req.method === 'POST') {
        const answers = qs.parse((await getRawBody(req)).toString('utf-8'))


        let score = 0
        Object.keys(answers).forEach(questionId => {
            const answer = answers[questionId]
            const question = test.Questions.find(q => q.id == (questionId))
            const answerOption = question.Options.find(o => o.id == (answer))
            console.log(question, answerOption.text)
            const isCorrect = question.correctAnswer == answerOption.text
            if (isCorrect) {
                score += 1
            }
        })
        
        await TestAttempt.create({
            score,
            userId,
            testId : test.id
        })

        return {
            props: {
                test: JSON.parse(JSON.stringify(test)),
                score
            }
        }
    }

    // delete correctAnswer property from questions
    test.Questions.forEach(q => {
        delete q.correctAnswer
    })


    return {
        props: { test: JSON.parse(JSON.stringify(test)) },
    }
}

export default TestAttempt
