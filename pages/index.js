import React from 'react';
// import Navbar from '../components/_App/Navbar';
import MainBanner from '../components/VendorCertificationTraining/MainBanner';
import Partner from '../components/VendorCertificationTraining/Partner';
import SloganArea from '../components/VendorCertificationTraining/SloganArea';
import PopularCourses from '../components/VendorCertificationTraining/PopularCourses';
import AboutArea from '../components/VendorCertificationTraining/AboutArea';
import FunFacts from '../components/Common/FunFacts';
import PopularCoursesTwo from '../components/VendorCertificationTraining/PopularCoursesTwo';
import CourseAdvisor from '../components/VendorCertificationTraining/CourseAdvisor';
import PremiumAccess from '../components/VendorCertificationTraining/PremiumAccess';
import Testimonials from '../components/Common/Testimonials';
import ViewAllCourses from '../components/VendorCertificationTraining/ViewAllCourses';
import LatestNews from '../components/Common/LatestNews';
import SubscribeForm from '../components/Common/SubscribeForm';
import SEO from '@/components/SEO';
import useTranslation from 'next-translate/useTranslation';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';
// import Footer from '../components/_App/Footer';



const Index = ({courses}) => {
    const {t} = useTranslation("distance-learning")
    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <SEO title={t("pagetitle")} description={t("bannersubtitle")} />
            <MainBanner />
            {/* <SloganArea /> */}
            <PopularCourses data={courses.courses   }/>
            {/* <PopularCoursesTwo /> */}
            {/* <AboutArea />  */}
            <FunFacts />
            {/* <Partner /> */}
            <CourseAdvisor /> 
            <PremiumAccess />
            <Testimonials />
            <ViewAllCourses />
            {/* <LatestNews /> */}
            <SubscribeForm />
            {/* <Footer /> */}
        </React.Fragment>
    )
}

export async function getServerSideProps (ctx) {
    let error = false
    const req = await axios.get(`${baseUrl}/api/v1/courses/homepage-courses`).catch(err => { error = err })
    const courses = req?.data
    return {
        props: {
            courses : courses || {},
            
        }
    }
}


export default Index;