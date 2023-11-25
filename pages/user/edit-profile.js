import React from 'react';
// import Navbar from '../components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
import { parseCookies } from 'nookies';
import getRawBody from 'raw-body';
import { users } from '@/models/index';

// import Footer from '../components/_App/Footer';

const EditProfile = ({ user, BodyUser }) => {  // as {"user":{"id":"22503b18-1e14-450f-a39a-626cf756fe99","name":"admin","email":"admin@admin.com","isEmailPublic":true,"designation":null,"about":null,"location":null,"phone":null,"company":null,"companyUrl":null,"interests":null,"passwordResetToken":null,"passwordUpdatedAt":null,"emailResetToken":"07633edc-1020-47df-9d36-451074e2c2cc","profilePhoto":null,"gender":null,"fb_url":null,"tw_url":null,"insta_url":null,"in_url":null,"emailConfirmed":false,"emailConfirmedAt":null,"as_teacher_apply":false,"as_teacher_confirmed":null,"as_teacher_confirmed_at":null,"as_teacher_req_desc":null,"role":"admin","active":true,"agreedTerms":false,"createdAt":"2023-05-23T08:31:14.106Z","updatedAt":"2023-05-23T08:31:14.106Z","enroled_courses":[]}}
    if (BodyUser) {
        user = BodyUser
    }
    const alias = {
        tw_url: 'Twitter',
        fb_url: 'Facebook',
        in_url: 'LinkedIn',
        insta_url: 'Instagram',
        companyUrl: 'Website',
    }
    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner
                pageTitle="Edit Profile"
                homePageUrl="/"
                homePageText="Home"
                activePageText="Edit Profile"
            />

            <div className="ptb-100">
                <div className="container">
                    <div className="border-box">
                        <form action='' method='POST'>
                            <div className="form-group">
                                <input type="text" readOnly hidden className="form-control" id="user_id" name='user_id' value={user.id} />
                            </div>

                            {/* <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" id="name" name='name' defaultValue={user.name} />
                            </div>

                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" id="email" name='email' defaultValue={user.email} />
                            </div> */}

                            {
                                Object.keys(user)
                                    .filter(key => key !== 'id' && key !== 'role' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'enroled_courses' && key !== 'passwordResetToken' && key !== 'passwordUpdatedAt' && key !== 'emailResetToken' && key !== 'emailConfirmedAt' && key !== 'as_teacher_confirmed_at' && key !== 'as_teacher_req_desc' && key !== 'active' && key !== 'agreedTerms' && key !== 'emailConfirmed' && key !== 'as_teacher_apply' && key !== 'as_teacher_confirmed' && key !== 'profilePhoto')
                                    .map((key, index) => {
                                        return (
                                            <div className="form-group" key={index}>
                                                <label>{alias[key] ? alias[key] : key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
                                                <input type="text" className="form-control" id={key} name={key} defaultValue={user[key]} />
                                            </div>
                                        )
                                    })
                            }

                            <button type="submit" className="default-btn mt-10">
                                <i className='flaticon-right-chevron'></i> Update

                                <span></span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </React.Fragment>
    )
}
import qs from 'querystring'
export async function getServerSideProps(context) {
    const { req } = context;
    const { token } = parseCookies(context);

    if (req.method == "POST") {
        try {
            const body = qs.parse((await getRawBody(req)).toString('utf-8'))
            await users.update(Object.keys(body).reduce((acc, key) => {
                if (key !== 'user_id') {
                    acc[key] = body[key]
                }
                return acc
            }, {})
                , {
                    where: {
                        id: body.user_id
                    }
                })
            return {
                redirect: {
                    destination: '/user/my-profile',
                    permanent: false,
                },

            }
        } catch (err) {
            console.log(err)
        }
    }

    return {
        props: {}
    }

}


export default EditProfile;