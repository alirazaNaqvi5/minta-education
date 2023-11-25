import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import Link from '@/utils/ActiveLink'

const index = () => {
    return (
        <React.Fragment>
            <PageBanner
                pageTitle="Teacher Dashboard"
                homePageUrl="/"
                homePageText="Home"
                activePageText="Teacher Dashboard"
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
                                        <Link href="/teacher/online" activeClassName="active">
                                            <a>Online Courses</a>
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
                                    <li>
                                        <Link href="/teacher/gallery" activeClassName="active">
                                            <a>Gallery</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-8 col-lg-8">
                            <div className="td-text-area">
                                {/* boxes of links again */}
                                <div className="grid-container">
                                    <div className="grid-item m-2">
                                        <Link href="/teacher/courses" activeClassName="active">
                                            <a>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">My Courses</h5>
                                                        <p className="card-text">You can see all your courses</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="grid-item m-2">
                                        <Link href="/teacher/course/create" activeClassName="active">
                                            <a>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Create A Course</h5>
                                                        <p className="card-text">You can create a course</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="grid-item m-2">
                                        <Link href="/teacher/courses/course-edit" activeClassName="active">
                                            <a>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Edit My Course</h5>
                                                        <p className="card-text">You can edit your course</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="grid-item m-2">
                                        <Link href="/teacher/course/upload-course-video" activeClassName="active">
                                            <a>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Upload Course Video</h5>
                                                        <p className="card-text">You can upload a video to your course</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="grid-item m-2">
                                        <Link href="/teacher/tests" activeClassName="active">
                                            <a>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">My Created Tests</h5>
                                                        <p className="card-text">You can see all your created tests and create a new one</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="grid-item m-2">
                                        <Link href="/teacher/gallery" activeClassName="active">
                                            <a>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Gallery</h5>
                                                        <p className="card-text">View your gallery</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    )
}

export default index
