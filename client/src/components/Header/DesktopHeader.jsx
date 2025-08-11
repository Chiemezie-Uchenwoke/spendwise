import spendwiseLogo from "../../assets/spendwise.png";
import { Link } from "react-router";


const DesktopHeader = () => {
    return (
        <header 
            className="hidden w-full h-[4rem] min-[1000px]:flex items-center border-b-1 border-black/30"
        >
            <div className="container w-full flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img 
                        src={spendwiseLogo} 
                        alt="SpendWise Logo" 
                        className="w-[2.5rem] h-auto " 
                    />
                    <h1 className="font-bold">SpendWise</h1>
                </div>

                <nav className="flex gap-8" aria-label="Main site navigation">
                    <a href="#features" className="capitalize font-medium">features</a>

                    <a href="#how-it-works" className="capitalize font-medium">how it works</a>

                    <a href="#reviews" className="capitalize font-medium">reviews</a>
                </nav>

                <nav className="flex gap-4 items-center" aria-label="User actions">
                    <Link className="capitalize font-medium">sign in</Link>

                    <Link className="capitalize font-medium bg-pri-col text-white-col py-2 px-6 rounded-xl">get started</Link>
                </nav>
            </div>
        </header>
    )
}

export default DesktopHeader;