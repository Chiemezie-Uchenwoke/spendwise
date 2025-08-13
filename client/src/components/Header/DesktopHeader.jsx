import spendwiseLogo from "../../assets/spendwise.png";
import { Link } from "react-router";
import { useNavigate } from "react-router";


const DesktopHeader = () => {
    const navigate = useNavigate();

    const handleHomeNavigate = () => navigate("/");

    return (
        <header 
            className="hidden w-full h-[4rem] min-[1100px]:flex items-center border-b border-black/20"
        >
            <div className="container w-full flex justify-between items-center">
                <div className="flex items-center gap-2 cursor-pointer" onClick={handleHomeNavigate}>
                    <img 
                        src={spendwiseLogo} 
                        alt="SpendWise Logo" 
                        className="w-[2.5rem] h-auto " 
                    />
                    <h1 className="font-bold">SpendWise</h1>
                </div>

                <nav className="flex gap-8" aria-label="Main site navigation">
                    <a href="#features" className="nav-link">features</a>

                    <a href="#how-it-works" className="capitalize font-medium hover:text-pri-col">how it works</a>

                    <a href="#reviews" className="capitalize font-medium hover:text-pri-col">reviews</a>
                </nav>

                <nav className="flex gap-4 items-center" aria-label="User actions">
                    <Link className="capitalize font-medium hover:text-pri-col">sign in</Link>

                    <Link className="capitalize font-medium bg-pri-col text-white-col py-2 px-6 rounded-md hover:brightness-95">get started</Link>
                </nav>
            </div>
        </header>
    )
}

export default DesktopHeader;