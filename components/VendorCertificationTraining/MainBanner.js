import React from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

const MainBanner = () => {
    const {t} = useTranslation("distance-learning")
    return (
        <div className="banner-section">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-12">
                        <div className="banner-content">
                            <h1>{t('pagetitle')}</h1>
                            <p>{t('bannersubtitle')}</p>

                            <Link href="/profile-authentication">
                                <a className="default-btn">
                                    <i className="flaticon-user"></i>{t('button')}<span></span>
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-7 col-md-12">
                        <div className="banner-image">
                            <img src="/images/banner-img1.png" alt="image" />

                            <div className="banner-shape4">
                                <img src="/images/banner-shape4.png" alt="image" />
                            </div>
                            <div className="banner-shape5">
                                <img src="/images/banner-shape5.png" alt="image" />
                            </div>
                            <div className="banner-shape6">
                                <img src="/images/banner-shape6.png" alt="image" />
                            </div>
                            <div className="banner-shape7">
                                <img src="/images/banner-shape7.png" alt="image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainBanner;