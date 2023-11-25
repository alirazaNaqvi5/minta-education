import React, { useState } from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import PageBanner from '@/components/Common/PageBanner'
import { Form, Button, Card, ListGroup, Row, Col, Container } from 'react-bootstrap'
import { useRouter } from 'next/router'

const TestCreate = ({ courses }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [title, setTitle] = useState('')
    const [courseId, setCourseId] = useState('')
    const [questions, setQuestions] = useState([
        { questionText: '', options: [{ optionText: '', isCorrect: false }] }
    ])

    const addQuestion = () => {
        setQuestions([...questions, { questionText: '', options: [{ optionText: '', isCorrect: false }] }])
    }

    const addOption = (questionIndex) => {
        const newQuestions = [...questions]
        newQuestions[questionIndex].options.push({ optionText: '', isCorrect: false })
        setQuestions(newQuestions)
    }

    const removeQuestion = (questionIndex) => {
        const newQuestions = [...questions]
        newQuestions.splice(questionIndex, 1)
        setQuestions(newQuestions)
    }

    const removeOption = (questionIndex, optionIndex) => {
        const newQuestions = [...questions]
        newQuestions[questionIndex].options.splice(optionIndex, 1)
        setQuestions(newQuestions)
    }

    const handleQuestionChange = (e, questionIndex) => {
        const newQuestions = [...questions]
        newQuestions[questionIndex].questionText = e.target.value
        setQuestions(newQuestions)
    }

    const handleOptionChange = (e, questionIndex, optionIndex) => {
        const newQuestions = [...questions]
        newQuestions[questionIndex].options[optionIndex].optionText = e.target.value
        setQuestions(newQuestions)
    }

    const handleCorrectChange = (questionIndex, optionIndex) => {
        const newQuestions = [...questions]
        newQuestions[questionIndex].options.forEach((option, index) => {
            option.isCorrect = index === optionIndex
        })
        setQuestions(newQuestions)
    }

       // ...continued from previous

       const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            setLoading(true)
        const url = `${baseUrl}/api/v1/tests/test-create`
        const {token} = parseCookies()
        const payload = { title, courseId, questions }
        const headers = { headers: { Authorization: token } }
        const response = await axios.post(url, payload, headers)
        setLoading(false)
        router.push('/teacher/tests')
        } catch(error){
            setError(error.response.data)
            setLoading(false)
        }
    }

    return (
        <React.Fragment>
            <PageBanner
                pageTitle="Test Creation"
                homePageUrl="/"
                homePageText="Home"
                activePageText="Test Creation"
            />

            <Container className="pt-5">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="testTitle">
                        <Form.Label>Test Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter test title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="courseSelect">
                        <Form.Label>Course</Form.Label>
                        <Form.Control as="select" value={courseId} onChange={(e) => setCourseId(e.target.value)} required>
                            <option value="">--Select a course--</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.title}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    {questions.map((question, questionIndex) => (
                        <Card className="mt-4" key={questionIndex}>
                            <Card.Body>
                                <Form.Group controlId={`question${questionIndex}`}>
                                    <Form.Label>Question</Form.Label>
                                    <Form.Control type="text" placeholder={`Question ${questionIndex + 1}`} value={question.questionText} onChange={(e) => handleQuestionChange(e, questionIndex)} required />
                                </Form.Group>

                                {question.options.map((option, optionIndex) => (
                                    <Card className="mt-1" key={optionIndex}>
                                    <Form.Group controlId={`question${questionIndex}Option${optionIndex}`} key={optionIndex}>
                                        <Row className='d-flex align-items-center'>
                                            <Col>
                                                <Form.Label className='p-2'>Option</Form.Label>
                                                <Form.Control type="text" placeholder={`Option ${optionIndex + 1}`} value={option.optionText} onChange={(e) => handleOptionChange(e, questionIndex, optionIndex)} required />
                                            </Col>

                                            <Col xs="auto">
                                                <Form.Check type="radio" label="Correct" checked={option.isCorrect} onChange={() => handleCorrectChange(questionIndex, optionIndex)} />
                                            </Col>

                                            <Col xs="auto">
                                                <Button variant="outline-danger"  onClick={() => removeOption(questionIndex, optionIndex)}>Remove Option</Button>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    </Card>
                                ))}
                                <div className='d-flex justify-content-center'>
                                <Button variant="outline-success" className='m-2 self-center' onClick={() => addOption(questionIndex)}>Add Option</Button>
                                </div>
                            </Card.Body>

                            <Card.Footer className='d-flex justify-content-end'>
                                <Button variant="outline-danger" onClick={() => removeQuestion(questionIndex)}>Remove Question</Button>
                            </Card.Footer>
                        </Card>
                    ))}

<div className='d-flex justify-content-center flex-column align-items-center'>

                    <Button variant="outline-success" className="mt-4" onClick={addQuestion}>Add Question</Button>

                    <Button 
                    className='m-4'
                    size='lg'
                    disabled={
                        title.length === 0 ||
                        courseId.length === 0 ||
                        questions.length === 0 ||
                        questions.some((question) => question.questionText.length === 0) ||
                        questions.some((question) => question.options.length === 0) ||
                        questions.some((question) => question.options.some((option) => option.optionText.length === 0)) ||
                        questions.some((question) => question.options.filter((option) => option.isCorrect).length === 0) ||
                        loading
                        
                    }
                    variant="outline-primary" type="submit">Create Test</Button>
                    </div>
                </Form>
            </Container>
        </React.Fragment>
    )
}

TestCreate.getInitialProps = async ctx => {
    const { token } = parseCookies(ctx)
    if (!token) {
        return { courses: [] }
    }

    const payload = {
        headers: { Authorization: token }
    }

    const url = `${baseUrl}/api/v1/courses/my-courses`
    const response = await axios.get(url, payload)
    return response.data
}

export default TestCreate
