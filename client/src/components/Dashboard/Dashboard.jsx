import { MdDashboard } from "react-icons/md";
import { FaUpload, FaArrowTrendUp, FaArrowRightFromBracket } from "react-icons/fa6";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from "react";

const Dashboard = () => {
    const [loggingOut, setLoggingOut] = useState(false);
    const {user, setUser} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            const apiUrl = "http://localhost:3000/auth/logout";
            const response = await fetch(apiUrl, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok){
                setUser(null);
                navigate("/");
            } else {
                console.error("Logout failed");
                setUser(null);
                navigate("/");
            }
        } catch (err){
            console.error(err);
            setUser(null)
            navigate("/");
        } finally {
            setLoggingOut(false);
        }
    }

    return (
        <div className="w-full h-[calc(100vh-3.8rem)] min-[1000px]:h-[calc(100vh-4rem)] relative ">
            <div className="w-full h-full flex gap-4">
                <aside 
                    className="w-[65%] max-w-[15rem] min-[900px]:w-[25%] h-full shadow-lg absolute left-0 top-0 min-[900px]:static min-[900px]:border-r border-black/20 flex flex-col justify-between p-3 z-20 bg-white-col overflow-y-auto"
                >
                    <div className="flex flex-col gap-8">   
                        <div className="flex flex-col gap-1">
                            <h2 className="font-bold text-sm">Welcome</h2>
                            <p className="text-sm capitalize">
                                {
                                    user ? user?.username : null
                                }
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button className="text-sm capitalize cursor-pointer bg-pri-col text-white-col py-2 px-4 rounded-md hover:brightness-95">
                                add transaction
                            </button>

                            <h4 className="text-sm capitalize flex items-center gap-2 text-pri-col bg-pri-col/10 py-2 px-4 rounded-md text-center select-none">
                                <MdDashboard className="text-pri-col" /> 
                                dashboard
                            </h4>

                            <button className="dashboard-btn">
                                <FaUpload />
                                add profile image
                            </button>

                            <button className="dashboard-btn">
                                <FaArrowTrendUp />
                                transactions
                            </button>

                            <button className="dashboard-btn">
                                <FaArrowDown />
                                income
                            </button>

                            <button className="dashboard-btn">
                                <FaArrowUp />
                                expense
                            </button>
                        </div>
                    </div>

                    <button 
                        className="dashboard-btn"
                        onClick={handleLogout}
                        disabled={loggingOut}
                    >
                        <FaArrowRightFromBracket />
                        {
                            loggingOut ? "Logging out..." : "log out"
                        }
                    </button>
                </aside>

                <div className="w-full min-[900px]:w-[75%] ">
                    <p>Data</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;