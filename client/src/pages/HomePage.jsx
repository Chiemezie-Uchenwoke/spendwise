import DesktopHeader from "../components/Header/DesktopHeader";
import MobileHeader from "../components/Header/MobileHeader";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import TakeControlCta from "../components/TakeControl/TakeControl";
import Footer from "../components/Footer/Footer";

const HomePage = () => {

    return (
        <>
            <DesktopHeader />  
            <MobileHeader /> 
            <Hero />
            <Features />
            <HowItWorks />
            <TakeControlCta />
            <Footer />
        </>
    )
}

export default HomePage;