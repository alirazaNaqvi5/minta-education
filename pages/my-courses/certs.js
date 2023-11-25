import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import CourseCard from '@/components/Courses/CourseCard'
import CertificateCard from '@/components/Courses/CertificateCard'


const MyCourses = ({ certificates,user }) => {

    return (
        <React.Fragment>
            <PageBanner
                pageTitle="My Certificates"
                homePageUrl="/"
                homePageText="Home"
                activePageText={"My Certificates"}
            />
            {
                certificates.length > 0 ? (
                    <>
                        {
                            certificates.map(cert => (
                                <>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12">
                                                <div className="empty-cart-area d-flex m-2">
                                                    
                                                    <CertificateCard course={cert.course.existingData} userName={user.name}/>
                                                    <div style={{flex:1}}>
                                                    </div>
                                                    {/* <CourseCard {...cert.course.existingData} /> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='m-4'/>

                                </>
                            ))
                        }
                    </>
                ) : (
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="empty-cart-area">
                                    <h3>No Certificates Found</h3>
                                    <Link href="/courses">
                                        <a className="default-btn">
                                            View Courses
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            }
            <div className="pt-100 pb-70">
                <div className="container">
                    <div className="row">

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

MyCourses.getInitialProps = async ctx => {
    const { token } = parseCookies(ctx)
    try {

        if (!token) {
            return { certs: [] }
        }

        const payload = {
            headers: { Authorization: token }
        }

        const url = `${baseUrl}/api/v1/courses/enrolled/certs`
        const response = await axios.get(url, payload) //{"id":"73a357ce-30e6-4673-9362-3e0185bc7daa","issuedAt":"2023-06-17T18:15:55.639Z","userId":"cf0b7085-2e50-4865-a2d1-15fa5645131c","courseId":"b806611b-fb74-48df-bbf5-d94d1444e0ec","updatedAt":"2023-06-17T18:15:55.639Z","createdAt":"2023-06-17T18:15:55.639Z"}
        const courseURL = `${baseUrl}/api/v1/courses`
        for (const cert of response.data.certificates) {
            const course = await axios.get(`${courseURL}/${cert.courseId}`, payload)
            cert.course = course.data
        }
        return response.data
    } catch (error) {
        return { errorLoading: true, error }
    }
}

export default MyCourses