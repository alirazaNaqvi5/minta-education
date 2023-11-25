// gallery from videos
// id: {
//     type: Sequelize.UUID,
//     defaultValue: Sequelize.UUIDV4,
//     primaryKey: true
//   },
//   video_url: {
//     type: Sequelize.TEXT
//   },
//   order: {
//     type: Sequelize.INTEGER
//   },
//   name: {
//     type: Sequelize.STRING
//   },
//   description: {
//     type: Sequelize.STRING
//   },
//   courseId: {
//     type: Sequelize.UUID,
//     onDelete: 'CASCADE',
//     references: {
//       model: 'Courses',
//       key: 'id',
//       as: 'courseId',
//     }
//   },
//   userId: {
//     type: Sequelize.UUID,
//     onDelete: 'CASCADE',
//     references: {
//       model: 'Users',
//       key: 'id',
//       as: 'userId',
//     }
//   }

// show a list of all videos without the course id for specific teacher
// add button to add video with course id
import React from 'react'
import {videos} from '@/models/index'
import { verify } from 'jsonwebtoken'
import { parseCookies } from 'nookies'
import { Spinner } from 'reactstrap'
import toast from 'react-hot-toast'
import baseUrl from '@/utils/baseUrl'
import axios from 'axios'

const INIT_VIDEO = {
    video_url: '',
    order: 0,
    name: '',
    description: '',
    courseId: ''
}

const Gallery = ({data}) => {

    const { token } = parseCookies()

    const [video, setVideo] = React.useState(INIT_VIDEO)
    const [loading, setLoading] = React.useState(false)
    const [disabled, setDisabled] = React.useState(true)

    React.useEffect(() => {
        const {order, video_url, name} = video
        const isVideo = Object.values({
            video_url,
            
        }).every(el => Boolean(el));
        isVideo ? setDisabled(false) : setDisabled(true);
    }, [video])

    async function handleVideoUpload() {

        try {
            const file = video.video_url;
            const filename = encodeURIComponent(video.video_url.name);
            const res = await fetch(`/api/presign?file=${filename}`);
            const { url, fields,publicUrl } = await res.json();
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
              return publicUrl;
            } else {
              console.error('Upload failed.');
            }

          if (upload.status === 200) {
            console.log('File upload successful');
            return publicUrl;
          } else {
            console.log('Error uploading file');
          }

        

        } catch (error) {
          console.error('Error uploading file: ', error);
        }
      }
      

    const handleChange = e => {
        // console.log(d.value)
        const { name, value, files } = e.target
        if(name === 'video_url'){
            const videoSize = files[0].size / 1024 / 1024
            if(videoSize > 25){
                Toast('The video size greater than 20 MB. Make sure less than 25 MB.', { 
                    appearance: 'error'
                })
                e.target.value = null
                return
            }
            setVideo(prevState => ({ ...prevState, video_url: files[0]}))
        } else {
            setVideo(prevState => ({ ...prevState, [name]: value }))
        }
        // console.log(video);
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            let videoUrl = ''
            if(video.video_url){
                const videoUpload = await handleVideoUpload()
                console.log(videoUpload)
                videoUrl = videoUpload.replace(/^http:\/\//i, 'https://');
            }

            const url = `${baseUrl}/api/v1/courses/course/video-upload`
            const { order, name, description, courseId } = video
            const payload = { 
                order,
                name,
                description, 
                courseId, 
                videoUrl
            }

            const response = await axios.post(url, payload, {
                headers: {Authorization: token}
            })

            console.log(response.data)

            setLoading(false);
            toast.success(response.data);
            setVideo(INIT_VIDEO)
        } catch (err) {
            // catchErrors(err)
            toast.error(err.message);
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Gallery</h1>
                    <div className="row my-4">
                        <div className="col-md-12 text-center bg-light p-2 d-flex justify-content-around flex-rwo">
                          
                           <form onSubmit={handleSubmit}>
                                    {loading && (
                                        <h3 className="loading-spinner">
                                            <div className="d-table">
                                                <div className="d-table-cell"> 
                                                    <Spinner color="danger" /> Vide uploading...
                                                </div>
                                            </div>
                                        </h3>
                                    )}
                                    

                                    <div className="form-group">
                                        <label>Select Video To Upload</label>

                                        <br />

                                        <input 
                                            type="file" 
                                            name="video_url" 
                                            accept="video/*"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <br />

                                    <button 
                                        className="default-btn" 
                                        disabled={disabled || loading}
                                    >
                                        <i className='flaticon-right-chevron'></i>
                                        Upload
                                    </button>
                                </form>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Video</th>
                                            <th>Order</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Course Id</th>
                                            <th>User Id</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((video) => (
                                            <tr key={video.id}>
                                                <td>{video.video_url}</td>
                                                <td>{video.order}</td>
                                                <td>{video.name}</td>
                                                <td>{video.description}</td>
                                                <td>{video.courseId}</td>
                                                <td>{video.userId}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {

    const {token} = parseCookies(ctx)
    const { userId } = verify(token, process.env.JWT_SECRET)
    const data = await videos.findAll({
        where: {userId}
    })
    return {
        props: {
            data: JSON.parse(JSON.stringify(data))
        }
    }
}

export default Gallery

