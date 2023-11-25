import React from 'react';
// import Navbar from '../components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';

 import { Modal,Card,CardBody,Input,InputGroup, Button, Spinner } from 'reactstrap';
import { parseCookies } from 'nookies';
import baseUrl from '@/utils/baseUrl';
// import Footer from '../components/_App/Footer';

const MyProfile = ({user}) => {
    const [profilePhotoModal, setProfilePhotoModal] = React.useState(false);
    const [imageUploading, setImageUploading] = React.useState(false);
    const profilePicInputRef = React.useRef(null);
    const {token} = parseCookies();
 

    const showProfilePhotoModal = () => {
        setProfilePhotoModal(true);
    };

    const handleProfilePicUpload = async (file) => {
        setImageUploading(true)
        // console.log(post.file_url)
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'vikings')
        data.append('cloud_name', 'dev-empty')
    
        if (file) {
           
            try {
               
                const filename = encodeURIComponent(file.name);
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

    const handleProfilePicChange = (file) => {
        
        if (file) {
            setImageUploading(true)
            handleProfilePicUpload(file)
                .then((publicUrl) => {
                    setImageUploading(false)
                    setProfilePhotoModal(false)
                    fetch(`${baseUrl}/api/v1/user/update-profile-photo`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: token
                        },
                        body: JSON.stringify({
                            profile_photo_url: publicUrl
                        })
                        
                })
                .then((res) => res.json())
                .then((data) => {
                    user.profile_photo_url = publicUrl
                    
                })
                .catch((err) => {
                    setImageUploading(false)
                    console.log(err)
                })
        })
        }
    }


    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner 
                pageTitle="My Profile" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="My Profile" 
            />  

            <div className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="user-profile">
                                <a className="pe-">
                                <img
                                className='pe-cursor-pointer pe-3'
                                onClick={() => {
                                    showProfilePhotoModal();
                                }}
                                src={
                                    user.profile_photo_url || '/images/avatar.png'
                                } 
                               
                                />
                                </a>
                                <p style={{
                                    textAlign: 'center',
                                    fontStyle: 'italic',
                                    fontSize: '12px',
                                    color: 'gray',
                                    paddingBottom: '20px'
                                }}>
                                    Click on the image to change profile photo
                                </p>
                                <h3>{
                                    user.name
                                }</h3>
                                <p>{
                                    user.role === 'student' ? 'Student' : user.role === 'Teacher' ? 'Instructor' : 'Admin'
                                }</p>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="user-profile-table">
                                <div className="table-responsive">
                                    <table className="table table-bordered vertical-align-top">
                                        <tbody>
                                            <tr>
                                                <td>Email</td>
                                                <td>{
                                                    user.email
                                                }</td>
                                            </tr>
                                            <tr>
                                                <td>Courses</td>
                                                <td>{
                                                    user.enroled_courses.length
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Phone</td>
                                                <td>{
                                                    user.phone
                                                }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Location</td>
                                                <td>{
                                                    user.location
                                                }</td>
                                            </tr>
                                            <tr>
                                                <td>Company</td>
                                                <td>{ user.company }</td>
                                                   
                                            </tr>
                                            <tr>
                                                <td>Designation</td>
                                                <td>{user.designation}</td>
                                            </tr>
                                            <tr>
                                                <td>Website</td>
                                                <td>{user.companyUrl}</td>
                                            </tr>
                                            <tr>
                                                <td>Interests</td>
                                                <td>{user.interests}</td>
                                            </tr>
                                            <tr>
                                                <td>Facebook</td>
                                                <td>{user.fb_url}</td>
                                            </tr>
                                            <tr>
                                                <td>Twitter</td>
                                                <td>{user.tw_url}</td>
                                            </tr>
                                            <tr>
                                                <td>Instagram</td>
                                                <td>{user.insta_url}</td>
                                            </tr>
                                            <tr>
                                                <td>LinkedIn</td>
                                                <td>{user.in_url}</td>
                                            </tr>
                                            
                                        </tbody>
                                    </table> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
                
                    <Modal
                        isOpen={profilePhotoModal}
                        toggle={() => {
                            setProfilePhotoModal(false);
                        }}
                        centered={true}
                        size="lg"
                    >
                        {/* use Bootstrap classes only */}
                        <div className="modal-header">
                            <h5 className="modal-title mt-0">Profile Photo</h5>
                            <button
                                type="button"
                                onClick={() => {
                                    setProfilePhotoModal(false);
                                }}
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <Card>
                                <CardBody>
                                    <div className="profile-photo-content">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="upload-profile-photo">
                                                    <div className="upload-photo">
                                                        <img
                                                            src={
                                                                user.profile_photo_url || '/images/avatar.png'
                                                            }
                                                            alt="profile-photo"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-8">
                                                <div className="upload-profile-photo-content">
                                                    <h3>Upload your photo</h3>
                                                    <p>
                                                        Please upload your photo to
                                                        use in your profile.{' '}
                                                        <br />
                                                        You can change your photo
                                                        anytime you want.
                                                    </p>

                                                    <InputGroup>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Choose file"
                                                            readOnly
                                                        />
                                                        <div className="input-group-append">
                                                            <div className="btn btn-primary btn-sm">
                                                                Upload
                                                                <input
                                                                ref={profilePicInputRef}
                                                                    type="file"
                                                                    className="upload-profile-photo-input"
                                                                />
                                                            </div>
                                                        </div>
                                                    </InputGroup>
                                                </div>
                                                <Button color='outline-primary' onClick={() => {
                                                    if (imageUploading) {
                                                        return;
                                                    }
                                                    if (!profilePicInputRef.current.files[0]) {
                                                        return;
                                                    }
                                                    if (profilePicInputRef.current.files[0].size > 1024 * 1024 * 1) {
                                                        return alert('Image size must be less than 1 MB');
                                                    }
                                                    setImageUploading(true);
                                                    handleProfilePicChange(profilePicInputRef.current.files[0]);
                                                
                                                }}>
                                                    {
                                                        imageUploading ? (
                                                            <Spinner color='light' />
                                                        ) : (
                                                            'Save'
                                                        )
                                                    }
                                                </Button>

                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </Modal>

            
            {/* <Footer /> */}
        </React.Fragment>
    )
}

export default MyProfile;