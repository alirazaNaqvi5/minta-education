import React from 'react'
import Link from '@/utils/ActiveLink'
import PageBanner from '@/components/Common/PageBanner'
import { AdminSideNav } from '@/components/_App/AdminNavbar'

const index = () => {
    return (
        <React.Fragment>
            <PageBanner 
                pageTitle="Admin Dashboard" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Admin Dashboard" 
            /> 

            <div className="ptb-100">
                <div className="container">
                    <div className="row">
                        <AdminSideNav />

                        <div className="col-md-8 col-lg-8">
                            <div className="td-text-area">
                                <h4>Admin Dashboard</h4> 

                              <a className="row">
                            <Link  href="/admin/pending-requests" activeClassName="active">
                                <div className="col-md-6 col-lg-6 btn-danger p-2 well btn">
                                    Pending Requests
                                    </div>
                                    </Link>
                                    </a>
                                    

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default index
