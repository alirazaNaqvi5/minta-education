import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import Link from '@/utils/ActiveLink'
import { parseCookies } from 'nookies/dist'
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

const index = ({courses}) => {
    console.log(courses)
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
                            {/* show list of courses, by using title as courses.title, show number of users by courses.enroled_coursest.length and a download excel button */}
                            {
                                courses.length ? courses.map(course => (
                                
                                   course.category === "Live course" && <div key={course.id} className="col-lg-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h3 className="card-title">{course.title}</h3>
                                                <p className="card-text">Number of users: {course.enroled_courses?.length}</p>
                                                <button onClick={
                                                    // create excel file from course.enroled_courses.user 
                                                    // and download it
                                                    () => {
                                                        
                                                        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                                                        const fileExtension = '.xlsx';
                                                        const fileName = `${course.title}${fileExtension}`
                                                        const ws = XLSX.utils.json_to_sheet(course.enroled_courses.map(enroled_course => enroled_course.user))
                                                        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
                                                        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                                                        const data = new Blob([excelBuffer], {type: fileType});
                                                        FileSaver.saveAs(data, fileName);
                                                    }
                                                } className="btn btn-primary">Download Excel</button>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-lg-12">
                                        <h3 className="empty-content">Empty</h3>
                                    </div>
                                )
                            }
                        </div>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    )
}


// get server side props and fetch data from db from table courses and user
index.getInitialProps = async ctx => {
    const { token } = parseCookies(ctx)
    if(!token){
        return {courses: []}
    }
    
    const payload = {
        headers: {Authorization: token}
    }
    
    const url = `${baseUrl}/api/v1/courses/my-courses`
    const response = await axios.get(url, payload)
    // console.log(response.data)
    return response.data
}
export default index