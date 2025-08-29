import { MdDashboard } from "react-icons/md";
import { FaUpload, FaArrowTrendUp, FaArrowRightFromBracket } from "react-icons/fa6";
import { FaArrowDown, FaArrowUp, FaWallet } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Notification from "../Notification/Notification";
import useRefreshUserToken from "../../hooks/useRefreshUserToken";
import { useToggle } from "../../hooks/useToggle";
import { TbMoneybag } from "react-icons/tb";
import { fetchAllTransactions } from "../../services/transaction";
import TransactionModal from "../TransactionModal/TransactionModal";

const Dashboard = () => {
    const [loggingOut, setLoggingOut] = useState(false);
    const [notification, setNotification] = useState({
        message: "",
        type: ""
    });
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [balance, setBalance] = useState(0);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const {user, setUser, fetchAuthUser} = useAuth();
    const navigate = useNavigate();
    const refreshUserToken = useRefreshUserToken();
    const {isSidebarOpen} = useToggle();

    useEffect(() => {
        const tryRefresh = async () => {
            if (!user) {
                const refreshed = await refreshUserToken();
                if (refreshed?.success) {
                    await fetchAuthUser();
            } else {
                    setUser(null);
                    navigate("/login", { replace: true });
                }
            }
        };
        tryRefresh();
    }, [user, refreshUserToken, fetchAuthUser, setUser, navigate]);

    const finalizeLogout = () => {
        setUser(null);
        navigate("/login");
    };

    const handleTransactions = async () => {
        try {
            const result = await fetchAllTransactions();
            if (result.success){
                const allTransaction = result.userTransactions;

                const incomeArray = allTransaction.filter(t => t.type === "income");
                const income = incomeArray.map(income => Number(income.amount));
                const totalIncome = income.reduce((acc, value) => acc + value, 0);
                console.log(typeof totalIncome)
                setTotalIncome(totalIncome);

                const expenseArray = allTransaction.filter(t => t.type === "expense");
                const expense = expenseArray.map(expense => Number(expense.amount));
                const totalExpense = expense.reduce((acc, value) => acc + value, 0);
                setTotalExpense(totalExpense);
                
                const balance = totalIncome - totalExpense;
                setBalance(balance);
            }
        } catch (err){
            console.error(err);
            return null;
        }

    }
     
    useEffect(() => {
        handleTransactions();
    }, []);

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
                setNotification({
                    message: "Log Out Successful!",
                    type: "success"
                })
                
                setTimeout(() => {
                    finalizeLogout();
                }, 3000);
            } else {
                console.error("Logout failed");
                setNotification({
                    message: "Couldn't log out",
                    type: "error"
                });
            }
        } catch (err){
            console.error(err);
            setNotification({message: "Network error. Please check your connection and try again.", type: "error"});

        } finally {
            setLoggingOut(false);
        }
    }

    return (
        <div className="w-full h-[calc(100vh-3.8rem)] min-[1000px]:h-[calc(100vh-4rem)] relative ">
            <Notification 
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({message: "", type: ""})}
            />

            <div className="w-full h-full flex gap-4">
                <aside 
                    className={`w-[65%] max-w-[15rem] min-[900px]:w-[25%] h-full ${isSidebarOpen ? "flex" : "hidden"} shadow-lg absolute left-0 top-0 min-[900px]:static min-[900px]:border-r border-black/20 min-[900px]:flex flex-col justify-between p-3 z-20 bg-white-col overflow-y-auto`}
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
                                <button className="text-sm capitalize cursor-pointer bg-pri-col text-white-col py-2 px-4 rounded-md hover:brightness-95 flex items-center gap-2 justify-center">
                                    <IoMdAdd className="text-lg" /> add transaction
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

                {/* Main dashboard contents */}
                <div className="w-full min-[900px]:w-[75%] p-4 flex flex-col gap-6 relative">
                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 items-center">
                        <div className="flex flex-col gap-3 bg-white/70 border border-black/15 rounded-md py-6 px-3">
                            <div className="flex items-center gap-2">
                                <span 
                                    className="w-8 h-8 border border-black/20 bg-green-400/10 flex items-center justify-center rounded"
                                >
                                    <FaArrowDown className="text-green-600" />
                                </span>
                                <p className="font-medium">Income</p>
                            </div>
                            <p className="text-base flex items-center gap-2 sm:text-lg md:text-xl font-semibold"><FaWallet /> {totalIncome}</p>
                        </div>

                        <div className="flex flex-col gap-3 bg-white/70 border border-black/15 rounded-md py-6 px-3">
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-8 h-8 border border-black/20 bg-red-300/30 flex items-center justify-center rounded"
                                >
                                    <FaArrowUp className="text-red-500" />
                                </span>
                                <p className="font-medium">Expense</p>
                            </div>
                            <p className="text-base flex items-center gap-2 sm:text-lg md:text-xl font-semibold"><FaWallet /> {totalExpense} </p>
                        </div>

                        <div className="flex flex-col gap-3 bg-white/70 border border-black/15 rounded-md py-6 px-3 col-start-1 col-span-2 row-start-2 row-end-3 sm:row-start-1 sm:row-end-2 sm:col-start-3 sm:col-span-1">
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-8 h-8 border border-black/20 bg-pri-col/90 flex items-center justify-center rounded"
                                >
                                    <TbMoneybag className="text-lg text-white-col" />
                                </span>
                                <p className="font-medium">Balance</p>
                            </div>
                            <p className="text-base flex items-center gap-2 sm:text-lg md:text-xl font-semibold"><FaWallet /> {balance} </p>
                        </div>

                    </div>

                    <TransactionModal 
                        mode={isEditing ? "edit" : "add"}
                        isOpen={isTransactionModalOpen}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;