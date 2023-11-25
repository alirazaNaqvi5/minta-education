import React from 'react';
// import Navbar from '../components/_App/Navbar';
import qs from 'querystring'
import PageBanner from '@/components/Common/PageBanner';
import { parseCookies } from 'nookies';

import jwt from 'jsonwebtoken'
// import Footer from '../components/_App/Footer';

const EditPassword = ({ message }) => {
    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner
                pageTitle="Edit Password"
                homePageUrl="/"
                homePageText="Home"
                activePageText="Edit Password"
            />

            <div className="ptb-100">
                <div className="container">
                    <div className="border-box">
                        <form className="contact-form" action="" method="post">
                            <div className="form-group">
                                <label>Current Password</label>
                                <input type="password" className="form-control" id="oldPassword" name='oldPassword' />
                            </div>

                            <div className="form-group">
                                <label>New Password</label>
                                <input type="password" className="form-control" id="newPassword" name='newPassword' />
                            </div>

                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input type="password" className="form-control" id="cnewPassword" name='confirm_newPassword' />
                            </div>

                            <div>
                                {message}
                            </div>

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


import getRawBody from 'raw-body';
export async function getServerSideProps(context) {
    const { req } = context;
    if (req.method == 'POST') {

        const { token } = parseCookies(context);
        const { users } = await import('@/models/index')
        const bcrypt = await import('bcrypt')

        if (!token) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }
        }

        const { userId } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await users.findOne({
            where: { id: userId }
        })

        const body = qs.parse((await getRawBody(req)).toString('utf-8'))

        const check = bcrypt.compareSync(body.oldPassword, user.password)

        if (!check) {
            return {
                props: {
                    message: 'Old password is incorrect'
                }
            }
        }

        if (body.newPassword !== body.confirm_newPassword) {
            return {
                props: {
                    message: 'New password and confirm new password are not the same'
                }
            }
        }


        const passwordHash = await bcrypt.hash(body.newPassword, 10)

        await users.update({
            password: passwordHash
        }, {
            where: {
                id: userId
            }
        })

        return {
            redirect: {
                destination: '/user/my-profile',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}

export default EditPassword;