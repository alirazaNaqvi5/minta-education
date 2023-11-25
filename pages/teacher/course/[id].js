import React from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import {redirectUser} from '@/utils/auth'
import { Spinner } from 'reactstrap'
import toast from 'react-hot-toast'
import catchErrors from '@/utils/catchErrors'
import PageBanner from '@/components/Common/PageBanner'
import Link from '@/utils/ActiveLink'

const Edit = ({ existingData }) => {
    const { token } = parseCookies()
    // console.log(existingData)

    const INIT_COURSE = {
        id: existingData.id,
        title: existingData.title,
        overview: existingData.overview,
        price: existingData.price,
        profilePhoto: existingData.profilePhoto,
        coverPhoto: existingData.coverPhoto,
        course_preview_img: existingData.courese_preview_img,
        course_preview_video: existingData.course_preview_video,
        duration: existingData.duration,
        lessons: existingData.lessons,
        category: existingData.category
    }

   
    const [course, setCourse] = React.useState(INIT_COURSE)
    const [profilePreview, setProfilePreview] = React.useState('')
    const [coverPhotoPreview, setCoverPhotoPreview] = React.useState('')
    const [coursePreviewImg, setCoursePreviewImg] = React.useState('')
    const [imageUploading, setImageUploading] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [disabled, setDisabled] = React.useState(true)
    const [error, setError] = React.useState()

    React.useEffect(() => {
        const isCourse = Object.values(course).every(el => Boolean(el))
        isCourse ? setDisabled(false) : setDisabled(true)
    }, [course])

    const handleChange = e => {
        // console.log(d.value)
        const { name, value, files } = e.target

        if(name === 'profilePhoto'){
            const profilePhotoSize = files[0].size / 1024 / 1024
            if(profilePhotoSize > 2){
                toast.error('The profile photo size greater than 2 MB. Make sure less than 2 MB.', { 
                    appearance: 'error'
                })
                e.target.value = null
                return
            }
            setCourse(prevState => ({ ...prevState, profilePhoto: files[0]}))
            setProfilePreview(window.URL.createObjectURL(files[0]))
        } else if (name === 'coverPhoto'){
            const coverPhotoSize = files[0].size / 1024 / 1024
            if(coverPhotoSize > 2){
                toast.error('The cover photo size greater than 2 MB. Make sure less than 2 MB.', { 
                    appearance: 'error'
                })
                e.target.value = null
                return
            }
            setCourse(prevState => ({ ...prevState, coverPhoto: files[0]}))
            setCoverPhotoPreview(window.URL.createObjectURL(files[0]))
        } else if (name === 'course_preview_img'){
            const course_preview_img = files[0].size / 1024 / 1024
            if(course_preview_img > 2){
                toast.error('The course preview omage size greater than 2 MB. Make sure less than 2 MB.', { 
                    appearance: 'error'
                })
                e.target.value = null
                return
            }
            setCourse(prevState => ({ ...prevState, course_preview_img: files[0]}))
            setCoursePreviewImg(window.URL.createObjectURL(files[0]))
        } else if (name === 'course_preview_video'){
            const course_preview_video = files[0].size / 1024 / 1024
            if(course_preview_video > 15){
                toast.error('The course preview video size greater than 10 MB. Make sure less than 10 MB.', {
                    appearance: 'error'
                })
                e.target.value = null
                return
            }
            setCourse(prevState => ({ ...prevState, course_preview_video: files[0]}))
        }
         
        else {
            setCourse(prevState => ({ ...prevState, [name]: value }))
        }
        // console.log(course);
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
                    
                    return publicUrl
                } else {
                    console.error('Upload failed.');
                }


            } catch (error) {
                console.error('Error uploading file: ', error);
            }
        }


    }


    const handleCourseUpdate = async e => {
        e.preventDefault()
        try {
            let profile = ''
            let cover = ''
            let preview = ''
            let video = ''
            if(course.profilePhoto && course.coverPhoto && course.course_preview_img){
                profile = await handleProfilePhotoUpload()
                cover = await handlecoverPhotoUpload()
                preview = await handlePreviewPhotoUpload()
                video = await handlePreviewVideoUpload()


                profile = profile.replace(/^http:\/\//i, 'https://');
                cover = cover.replace(/^http:\/\//i, 'https://');
                preview = preview.replace(/^http:\/\//i, 'https://');
                video = video.replace(/^http:\/\//i, 'https://');
            }

            const url = `${baseUrl}/api/v1/courses/course/update`
            const {
                id,
                title,
                overview,
                price,
                published,
                duration,
                lessons,
                category,
                course_preview_video
            } = course

            const payload = {
                id,
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
                course_preview_video : video ? video : course_preview_video
            }

            const response = await axios.post(url, payload, {
                headers: {Authorization: token}
            })
            
            console.log(response.data)
            setLoading(false)
            toast.success(response.data);
        } catch (err) {
            catchErrors(err, setError)
            toast.error(err.message);
            console.log(err)
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

                                <form onSubmit={handleCourseUpdate}>
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
                                        <input 
                                            type="text" 
                                            placeholder="React, Ruby, Rails" 
                                            className="form-control" 
                                            name="category"
                                            value={course.category}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Course Profile (<i>Image less than 2 MB & size 50x50</i>)</label>

                                        <br />
                                    {
                                        course.profilePhoto && (
                                            <img src={course.profilePhoto} height={'100px'} />
                                        )
                                    }
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
                                        {
                                            course.coverPhoto && (
                                                <img src={course.coverPhoto} height={'100px'} />
                                            )
                                        }
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
                                        {
                                            course.course_preview_video && (
                                                <video controls width="250px">
                                                    <source src={course.course_preview_video} type="video/mp4" />
                                                </video>
                                            )

                                        }
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
                                        {
                                            course.course_preview_img && (
                                                <img src={course.course_preview_img} height={'100px'} />
                                            )
                                        }
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
                                        Update
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

Edit.getInitialProps = async ctx => {
    const { token } = parseCookies(ctx)
    if(!token){
        redirectUser(ctx, '/')
    }
    const { id } = ctx.query
    const payload = {
        headers: {Authorization: token}
    }

    const url = `${baseUrl}/api/v1/courses/${id}`
    const response = await axios.get(url, payload)
    // console.log(response.data)
    return response.data
}

export default Edit
