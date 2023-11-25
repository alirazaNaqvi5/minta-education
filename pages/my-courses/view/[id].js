import React, { useRef } from 'react'
import PageBanner from '@/components/Common/PageBanner'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import axios from 'axios'
import baseUrl from '@/utils/baseUrl'
import { verify } from 'jsonwebtoken'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const SingleCourses = ({ videos, watchedVideos, test }) => {

    const { token } = parseCookies()
    const [videoId, setVideoId] = React.useState(videos.length ? videos[0].video_url : '')
    const onVideoEnd = () => {
        console.log('Video Ended')
        axios.post(`${baseUrl}/api/v1/courses/enrolled/watched`, {
            videoId: videos.find(video => video.video_url === videoId).id,
            watchedAt: new Date()
        }, {
            headers: {
                "Authorization": token
            }
        }).then(response => {
            console.log(response.data)

        }).catch(error => {
            console.log(error.message)
        })

        const videoIndex = videos.findIndex(video => video.video_url === videoId)

        if (videoIndex < videos.length - 1) {
            setVideoId(videos[videoIndex + 1].video_url)
        }
    }

    const videoRef = useRef(null)

    const playVideo = () => {
        videoRef.current.play()
    }

    return (
        <React.Fragment>
            <PageBanner
                pageTitle={videos.length ? videos[0].course.title : 'No Videos'}
                homePageUrl="/my-courses"
                homePageText="My Courses"
                activePageText={videos.length ? videos[0].course.title : 'No Videos'}
            />

            <div className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="course-video-list">
                                {videos.length ? videos.map(video => (
                                    <div key={video.id}>
                                        <LockedOverlay isLocked={watchedVideos.find(watchedVideo => watchedVideo.videoId === video.id) ? false : true}>
                                            <a
                                                onClick={e => {
                                                    e.preventDefault();
                                                    setVideoId(video.video_url)
                                                }}
                                            >
                                                <img src={video.course.profilePhoto} alt={video.course.title} />
                                                <h4>{video.name}</h4>
                                            </a>
                                        </LockedOverlay>
                                    </div>
                                )) : (
                                    <h3>No Videos</h3>
                                )}
                                {
                                    test.length ? test.map(testOne => (
                                       
                                        <LockedOverlay isLocked={watchedVideos.length === videos.length ? false : true}>

                                        <a href={`/my-courses/test/${testOne.id}`} className="d-flex px-6 justify-content-center my-2" key={testOne.id}>
                                            <div class="d-flex px-6 justify-content-center" key={testOne.id}>
                                                <div class="d-inline-flex py-4 px-2 align-items-center bg-success-light border border-success rounded-4">
                                                    <span class="me-4">
                                                        <svg width="21" height="22" viewbox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect y="0.5" width="21" height="21" rx="10.5" fill="#219653"></rect>
                                                            <path d="M15.7676 8.13463C15.4582 7.82482 14.9558 7.82501 14.646 8.13463L9.59787 13.183L7.35419 10.9393C7.04438 10.6295 6.54217 10.6295 6.23236 10.9393C5.92255 11.2491 5.92255 11.7513 6.23236 12.0611L9.03684 14.8656C9.19165 15.0204 9.39464 15.098 9.59765 15.098C9.80067 15.098 10.0039 15.0206 10.1587 14.8656L15.7676 9.25644C16.0775 8.94684 16.0775 8.44443 15.7676 8.13463Z" fill="white"></path>
                                                        </svg>
                                                    </span>
                                                    <p class="text-success-dark mb-0">Solve : {testOne.title}</p>
                                                </div>
                                            </div>
                                        </a>
                                        </LockedOverlay>
                                    )) : (
                                        <h3>No Test</h3>
                                    )

                                }
                            </div>
                        </div>

                        <div className="col-lg-9">
                            <div className="course-video-iframe">

                                <video ref={videoRef} key={videoId} controls={false} onEnded={onVideoEnd} onContextMenu={
                                    e => {
                                        e.preventDefault()
                                    }
                                }>
                                    <source src={videoId} type="video/mp4" />

                                </video>

                                <button onClick={playVideo} className="btn btn-danger ">
                                    <i className="flaticon-play-button">Play</i>
                                </button>
                                <button className="btn btn-danger ms-2" onClick={() => videoRef.current.pause()}>
                                    <i className="flaticon-download">Pause</i>
                                </button>

                            </div>
                            <div className="course-video-content mt-4 ">
                                <h3 className='card-title '>Course Description</h3>
                                <p>{videos.length ? videos[0].course.description : 'No Videos'}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const LockedOverlay = ({ isLocked, children }) => {
    return (
        <div className="position-relative">
            {children}
            {isLocked && (
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center  overlay" style={{
                    fontSize: '5rem', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <i className="flaticon-lock" ></i>
                </div>
            )}
        </div>
    );
};

export async function getServerSideProps(ctx) {
    const { watched_videos, Test } = await import('@/models/index')
    const { token } = parseCookies(ctx)
    if (!token) {
        return { videos: [] }
    }

    const { id } = ctx.query

    // console.log(id)

    const payload = {
        headers: { Authorization: token },
        params: { courseId: id },
    }
    const { userId } = verify(token, process.env.JWT_SECRET)
    const url = `${baseUrl}/api/v1/courses/enrolled/videos`
    const response = await axios.get(url, payload)
    const watched_videos_res = await watched_videos.findAll({
        where: { userId }
    })
    const test = await Test.findAll({
        where: { courseId: id }
    })
    return {
        props: {
            videos: response.data.videos,
            watchedVideos: JSON.parse(JSON.stringify(watched_videos_res)),
            test: JSON.parse(JSON.stringify(test))
        }
    }
}


export default SingleCourses