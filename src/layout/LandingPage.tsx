import React from 'react'
import Navbar from '../components/landingpage/Navbar'
import HeroSection from '../components/landingpage/HeroSection'
import Benefits from '../components/landingpage/Benefits'
import About from '../components/landingpage/About'
import Footer from '../components/landingpage/Footer'
import Plans from '../components/landingpage/Plans'

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <About />
            <Plans/>
            <Benefits />
            <Footer/>
        </>
    )
}

export default LandingPage