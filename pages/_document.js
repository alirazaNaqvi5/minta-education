// index.js
import React from 'react';
import MainBanner from '../components/VendorCertificationTraining/MainBanner';
import PopularCourses from '../components/VendorCertificationTraining/PopularCourses';
import FunFacts from '../components/Common/FunFacts';
import CourseAdvisor from '../components/VendorCertificationTraining/CourseAdvisor';
import PremiumAccess from '../components/VendorCertificationTraining/PremiumAccess';
import Testimonials from '../components/Common/Testimonials';
import ViewAllCourses from '../components/VendorCertificationTraining/ViewAllCourses';
import SubscribeForm from '../components/Common/SubscribeForm';
import SEO from '@/components/SEO';
import useTranslation from 'next-translate/useTranslation';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';

const Index = ({ courses }) => {
    const { t } = useTranslation("distance-learning");
    return (
        <>
            <SEO title={t("pagetitle")} description={t("bannersubtitle")} />
            <MainBanner />
            <PopularCourses data={courses.courses} />
            <FunFacts />
            <CourseAdvisor />
            <PremiumAccess />
            <Testimonials />
            <ViewAllCourses />
            <SubscribeForm />
        </>
    );
};

export async function getServerSideProps(ctx) {
    try {
        const res = await axios.get(`${baseUrl}/api/v1/courses/homepage-courses`);
        return { props: { courses: res.data } };
    } catch (error) {
        return { props: { courses: {} } }; // Return empty object on error
    }
}

export default Index;
