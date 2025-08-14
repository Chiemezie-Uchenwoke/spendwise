import spendwiseLogo from "../../assets/spendwise.png";
import { Link } from "react-router";
import { HiMiniBars3 } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


const MobileHeader = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const navigate = useNavigate();

    const handleToggle = (e) => {
        e.stopPropagation();
        setShowMobileMenu(prev => !prev);
    }   

    useEffect(() => {

        const handleClickOutside = () => {
            setShowMobileMenu(false);
        }

        if (showMobileMenu) {
            window.addEventListener("click", handleClickOutside);
        }

        return () => {
            window.removeEventListener("click", handleClickOutside);
        }
    }, [showMobileMenu]);

    return (
        <header 
            className="w-full h-[4rem] min-[1100px]:hidden items-center border-b border-black/20 sticky top-0 bg-white-col z-50"
        >
            <div className="w-full h-full flex items-center relative">
                <div className="w-full px-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                        <img 
                            src={spendwiseLogo} 
                            alt="SpendWise Logo" 
                            className="w-[2rem] h-auto " 
                        />
                        <h1 className="font-bold">SpendWise</h1>
                    </div>

                    <nav className="flex gap-8 items-center" aria-label="Main site navigation">
                        <button className="border border-black/40 py-1 px-1 rounded" onClick={handleToggle} aria-expanded={showMobileMenu} aria-controls="mobile-menu" aria-label="Toggle navigation menu">
                            <HiMiniBars3 className="text-xl" />
                        </button>

                        {
                            showMobileMenu && 
                            <ul id="mobile-menu" className="absolute top-full left-0 bg-dark-col px-4 py-12 w-full flex flex-col gap-8 shadow-lg z-30">
                                <li><a href="#features" className="nav-link-mobile">features</a></li>
                                <li><a href="#how-it-works" className="nav-link-mobile">how it works</a></li>
                                <li><a href="#reviews" className="nav-link-mobile">reviews</a></li>
                                <li><Link className="nav-link-mobile">sign in</Link></li>
                                <li><Link className="capitalize font-medium bg-pri-col text-white-col py-2 inline-block text-center w-full rounded-xl hover:brightness-95">get started</Link></li>
                            </ul>
                        }
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default MobileHeader;