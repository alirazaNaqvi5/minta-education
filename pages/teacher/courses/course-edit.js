import React from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import PageBanner from '@/components/Common/PageBanner'
import Link from '@/utils/ActiveLink'
import { useRouter } from 'next/router'
import ReactSwitch from 'react-switch'

const courseEdit = ({ courses }) => {
    const router = useRouter()
    const token = parseCookies()
    const formRef = React.useRef(null)
    const deleteCourse = async (id) => {
        const url = `${baseUrl}/api/v1/courses/course/remove`

        // open react bootstrap confirm modal
        const willDelete = confirm('Are you sure you want to delete this course?')
        if(!willDelete) return

        const response = await axios.post(url, {id},{
            headers: {Authorization: token}
        })
        router.push('/teacher/courses/course-edit')
    }

    return (
        <React.Fragment>
            <PageBanner 
                pageTitle="Course Edit" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Course Edit" 
            /> 

            <div className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-lg-4">
                            <div className="td-sidebar">
                                <ul>
                                    <li>
                                        <Link href="/teacher/courses" activeClassName="active">
                                            <a>My Courses</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/teacher/course/create" activeClassName="active">
                                            <a>Create A Course</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/teacher/courses/course-edit" activeClassName="active">
                                            <a>Edit My Course</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/teacher/course/upload-course-video" activeClassName="active">
                                            <a>Upload Course Video</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-8 col-lg-8">
                            <div className="table-responsive">
                                <table className="table vertical-align-top">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Courses</th>
                                            <th scope="col" className="text-right">Action</th> 
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {courses.length ? courses.map(course => (
                                            <tr key={course.id}>
                                                <th scope="row">1</th>
                                                <td>
                                                    {course.title}
                                                </td>
                                                <td className="text-right">
                                                    <Link href="/teacher/course/[id]" as={`/teacher/course/${course.id}`}>
                                                        <a className="btn btn-success">
                                                            <i className='bx bxs-edit'></i> Edit
                                                        </a>
                                                    </Link>
                                                    <a 
                                                        onClick={() => deleteCourse(course.id)}
                                                    className="btn btn-danger ms-1 ">
                                                            <i className='bx bxs-trash'></i> Delete
                                                        </a>
                                                        <form method="POST" ref={formRef} className='btn'>
                                                            <ReactSwitch
                                                                checked={course.published}
                                                                onChange={(e) => {
                                                                    const published = e
                                                                    formRef.current.published.value = published
                                                                    formRef.current.submit()
                                                                }}
                                                                className="react-switch"
                                                                id="normal-switch"
                                                                name="published"
                                                            />
                                                            <input type="hidden" name="courseId" value={course.id} />
                                                        </form>
                                                </td> 
                                                
                                            </tr>
                                        )): (
                                            <tr className="text-center">
                                                <td colSpan="3">Empty</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

// courseEdit.getInitialProps = async ctx => {
//     const { token } = parseCookies(ctx)
//     if(!token){
//         return {courses: []}
//     }

//     const payload = {
//         headers: {Authorization: token}
//     }

//     const url = `${baseUrl}/api/v1/courses/my-courses`
//     const response = await axios.get(url, payload)
//     // console.log(response.data)
//     return response.data
// }

import qs from 'querystring'
import getRawBody from 'raw-body'
export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx)
    if(!token){
        return {props: {courses: []}}
    }
    
    const {courses} = await import('@/models/index')
    const body = qs.parse((await getRawBody(ctx.req)).toString('utf-8'))
    const payload = {
        headers: {Authorization: token}
    }

    if(ctx.req.method === 'POST'){
        const { published,courseId } = body
        console.log(`------------------------>>>>>>>>>>>>>>>>>>>>>>>>`,published,courseId)
        
        await courses.update({published}, {where: {id: courseId}})
    }
        
    const url = `${baseUrl}/api/v1/courses/my-courses`
    const response = await axios.get(url, payload)
    // console.log(response.data)
    return {props: response.data}
}

export default courseEdit
