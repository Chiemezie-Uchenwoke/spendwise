import spendWiseLogo from "../../assets/spendwise.png";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-sec-col pt-16">
            <div className="container flex flex-col gap-6">
                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <img src={spendWiseLogo} alt="SpendWise Logo" className="w-[2.5rem] h-auto"/>
                            <p className="text-white-col font-bold text-lg md:text-xl">SpendWise</p>
                        </div>

                        <p className="text-white-col/50">
                            Simple expense tracking for everyone.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h3 className="font-bold text-white-col text-lg md:text-xl capitalize">product</h3>

                        <ul className="flex flex-col gap-4">
                            <li className="text-white-col/50 hover:text-white-col capitalize">
                                <a href="#features">features</a>
                            </li>
                            
                            <li className="text-white-col/50 capitalize hover:text-white-col">
                                <a href="#how-it-works">how it works</a>
                            </li>

                            <li className="text-white-col/50 capitalize hover:text-white-col">
                                <a href="#reviews">reviews</a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h3 className="font-bold text-white-col capitalize text-lg md:text-xl">connect</h3>

                        <div className="flex gap-6">
                            <a href="#">
                                <FaTwitter className="text-white-col/50 hover:text-white-col text-2xl" />
                            </a>

                            <a href="#">
                                <FaFacebook className="text-white-col/50 hover:text-white-col text-2xl" />
                            </a>

                            <a href="#">
                                <FaInstagram className="text-white-col/50 hover:text-white-col text-2xl" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="py-6 flex flex-col md:flex-row md:justify-between gap-4 border-t border-white-col/10">
                    <p className="text-white-col/50 font-medium text-sm">© 2024 SpendWise. All rights reserved.</p>
                    <a href="https://chiemezie-uchenwoke.vercel.app/" className="text-white-col/50 font-medium hover:text-acc-col text-sm" target="_blank">Website developed by Chiemezie Uchenwoke</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;