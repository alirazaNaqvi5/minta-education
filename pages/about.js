import React from 'react';
import  useTranslation  from 'next-translate/useTranslation'
// import Navbar from '../components/_App/Navbar';
import PageBanner from '../components/Common/PageBanner';
import AboutUs from '../components/About/AboutUs';
import FeedbackSliderWithFunFacts from '../components/About/FeedbackSliderWithFunFacts';
import Features from '../components/About/Features';
import CourseAdvisor from '../components/Common/CourseAdvisor';
import Partner from '../components/Common/Partner';
import PremiumAccess from '../components/Common/PremiumAccess';
// import Footer from '../components/_App/Footer';

const About1 = () => {
    const { t } = useTranslation();

    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <PageBanner 
                pageTitle={t('About Us')} 
                homePageUrl="/" 
                homePageText={t('Home')} 
                activePageText={t('About Us')} 
            />  
            <AboutUs />
            <FeedbackSliderWithFunFacts />
            <Features />
            <CourseAdvisor />
            <PremiumAccess />
            <Partner />
            {/* <Footer /> */}
        </React.Fragment>
    )
}

export default About1;
