import spendwiseLogo from "../../assets/spendwise.png";
import { Link } from "react-router";
import { HiMiniBars3 } from "react-icons/hi2";
import { useState } from "react";


const MobileHeader = () => {
    const [showMobile, setShowMobile] = useState(false);

    const handleToggle = () => {
        setShowMobile(prev => !prev);
    }   

    return (
        <header 
            className="w-full h-[4rem] min-[1000px]:hidden items-center border-b border-black/20 sticky top-0 bg-white-col z-50"
        >
            <div className="w-full h-full flex items-center relative">
                <div className="w-full px-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img 
                            src={spendwiseLogo} 
                            alt="SpendWise Logo" 
                            className="w-[2rem] h-auto " 
                        />
                        <h1 className="font-bold">SpendWise</h1>
                    </div>

                    <nav className="flex gap-8 items-center" aria-label="Main site navigation">
                        <button className="border border-black/40 py-1 px-1 rounded" onClick={handleToggle}>
                            <HiMiniBars3 className="text-xl" />
                        </button>

                        {
                            showMobile && 
                            <ul className="absolute top-full left-0 bg-dark-col py-12 w-full flex flex-col gap-6 shadow-lg z-30">
                                <div className="px-4 flex flex-col gap-8">
                                    <li><a href="#features" className="capitalize font-medium text-white-col">features</a></li>
                                    <li><a href="#how-it-works" className="capitalize font-medium text-white-col">how it works</a></li>
                                    <li><a href="#reviews" className="capitalize font-medium text-white-col">reviews</a></li>
                                    <li><Link className="capitalize font-medium text-white-col">sign in</Link></li>
                                    <li><Link className="capitalize font-medium bg-pri-col text-white-col py-2 inline-block text-center w-full rounded-xl hover:brightness-95">get started</Link></li>
                                </div>
                            </ul>
                        }
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default MobileHeader;