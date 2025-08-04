import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import Benefits from './Benefits'
import About from './About'
import Footer from './Footer'
import Plans from './Plans'

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