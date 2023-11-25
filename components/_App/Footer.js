import React from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';


const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation();

    return (
        <footer className="footer-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="single-footer-widget">
                            <Link href="/">
                                <a className="logo">
                                    <img src="/images/logo2.png" alt="logo" />
                                </a>
                            </Link>

                            <p>{t('Our Academy will take the responsibility to support the professionals to receive distinctive training programs, to meet the job market demands.')}</p>

                            <ul className="social-link">
                                <li>
                                    <a href="#" className="d-block" target="_blank">
                                        <i className='bx bxl-facebook'></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="d-block" target="_blank">
                                        <i className='bx bxl-twitter'></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="d-block" target="_blank">
                                        <i className='bx bxl-instagram'></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="d-block" target="_blank">
                                        <i className='bx bxl-linkedin'></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-6 col-sm-6">
                        <div className="single-footer-widget pl-5">
                            <h3>{t('Explore')}</h3>
                            <ul className="footer-links-list">
                                <li>
                                    <Link href="/">
                                        <a>{t('Home')}</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about-1">
                                        <a>{t('About')}</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/courses-1">
                                        <a>{t('Courses')}</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/events">
                                        <a>{t('Events')}</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact">
                                        <a>{t('Contact')}</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-6 col-sm-6">
                        <div className="single-footer-widget">
                            <h3>{t('Resources')}</h3>
                            <ul className="footer-links-list">
                                <li>
                                    <Link href="#">
                                        <a>{t('Student Success')}</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <a>{t('Scholarships')}</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <a>{t('For Business')}</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <a>{t('Go Premium')}</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <a>{t('Team Plans')}</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="single-footer-widget">
                            <h3>{t('Address')}</h3>
                            <ul className="footer-contact-info">
                                <li>
                                    <i className='bx bx-map'></i>
                                    {t('Headquarter Office - Manchester - UK')}
                                </li>
                                <li>
                                    <i className='bx bx-phone-call'></i>
                                    <a href="tel:+44587154756">+44 77 91646536</a>
                                </li>
                                <li>
                                    <i className='bx bx-envelope'></i>
                                    <a href="mailto:hello@minta.uk">info@minta.uk</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom-area">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <p><i className='bx bx-copyright'></i>{currentYear}
                                <a target="_blank" href="https://minta.uk/">MINTA</a>
                            </p>
                        </div>

                        <div className="col-lg-6 col-md-6">
                            <ul>
                                <li>
                                    <Link href="/privacy-policy">
                                        <a>{t('Privacy Policy')}</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms-of-service">
                                        <a>{t('Terms & Conditions')}</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lines">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </footer>
    );
};

export default Footer;
