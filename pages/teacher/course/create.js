import React from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import { Spinner } from 'reactstrap'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import baseUrl from '@/utils/baseUrl'
import catchErrors from '@/utils/catchErrors'
import PageBanner from '@/components/Common/PageBanner'
import Link from '@/utils/ActiveLink'
import Select from 'react-select'

const INIT_COURSE = {
    title: '',
    overview: '',
    price: 0.00,
    profilePhoto: '',
    published: true,
    coverPhoto: '',
    course_preview_img: '',
    course_preview_video: '',
    duration: '',
    lessons: '',
    category: ''
}

const Create = ({categories}) => {
    const { token } = parseCookies()
    const router = useRouter()

    const [course, setCourse] = React.useState(INIT_COURSE)
    const [profilePreview, setProfilePreview] = React.useState('')
    const [coverPhotoPreview, setCoverPhotoPreview] = React.useState('')
    const [coursePreviewImg, setCoursePreviewImg] = React.useState('')
    const [coursePreviewVideo, setCoursePreviewVideo] = React.useState('')
    const [imageUploading, setImageUploading] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [disabled, setDisabled] = React.useState(true)
    const [error, setError] = React.useState()

    React.useEffect(() => {
        const isCourse = Object.values(course).every(el => Boolean(el))
        isCourse ? setDisabled(false) : setDisabled(true)
    }, [course])

    const handleChange = e => {
       
        const { name, value, files } = e.target
      
        if (name === 'profilePhoto') {
            const profilePhotoSize = files[0].size / 1024 / 1024
            if (profilePhotoSize > 2) {
                toast.error('The profile photo size greater than 2 MB. Make sure less than 2 MB.', {
                    appearance: 'error'
                })
                e.target.value = null
                return
            }
            setCourse(prevState => ({ ...prevState, profilePhoto: files[0] }))
            setProfilePreview(window.URL.createObjectURL(files[0]))
        } else if (name === 'coverPhoto') {
            const coverPhotoSize = files[0].size / 1024 / 1024
            if (coverPhotoSize > 2) {
                toast.error('The cover photo size greater than 2 MB. Make sure less than 2 MB.', {
                    appearance: 'error'
                })
                e.target.value = null
                return
            }
            setCourse(prevState => ({ ...prevState, coverPhoto: files[0] }))
            setCoverPhotoPreview(window.URL.createObjectURL(files[0]))
        } else if (name === 'course_preview_img') {
            const course_preview_img = files[0].size / 1024 / 1024
            if (course_preview_img > 2) {
                toast.error('The course preview omage size greater than 2 MB. Make sure less than 2 MB.', {
                    appearance: 'error'
                })
                e.target.value = null
                return
            }
            setCourse(prevState => ({ ...prevState, course_preview_img: files[0] }))
            setCoursePreviewImg(window.URL.createObjectURL(files[0]))
        } else if (name === 'course_preview_video') {
       
            const course_preview_video = files[0].size / (5 * 1024 * 1024)
            if (course_preview_video > 5) {
                toast.error('The course preview video size greater than 5 MB. Make sure less than 5 MB.', {
                    appearance: 'error'
                })
                e.target.value = null
                return
            }
            setCourse(prevState => ({ ...prevState, course_preview_video: files[0] }))
            setCoursePreviewVideo(window.URL.createObjectURL(files[0]))
        }
        
        else {
            setCourse(prevState => ({ ...prevState, [name]: value }))
        }
        // console.log(course);
    }

    const handleCategoryChange = (category) => {
        if (!category){
            setCourse(prevState => ({ ...prevState, category: '' }))
            return
        }
        let categoryValue = Object.values(category).map(el => el.label).join(',')
        setCourse(prevState => ({ ...prevState, category: categoryValue }))
      
    }

    const handleProfilePhotoUpload = async () => {
        setImageUploading(true)
        // console.log(post.file_url)
        const data = new FormData()
        data.append('file', course.profilePhoto)
        data.append('upload_preset', 'vikings')
        data.append('cloud_name', 'dev-empty')


        if (course.profilePhoto) {


            try {
                const file = course.profilePhoto;
                const filename = encodeURIComponent(course.profilePhoto.name);
                const res = await fetch(`/api/presign?file=${filename}`);
                const { url, fields, publicUrl } = await res.json();
                const formData = new FormData();

                Object.entries({ ...fields, file }).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                const upload = await fetch(url, {
                    method: 'POST',
                    body: formData,
                })


                if (upload.ok) {
                    console.log('Uploaded successfully!');
                    return publicUrl
                } else {
                    console.error('Upload failed.');
                }


            } catch (error) {
                console.error('Error uploading file: ', error);
            }
        }
    }


    const handlecoverPhotoUpload = async () => {
        setImageUploading(true)
        // console.log(post.file_url)
        const data = new FormData()
        data.append('file', course.coverPhoto)
        data.append('upload_preset', 'vikings')
        data.append('cloud_name', 'dev-empty')
    
        if (course.coverPhoto) {
           
            try {
                const file = course.coverPhoto;
                const filename = encodeURIComponent(course.coverPhoto.name);
                const res = await fetch(`/api/presign?file=${filename}`);
                const { url, fields, publicUrl } = await res.json();
                const formData = new FormData();

                Object.entries({ ...fields, file }).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                const upload = await fetch(url, {
                    method: 'POST',
                    body: formData,
                })


                if (upload.ok) {
                    console.log('Uploaded successfully!');
                    return publicUrl
                } else {
                    console.error('Upload failed.');
                }


            } catch (error) {
                console.error('Error uploading file: ', error);
            }
        }
    }

    const handlePreviewPhotoUpload = async () => {
        setImageUploading(true)
        // console.log(post.file_url)
        const data = new FormData()
        data.append('file', course.course_preview_img)
        data.append('upload_preset', 'vikings')
        data.append('cloud_name', 'dev-empty')
        let response

        if (course.course_preview_img) {
            try {
                const file = course.course_preview_img;
                const filename = encodeURIComponent(course.course_preview_img.name);
                const res = await fetch(`/api/presign?file=${filename}`);
                const { url, fields, publicUrl } = await res.json();
                const formData = new FormData();

                Object.entries({ ...fields, file }).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                const upload = await fetch(url, {
                    method: 'POST',
                    body: formData,
                })


                if (upload.ok) {
                    console.log('Uploaded successfully!');
                    setImageUploading(false)
                    setLoading(true)
                    return publicUrl
                } else {
                    console.error('Upload failed.');
                }


            } catch (error) {
                console.error('Error uploading file: ', error);
            }
        }

     
    }

    const handlePreviewVideoUpload = async () => {
        setImageUploading(true)
        // console.log(post.file_url)
        const data = new FormData()
        data.append('file', course.course_preview_video)
        data.append('upload_preset', 'vikings')
        data.append('cloud_name', 'dev-empty')
        let response

        if (course.course_preview_video) {
            try {
                const file = course.course_preview_video;
                const filename = encodeURIComponent(course.course_preview_video.name);
                const res = await fetch(`/api/presign?file=${filename}`);
                const { url, fields, publicUrl } = await res.json();
                const formData = new FormData();

                Object.entries({ ...fields, file }).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                const upload = await fetch(url, {
                    method: 'POST',
                    body: formData,
                })


                if (upload.ok) {
                    console.log('Uploaded successfully!');
                    setImageUploading(false)
                    setLoading(false)
                    return publicUrl
                } else {
                    console.error('Upload failed.');
                }


            } catch (error) {
                console.error('Error uploading file: ', error);
            }
        }


    }

    const handleCourseSubmit = async e => {
        e.preventDefault()
       
        try {
            let profile = ''
            let cover = ''
            let preview = ''
            let course_preview_video = ''
            if (course.profilePhoto && course.coverPhoto && course.course_preview_img && course.course_preview_video) {
                profile = await handleProfilePhotoUpload()
                cover = await handlecoverPhotoUpload()
                preview = await handlePreviewPhotoUpload()
                course_preview_video = await handlePreviewVideoUpload()

                profile = profile.replace(/^http:\/\//i, 'https://');
                cover = cover.replace(/^http:\/\//i, 'https://');
                preview = preview.replace(/^http:\/\//i, 'https://');
                course_preview_video = course_preview_video.replace(/^http:\/\//i, 'https://');
            }

            const url = `${baseUrl}/api/v1/courses/course/new`
            const {
                title,
                overview,
                price,
                published,
                duration,
                lessons,
                category
            } = course

            const payload = {
                title,
                overview,
                price,
                published,
                duration,
                lessons,
                category,
                profile,
                cover,
                preview,
                course_preview_video
            }

            const response = await axios.post(url, payload, {
                headers: { Authorization: token }
            })

            // console.log(response.data)
            setLoading(false)
            setCourse(INIT_COURSE)
            setProfilePreview('')
            setCoverPhotoPreview('')
            setCoursePreviewImg('')
            toast.success(response.data);
            router.replace('/teacher/course/upload-course-video')
        } catch (err) {
            catchErrors(err, setError)
            toast.error(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <React.Fragment>
            <PageBanner
                pageTitle="Teacher Course Create"
                homePageUrl="/"
                homePageText="Home"
                activePageText="Teacher Course Create"
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
                            <div className="border-box">
                                {imageUploading && (
                                    <h3 className="loading-spinner">
                                        <div className="d-table">
                                            <div className="d-table-cell">
                                                <Spinner color="primary" /> Image Uploading....
                                            </div>
                                        </div>
                                    </h3>
                                )}
                                {loading && (
                                    <h3 className="loading-spinner">
                                        <div className="d-table">
                                            <div className="d-table-cell">
                                                <Spinner color="success" /> Wait....
                                            </div>
                                        </div>
                                    </h3>
                                )}

                                <form onSubmit={handleCourseSubmit}>
                                    <div className="form-group">
                                        <label>Course Title</label>
                                        <input
                                            type="text"
                                            placeholder="Enter course title"
                                            className="form-control"
                                            name="title"
                                            value={course.title}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Course Overview</label>
                                        <textarea
                                            type="text"
                                            placeholder="Enter course overview"
                                            className="form-control"
                                            name="overview"
                                            rows="10"
                                            value={course.overview}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Course Price</label>
                                        <input
                                            type="number"
                                            placeholder="Enter course price"
                                            className="form-control"
                                            name="price"
                                            value={course.price}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Course Lessons</label>
                                        <input
                                            type="text"
                                            placeholder="30 Lessons"
                                            className="form-control"
                                            name="lessons"
                                            value={course.lessons}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Course Duration (Whole numbers of hours & minutes)</label>
                                        <input
                                            type="text"
                                            placeholder="10 hours 30 minutes"
                                            className="form-control"
                                            name="duration"
                                            value={course.duration}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Categories</label>
                                        {/* <input
                                            type="text"
                                            placeholder="React, Ruby, Rails"
                                            className="form-control"
                                            name="category"
                                            value={course.category}
                                            onChange={handleChange}
                                        /> */}
                                        <Select
                                            isMulti
                                            name="category"
                                            options={categories?.map(category => ({
                                                value: category.id,
                                                label: category.name
                                            }))}
                                            required
                                            className="basic-multi-select form-control"
                                            classNamePrefix="select"
                                            onChange={handleCategoryChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Course Profile (<i>Image less than 2 MB & size 750x500</i>)</label>

                                        <br />

                                        <input
                                            type="file"
                                            name="profilePhoto"
                                            accept="image/*"
                                            onChange={handleChange}
                                        />

                                        <br />

                                        <img src={profilePreview} className="mxw-200 mt-20" />
                                    </div>

                                    <div className="form-group">
                                        <label>Course Cover Photo (<i>Image less than 2 MB & size 1920x500</i>)</label>

                                        <br />

                                        <input
                                            type="file"
                                            name="coverPhoto"
                                            accept="image/*"
                                            onChange={handleChange}
                                        />

                                        <br />

                                        <img src={coverPhotoPreview} className="mxw-200 mt-20" />
                                    </div>

                                    <div className="form-group">
                                        <label>Course Preview Video URL</label>
                                        <input
                                            type="file"
                                            placeholder="Upload Preview Video"
                                            className="form-control"
                                            name="course_preview_video"
                                            accept='video/*'
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Course Preview Image (<i>Image less than 2 MB & size 750x500</i>)</label>

                                        <br />

                                        <input
                                            type="file"
                                            name="course_preview_img"
                                            accept="image/*"
                                            onChange={handleChange}
                                        />

                                        <br />

                                        <img src={coursePreviewImg} className="mxw-200 mt-20" />
                                    </div>

                                    <button
                                        className="default-btn"
                                        disabled={imageUploading || disabled || loading}
                                        type="submit"
                                    >
                                        <i className='flaticon-right-chevron'></i>
                                        Create
                                        {(imageUploading || loading) ? <Spinner color="success" /> : ''}

                                        <span></span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export async function getServerSideProps({ req, res }) {
    const { CourseCategories } = await import('@/models/index')

    const categories = await CourseCategories.findAll({
        attributes: ['id', 'name']
    })

    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories))
        }
    }
}

export default Create