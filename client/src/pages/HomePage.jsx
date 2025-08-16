import DesktopHeader from "../components/Header/DesktopHeader";
import MobileHeader from "../components/Header/MobileHeader";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import HowItWorks from "../components/HowItWorks/HowItWorks";

const HomePage = () => {

    return (
        <>
            <DesktopHeader />  
            <MobileHeader /> 
            <Hero />
            <Features />
            <HowItWorks />
        </>
    )
}

export default HomePage;