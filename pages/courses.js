import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import ReactSelect from 'react-select'
import CourseCard from '@/components/Courses/CourseCard'

const CoursesGrid01 = ({ courses, courseCategories, precondition }) => {

    const initialValues = JSON.parse(precondition) || {}
   
    const page = precondition.page || 1
    const formRef = React.useRef(null)

    const handleCondition = (e) => {
        
        const form = formRef.current
        form.submit()
    }

    const getDefaultValueOfMultiSelect = (values) => {
       
        try{
            values = values.split(',')
            if(values.length === 1 && values[0] === '') return []
            
        } catch(e){
           
        }
       
        if (typeof values === 'string') {
            return { value: values, label: values }
        }
        if (Array.isArray(values)) {
            
            return values.map(value => ({ value, label: value }))
        }
        return []
    }
    

    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner
                pageTitle="Courses"
                homePageUrl="/"
                homePageText="Home"
                activePageText="Courses"
            />

            <div className="courses-area courses-section pt-100 pb-70">

                <div className="container">
                    <form method='GET' ref={formRef} action='/courses'>

                        <input type='hidden' name='page' value={page} />
                        {/* 
                       AI : Add a limit dropdown in somewhere div below suitable to use below code
                       */}
                        <div className="minta-grid-sorting row align-items-center">
                            <div className="col-lg-8 col-md-6 result-count">
                                <p>We found <span className="count">{courses.length}</span> courses available for you</p>
                            </div>

                            <div className="col-lg-4 col-md-6 ordering">
                                <div className="select-box">
                                    <label htmlFor="limit">Limit</label>
                                    <select
                                        onChange={handleCondition}
                                        name='limit'
                                        defaultValue={initialValues.limit || 10}
                                        className="form-control">
                                        <option value='10'>10</option>
                                        <option value='20'>20</option>
                                        <option value='30'>30</option>
                                    </select>
                                </div>
                                <div className="select-box mt-2">
                                    <label htmlFor="sort">Sort By</label>
                                    <select
                                        onChange={handleCondition}
                                        name='sort'
                                        defaultValue={initialValues.sort || ''}
                                        className="form-control">
                                        <option value=''>Sort By</option>
                                        <option value='rating-asc'>Popularity</option>
                                        <option value='date_created-desc'>Newest</option>
                                        <option value='price-asc'>Price: low to high</option>
                                        <option value='price-desc'>Price: high to low</option>
                                    </select>
                                </div>
                                <div className="select-box mt-2">
                                    <label htmlFor="sort">Filter By</label>
                                <ReactSelect
                                    isMulti
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            border: 'none',
                                            borderBottom: '1px solid #ebebeb',
                                            zIndex: 100
                                        }),
                                    }}
                              
                                    onChange={(e)=>{
                                        if (!e) {
                                            formRef.current.elements.categories.value = ''
                                            handleCondition()
                                            return
                                        }
                                        const values = e.map(item=>item.value)
                                        formRef.current.elements.categories.value = values
                                        handleCondition()
                                    }}
                                    placeholder="Filter by categories"
                                    name="categories"
                                    defaultValue={getDefaultValueOfMultiSelect(initialValues.categories)}
                                    options={courseCategories.map(category => ({ value: category.name, label: category.name }))}
                                    className="basic-multi-select form-control"
                                    classNamePrefix="select"

                                />

                            </div>
                            </div>

                            
                        </div>
                    </form>

                    <div className="row"
                        style={{
                            position: 'relative',
                            zIndex: 0
                        }}
                    >

                        {courses ? courses.map(course => (
                            <CourseCard
                                category={course.category}
                                id={course.id}
                                enroled_courses={course.enroled_courses}
                                profilePhoto={course.profilePhoto}
                                lessons={course.lessons}
                                overview={course.overview}
                                price={course.price}
                                title={course.title}
                                user={course.user}


                                key={course.id} />

                        )) : (
                            <h2>Empty</h2>
                        )}

                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </React.Fragment>
    )
}


import { Op } from 'sequelize'
export async function getServerSideProps({ query }) {
    const parseCondition = (query) => {
        let parsedQuery = {}

        if (query.sort) {
            let [key, order] = query.sort.split("-")
            // Sequelize expects sorting options in this format: [['column1', 'DESC'], ['column2', 'ASC']]
            parsedQuery.order = [[key, order.toUpperCase()]]
        }

        if (query.categories) {
            
            parsedQuery.where = {
                category: {
                    [Op.like]: `%${query.categories}%`
                }
            }
        }

        if (query.page && query.limit) {
            parsedQuery.limit = Number(query.limit)
            parsedQuery.offset = (Number(query.page) - 1) * parsedQuery.limit
        }

        return parsedQuery
    }
    const { courses, users, enroled_courses, CourseCategories } = await import('@/models/index')
    const fetchedCourseCategories = await CourseCategories.findAll()

    const condition = parseCondition(query)

    const fetchedcourses = await courses.findAll({
        ...{
            ...condition,
            where: {
                ...condition.where,
                admin_approval_status: 'approved',
                published : true
            }
        },
        include: [{
            model: users, as: 'user',
            attributes: ['name', 'profile_photo_url']
        }, {
            model: enroled_courses, as: 'enroled_courses',
            attributes: ['courseId']
        }],
    })
    return {
        props: {
            courses: JSON.parse(JSON.stringify(fetchedcourses)),
            courseCategories: JSON.parse(JSON.stringify(fetchedCourseCategories)),
            precondition: JSON.stringify(query)
        },
    }
}



export default CoursesGrid01