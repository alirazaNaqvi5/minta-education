import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import CourseCard from '../Courses/CourseCard';


// const CourseCard = ({courseId, courseImage, courseTitle, courseAuthor, courseAuthorImage, courseDescription, courseLessons, courseStudents }) => {
//    const {t}= useTranslation("distance-learning");
//     return (
//         <Link href={`/courses/${courseId}`}>
//         <div className="col-lg-4 col-md-6">
//             <div className="single-courses-box without-boxshadow">
//                 <div className="courses-image">
//                     <a className="d-block image">
//                         <Image src={courseImage} alt="image" width={300} height={200} objectFit='fill' />
//                     </a>

//                     <div className="price shadow">$39</div>
//                 </div>
//                 <div className="courses-content">
//                     <div className="course-author d-flex align-items-center">
//                         <img src={courseAuthorImage} className="rounded-circle" alt="image" />
//                         <span>{courseAuthor}</span>
//                     </div>
//                     <h3>{courseTitle}</h3>
//                     <p
//                         style={{
//                             maxHeight: "60px",
//                             minHeight: "60px",
//                             overflow: "hidden"
//                         }}
//                     >{courseDescription}</p>
//                     <ul className="courses-box-footer d-flex justify-content-between align-items-center">
//                         <li>
//                             <i className='flaticon-agenda'></i> {courseLessons} {t('Lessons')}
//                         </li>
//                         <li>
//                             <i className='flaticon-people'></i> {courseStudents} {t('Students')}
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     </Link>
//     )
// }

const PopularCourses = ({data}) => {
   const {t}= useTranslation("distance-learning");
    return (
       <div className="courses-area pt-100 pb-70">
            <div className="container">
                <div className="section-title">
                    <span className="sub-title">{t('Go at your own pace')}</span>
                    <h2>{t('Popular Courses')}</h2>
                    <p>{t('Explore all of our courses and pick your suitable ones to enroll and start learning with us! We ensure that you will never regret it!')}</p>
                </div>

                <div className="row">
                    {Array.isArray(data) &&
                        data?.map((course) => (
                            <CourseCard {...course} flex key={course.id} />
                            // <CourseCard
                            //     key={course.id}
                            //     courseId={course.id}
                            //     courseImage={course.coverPhoto}
                            //     courseTitle={course.title}
                            //     courseAuthor={course.user.name}
                            //     courseAuthorImage={course.user.profilePhoto}
                            //     courseDescription={course.overview}
                            //     courseLessons={course.lessons}
                            //     courseStudents={course.enroled_courses.length}
                                
                            // />
                        ))}
                </div>

                <div className="col-lg-12 col-md-12">
                    <div className="courses-info">
                        <Link href="/courses">
                            <a className="default-btn">
                                <i className="flaticon-user"></i> {t('View All Courses')} <span></span>
                            </a>
                        </Link>
                        <p>
                            {t('Get into details now?​')}{' '}
                            <Link href="/courses">
                                <a>PM Master’s Program</a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopularCourses;