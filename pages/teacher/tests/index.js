import React from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import PageBanner from '@/components/Common/PageBanner'
import Link from '@/utils/ActiveLink'
import { useRouter } from 'next/router'

import { Container, Button, Table } from 'react-bootstrap'
import { verify } from 'jsonwebtoken'
const TestPreview = ({ tests }) => {
    const router = useRouter()

    return (
        <React.Fragment>
            <PageBanner 
                pageTitle="Test Preview" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Test Preview" 
            /> 

            <Container className="pt-5">
                <Button variant="outline-success" onClick={() => router.push('/teacher/tests/create')}>Create New Test</Button>

                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Test Title</th>
                            <th>Course</th>
                            <th>Number of Questions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tests.length ? tests.map((test, index) => (
                            <tr key={test.id}>
                                <td>{index + 1}</td>
                                <td>{test.title}</td>
                                <td>{test.Course.title}</td>
                                <td>{test.Questions.length}</td>
                                <td>
                                    <Link href={`/teacher/tests/${test.id}`}>
                                        <Button variant="outline-primary">View Test</Button>
                                    </Link>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center">No tests found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </React.Fragment>
    )
}

export async function getServerSideProps (ctx) {
    const { courses,Test,Question } = await import('@/models/index')
    const {token} = parseCookies(ctx)
   
    try {
        const { userId } = verify(token, process.env.JWT_SECRET)
        const tests = await Test.findAll({ where: { userId }, include: [
            { model: courses },
            { model: Question}
        ] })
        return { props : {tests: JSON.parse(JSON.stringify(tests)) } }
    } catch (err) {
        console.error(`----Error while fetching tests----\n`, err)
        return { props : {tests: []} }
    }
}

export default TestPreview
