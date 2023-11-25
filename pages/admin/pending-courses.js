import React from 'react'
import { parseCookies } from 'nookies'
import PageBanner from '@/components/Common/PageBanner'
import Link from '@/utils/ActiveLink'
import { redirectUser } from '@/utils/auth'
import { AdminSideNav } from '@/components/_App/AdminNavbar'


const pendingcourses = ({ pendingRequests }) => {

    const formRef = React.useRef(null)
    const [selId, setSelId] = React.useState(null)
    const [selType, setType] = React.useState(null)
   
    const submitForm = (type, id) => {
        
        const form = formRef.current
        setType(type)
        setSelId(id)

        form.submit()
    }

    return (
        <React.Fragment>
            <PageBanner
                pageTitle="Pending Courses"
                homePageUrl="/"
                homePageText="Home"
                activePageText="Admin Dashboard"
            />

            <div className="ptb-100">
                <div className="container">
                    <div className="row">
                        <AdminSideNav />

                        <div className="col-md-8 col-lg-8">

                            <div className="table-responsive">
                                <table className="table vertical-align-top">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Course</th>
                                            <th scope="col" className="text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {pendingRequests.length ? (
                                            <>
                                                {pendingRequests.map((request) => {
                                                    return (
                                                        <tr key={request.id}>
                                                            <th scope="row">{
                                                                request.id
                                                            }</th>
                                                            <td>
                                                                <Link href={`/courses/${request.id}`} activeClassName="active">
                                                                    <a className="text-primary">
                                                                        {request.title}
                                                                    </a>
                                                                </Link>
                                                            </td>
                                                                <td className="text-right">
                                                            <form ref={formRef} method="POST">
                                                                <input type="hidden" name="type" value={selType} />
                                                                <input type="hidden" name="id" value={selId} />
                                                                    <button
                                                                        onClick={e => {
                                                                            window.confirm("Are you sure?") && submitForm('approved', request.id)
                                                                        }}
                                                                        className="btn btn-success mr-05"
                                                                    >
                                                                        Approve
                                                                    </button>

                                                                    <button
                                                                        onClick={e => {
                                                                            window.confirm("Are you sure?") && submitForm('declined', request.id)
                                                                        }}
                                                                        className="btn btn-danger"
                                                                    >
                                                                        Decline
                                                                    </button>
                                                            </form>
                                                                </td>
                                                        </tr>
                                                    )
                                                })}
                                            </>
                                        ) : (
                                            <tr className="text-center">
                                                <td colSpan="3">No Pending Requests!</td>
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

import getRawBody from 'raw-body'
import qs from 'querystring'
export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx)
    const { req } = ctx
    if (!token) {
        redirectUser(ctx, '/authentication')
    }
    const { courses } = await import('@/models/index')
    try {
        if (req.method === 'POST') {
            const body = qs.parse((await getRawBody(req)).toString('utf-8'))
            const { type, id } = body
            
            await courses.update({ admin_approval_status: type }, { where: { id } })
        }

        const pendingRequests = await courses.findAll({
            where: { admin_approval_status: 'pending', published: true },
            attributes: ['id', 'title'],
        })
        return {
            props: {
                pendingRequests: JSON.parse(JSON.stringify(pendingRequests))
            }
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
                pendingRequests: [],
                error: 'Something went wrong!',
                message: error.message
            }
        }
    }
}


export default pendingcourses
