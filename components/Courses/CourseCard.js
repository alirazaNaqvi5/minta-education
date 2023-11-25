import React from 'react'
import Link from 'next/link'
import { Badge } from 'reactstrap'
import Image from 'next/image'

const CourseCard = ({
    id, title, price, overview, profilePhoto, lessons, user, enroled_courses, category,flex=false
}) => {
    const enrolled = enroled_courses ? enroled_courses : []
    return (
        <div className={!flex?"col-lg-3 col-md-12" : "col-sm"}>
            <Link href="/courses/[id]" as={`/courses/${id}`}>
            <div className="single-courses-box without-boxshadow">
                <div className="courses-image">
                        {/* fixed min and max height */}
                        <a className="d-block image "
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "200px",
                            }}
                        >
                            
                            <Image src={profilePhoto} alt={title} layout='fill' objectFit='cover' />
                        </a>
                    <a href="#" className="fav">
                        <i className="flaticon-heart"></i>
                    </a>
                    <div className="price shadow">${price}</div>
                </div>
                <div className="courses-content">
                    <div className='d-flex mb-2'>

                    {
                        category.split(",").map((cat, index) => (
                            <span class="bg-info me-1 badge badge-pill badge-info">
                                
                                {cat}
                            </span>
                        
                        ))
                    }
                    </div>
                  {user &&  <div className="course-author d-flex align-items-center">
                        <img src={`${user.profile_photo_url || "/images/avatar.png"}`} className="rounded-circle" alt={user.name} />
                        <span>{user.name}</span>
                    </div> }

                    <h3>
                        {/* <Link href="/courses/[id]" as={`/courses/${id}`}> */}
                            <a>{title}</a>
                        {/* </Link> */}
                    </h3>
                    
                    <p
                    style={{
                        maxHeight: "60px",
                        minHeight: "60px",
                        overflow: "hidden"
                    }}
                    >{overview.slice(0, 100)}</p>
                    <ul className="courses-box-footer d-flex justify-content-between align-items-center">
                        <li>
                            <i className='flaticon-agenda'></i> {parseInt(lessons)} Lessons
                        </li>
                        <li>
                            <i className='flaticon-people'></i> {enrolled.length} Students
                        </li>
                    </ul>
                </div>
            </div>
                    </Link>
        </div>
    )
}

export default CourseCard
