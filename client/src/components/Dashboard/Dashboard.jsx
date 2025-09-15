import { MdDashboard, MdDelete, MdEdit } from "react-icons/md";
import { FaUpload, FaArrowTrendUp, FaArrowRightFromBracket, FaFilter } from "react-icons/fa6";
import { FaArrowDown, FaArrowUp, FaWallet, FaList } from "react-icons/fa";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { LuClock2 } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { TbReload } from "react-icons/tb";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Notification from "../Notification/Notification";
import useRefreshUserToken from "../../hooks/useRefreshUserToken";
import { useToggle } from "../../hooks/useToggle";
import { TbMoneybag } from "react-icons/tb";
import { fetchAllTransactions } from "../../services/transaction";
import TransactionModal from "../TransactionModal/TransactionModal";
import getTransactionCategory from "../../services/category";
import applyTransactionFilter from "../../services/applyFilter";
import getSingleTransaction from "../../services/getSingleTransaction";
import handleEditTransaction from "../../services/editTransaction";

const Dashboard = () => {
    const [loggingOut, setLoggingOut] = useState(false);
    const [notification, setNotification] = useState({
        message: "",
        type: ""
    });
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [balance, setBalance] = useState(0);
    const [isAccountSummary, setIsAccountSummary] = useState(true);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isRecentTransaction, setIsRecentTransaction] = useState(true);
    const [totalTransaction, setTotalTransaction] = useState(0);
    const [transactions, setTansactions] = useState([]);
    const [allTransactions, setAllTansactions] = useState([]);
    const [incomeTransaction, setIncomeTransaction] = useState([]);
    const [expenseTransaction, setExpenseTransaction] = useState([]);
    const [isIncome, setIsIncome] = useState(false);
    const [isExpense, setIsExpense] = useState(false);
    const [isAllTransaction, setIsAllTransaction] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const [isTransactionFilter, setIsTransactionFilter] = useState(false);
    const [filterForm, setFilterForm] = useState({
        startDate: "",
        endDate: "",
        type: "",
        categoryId: ""
    });
    const [filteredTransactions, setFilteredTransactions] = useState([]); 
    const [editFormData, setEditFormData] = useState({
        _id: "",
        amount: "",
        type: "",
        categoryId: "",
        description: "",
        date: ""
    });

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
                const allTransaction = [...result.userTransactions].reverse();
                const recentTransactions = allTransaction.slice(0, 10);
                setTansactions(recentTransactions);
                setAllTansactions(allTransaction);

                const incomeArray = allTransaction.filter(t => t.type === "income");
                const income = incomeArray.map(income => Number(income.amount));
                const totalIncome = income.reduce((acc, value) => acc + value, 0);
                setIncomeTransaction(incomeArray);
                setTotalIncome(totalIncome);

                const expenseArray = allTransaction.filter(t => t.type === "expense");
                const expense = expenseArray.map(expense => Number(expense.amount));
                const totalExpense = expense.reduce((acc, value) => acc + value, 0);
                setExpenseTransaction(expenseArray);
                setTotalExpense(totalExpense);
                
                const balance = totalIncome - totalExpense;
                setBalance(balance);

                const totalTransaction = allTransaction.length;
                setTotalTransaction(totalTransaction);
                
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

    const fetchCategory = async () => {
        try {
            const result = await getTransactionCategory();

            if (result.success){
                const categories = result.categories;
                setCategories(categories);
            }

        } catch (err){
            console.error(err);
            return null;
        }
    }

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleFilterFormReset = () => {
        setFilterForm({
            startDate: "",
            endDate: "",
            type: "",
            categoryId: ""
        });
        setIsAllTransaction(true);
        setIsTransactionFilter(false);
    }

    const handleFilterTransaction = async (e) => {
        e.preventDefault();

        if (!filterForm.startDate && !filterForm.endDate && !filterForm.type && !filterForm.categoryId) {
            return setNotification({
                message: "Please select at least one filter option",
                type: "info"
            });
        }

        try {
            const filteredTransactions = await applyTransactionFilter(filterForm.startDate, filterForm.endDate, filterForm.type, filterForm.categoryId);

            if (filteredTransactions.success){
                setFilteredTransactions(filteredTransactions.result);
                setIsTransactionFilter(true);
                setIsAllTransaction(false);
            } else {
                setNotification({ message: filteredTransactions.message || "No results found", type: "error" });
            }
        } catch (err){
            console.error(err);
            setNotification({ message: "Network error. Please try again.", type: "error" });
        }
    }

    const handleShowEditModal = () => {
        setIsEditing(true);
        setIsTransactionModalOpen(false);
        setIsRecentTransaction(false);
        setIsIncome(false);
        setIsAccountSummary(false);
        setIsAllTransaction(false);
        setIsFilter(false);
        setIsTransactionFilter(false);
    }

    const handleHideEditModal = () => {
        setIsEditing(false);
        setIsTransactionModalOpen(false);
        setIsRecentTransaction(false);
        setIsIncome(false);
        setIsAccountSummary(false);
        setIsAllTransaction(true);
        setIsFilter(true);
        setIsTransactionFilter(false);
    }

    const handleTransactionEdit = async (id) => {
        handleShowEditModal();

        const getUserTransaction = await getSingleTransaction(id);
        
        if (getUserTransaction?.transaction){
            setEditFormData({
                ...editFormData, 
                _id: getUserTransaction.transaction._id,
                amount: getUserTransaction.transaction.amount,
                type: getUserTransaction.transaction.type,
                categoryId: getUserTransaction.transaction.categoryId,
                description: getUserTransaction.transaction.description,
                date: new Date(getUserTransaction.transaction.date).toISOString().split("T")[0]
            });
        } else {
            console.warn("Transaction not found");
        }
    }

    const handleEditFormSubmission = async (e) => {
        e.preventDefault();
        try {
            const result = await handleEditTransaction(editFormData._id, editFormData);

            if (result.success){
                setNotification({
                    message: result.message,
                    type: "success"
                });

                handleHideEditModal();
                await handleTransactions();

            }
        } catch(err){
            console.error(err);
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
                    className={`w-[65%] max-w-[15rem] min-[900px]:w-[25%] h-full ${isSidebarOpen ? "flex" : "hidden"} shadow-lg min-[900px]:shadow-none absolute left-0 top-0 min-[900px]:static min-[900px]:border-r border-black/20 min-[900px]:flex flex-col justify-between p-3 z-20 bg-white-col min-[900px]:bg-white/70 overflow-y-auto`}
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

                            <div className="flex flex-col gap-2">
                                <button 
                                    className="text-sm capitalize cursor-pointer bg-pri-col text-white-col py-2 px-4 rounded-md hover:brightness-95 flex items-center gap-2 justify-center"
                                    onClick={() => {
                                        setIsTransactionModalOpen(true);
                                        setIsRecentTransaction(false);
                                        setIsIncome(false);
                                        setIsAccountSummary(false);
                                        setIsAllTransaction(false);
                                        setIsFilter(false);
                                        setIsTransactionFilter(false);
                                    }}
                                >
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

                                <button 
                                    className={`dashboard-btn ${isRecentTransaction ? "bg-gray-200/80" : "bg-white/70"}`}
                                    onClick={() => {
                                        setIsRecentTransaction(true);
                                        setIsIncome(false);
                                        setIsExpense(false);
                                        setIsAccountSummary(true);
                                        setIsAllTransaction(false);
                                        setIsTransactionModalOpen(false);
                                        setIsFilter(false);
                                        setIsTransactionFilter(false);
                                    }}
                                >
                                    <LuClock2 />
                                    recent 
                                </button>

                                <button 
                                    className={`dashboard-btn ${isAllTransaction ? "bg-gray-200/80" : "bg-white/70"}`}
                                    onClick={() => {
                                        setIsAllTransaction(true);
                                        setIsRecentTransaction(false);
                                        setIsIncome(false);
                                        setIsExpense(false);
                                        setIsAccountSummary(false);
                                        setIsTransactionModalOpen(false);
                                        setIsFilter(true);
                                        setIsTransactionFilter(false);
                                    }}
                                >
                                    <FaArrowTrendUp />
                                    all transactions
                                </button>

                                <button 
                                    className={`dashboard-btn ${isIncome ? "bg-gray-200/80" : "bg-white/70"}`}
                                    onClick={() => {
                                        setIsIncome(true);
                                        setIsRecentTransaction(false);
                                        setIsExpense(false);
                                        setIsAccountSummary(true);
                                        setIsAllTransaction(false);
                                        setIsTransactionModalOpen(false);
                                        setIsFilter(false);
                                        setIsTransactionFilter(false);
                                    }}
                                >
                                    <FaArrowDown />
                                    income
                                </button>

                                <button 
                                    className={`dashboard-btn ${isExpense ? "bg-gray-200/80" : "bg-white/70"}`}
                                    onClick={() => {
                                        setIsIncome(false);
                                        setIsRecentTransaction(false);
                                        setIsExpense(true);
                                        setIsAccountSummary(true);
                                        setIsAllTransaction(false);
                                        setIsTransactionModalOpen(false);
                                        setIsFilter(false);
                                        setIsTransactionFilter(false);
                                    }}
                                >
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
                <div className="w-full h-full overflow-y-scroll min-[900px]:w-[75%] p-4 flex flex-col gap-6 relative">
                    {
                        isAccountSummary && 
                        <div className="w-full flex flex-col gap-3">
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
                                    <p className="text-base flex items-center gap-2 sm:text-lg md:text-xl font-semibold"><FaWallet /> {totalIncome.toLocaleString()}</p>
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
                                    <p className="text-base flex items-center gap-2 sm:text-lg md:text-xl font-semibold"><FaWallet /> {totalExpense.toLocaleString()} </p>
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
                                    <p className="text-base flex items-center gap-2 sm:text-lg md:text-xl font-semibold"><FaWallet /> {balance.toLocaleString()} </p>
                                </div>

                            </div>

                            <button 
                                className="text-sm capitalize cursor-pointer bg-pri-col text-white-col py-2 px-4 rounded-md hover:brightness-95 flex md:hidden items-center gap-2 justify-center"
                                onClick={() => {
                                    setIsTransactionModalOpen(true);
                                    setIsRecentTransaction(false);
                                    setIsIncome(false);
                                    setIsAccountSummary(false);
                                    setIsAllTransaction(false);
                                    setIsFilter(false);
                                    setIsTransactionFilter(false);
                                }}
                            >
                                <IoMdAdd className="text-lg" /> add transaction
                            </button>
                        </div>
                    }

                    <TransactionModal 
                        isOpen={isTransactionModalOpen}
                        onCloseModal={() => {
                            setIsTransactionModalOpen(false);
                            setIsRecentTransaction(true);
                            setIsAccountSummary(true);
                            setIsAllTransaction(false);
                            setIsFilter(false);
                            setIsTransactionFilter(false);
                            handleTransactions();
                        }}
                    />

                    {/* recent transaction */}
                    {
                        isRecentTransaction &&
                        <div className="w-full flex flex-col gap-3 bg-white/70 py-4 rounded-md border border-black/10">
                            <div className="flex justify-between px-4">
                                <h2 className="capitalize font-semibold flex items-center gap-2">
                                    recent <span className="hidden sm:block">transactions</span>
                                </h2>

                                <p className="flex gap-2 bg-pri-col/5 py-1 px-3 rounded-md text-sm text-black/60">
                                    <span>{totalTransaction} </span>
                                    <span>{totalTransaction === 1 ? "result" : "results"}</span>
                                </p>
                            </div>

                            <div className="flex flex-col">
                                {
                                    transactions.map((t) => {
                                        return (
                                            <div 
                                                key={t?._id}
                                                className="flex justify-between gap-4 items-center py-5 border-t border-black/5 px-4"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`w-8 h-8 lg:h-10 lg:w-10 border border-black/20 ${t?.type === "income" ? "bg-green-400/10" : "bg-red-500/10"} flex items-center justify-center rounded-[50%]`}>
                                                        {
                                                            t?.type === "income" ? 
                                                            <FaArrowDown className="text-green-600" /> : <FaArrowUp className="text-red-600" />
                                                        }
                                                    </span>
                                                    <div>
                                                        <p className="capitalize text-xs sm:text-sm">{t?.description}</p>
                                                        <p className="text-xs opacity-50">
                                                            {new Date(t?.date).toLocaleDateString("en-US", {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric"
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="">
                                                    <p className={`${t?.type === "income" ? "text-green-600" : "text-red-500"} font-medium text-xs sm:text-sm` }>
                                                        <span>
                                                            {
                                                                t?.type === "income" ? "+" : "-"
                                                            }
                                                        </span>
                                                        <span> {t?.amount.toLocaleString()} </span>
                                                    </p>

                                                    <p className={`${t?.type === "income" ? "bg-green-300/30" : "bg-red-300/40"} text-xs flex justify-center items-center capitalize`}>
                                                        {
                                                            t?.type === "income" ? "income" : "expense"
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }

                    {/* income transactions */}
                    {
                        isIncome && 
                        <div className="w-full flex flex-col  bg-white/70 py-4 rounded-md border border-black/10">

                            <div className="flex justify-between px-4">
                                <h2 className="capitalize font-semibold">
                                    Income transactions
                                </h2>

                                <p className="flex gap-2 bg-pri-col/5 py-1 px-3 rounded-md text-sm text-black/60">
                                    <span>{incomeTransaction.length} </span>
                                    <span>{incomeTransaction === 1 ? "result" : "results"}</span>
                                </p>
                            </div>

                            <div className="flex flex-col">
                                {
                                    incomeTransaction.map((t) => {
                                        return (
                                            <div 
                                                key={t?._id}
                                                className="flex justify-between items-center py-5 border-t border-black/5 px-4"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`w-8 h-8 lg:h-10 lg:w-10 border border-black/20 bg-green-400/10 flex items-center justify-center rounded-[50%]`}>
                                                        <FaArrowDown className="text-green-600" />
                                                    </span>
                                                    <div>
                                                        <p className="capitalize text-sm">{t?.description}</p>
                                                        <p className="text-xs opacity-50">
                                                            {new Date(t?.date).toLocaleDateString("en-US", {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric"
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="">
                                                    <p className={`text-green-600 font-medium` }>
                                                        <span> + </span>
                                                        <span> {t?.amount.toLocaleString()} </span>
                                                    </p>
                                                    <p className={`bg-green-300/30 text-xs flex justify-center items-center capitalize`}>
                                                        {t?.type}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }

                    {/* expense transaction */}
                    {
                        isExpense && 
                        <div className="w-full flex flex-col  bg-white/70 py-4 rounded-md border border-black/10">

                            <div className="flex justify-between px-4">
                                <h2 className="capitalize font-semibold">
                                    Expense transactions
                                </h2>

                                <p className="flex gap-2 bg-pri-col/5 py-1 px-3 rounded-md text-sm text-black/60">
                                    <span>{expenseTransaction.length} </span>
                                    <span>{expenseTransaction === 1 ? "result" : "results"}</span>
                                </p>
                            </div>

                            <div className="flex flex-col">
                                {
                                    expenseTransaction.map((t) => {
                                        return (
                                            <div 
                                                key={t?._id}
                                                className="flex justify-between items-center py-5 border-t border-black/5 px-4"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`w-8 h-8 lg:h-10 lg:w-10 border border-black/20 bg-red-500/10 flex items-center justify-center rounded-[50%]`}>
                                                        <FaArrowDown className="text-red-500" />
                                                    </span>

                                                    <div>
                                                        <p className="capitalize text-sm">{t?.description}</p>
                                                        <p className="text-xs opacity-50">
                                                            {new Date(t?.date).toLocaleDateString("en-US", {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric"
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="">
                                                    <p className={`text-red-500 font-medium` }>
                                                        <span> + </span>
                                                        <span> {t?.amount.toLocaleString()} </span>
                                                    </p>
                                                    <p className={`bg-red-500/10 text-xs flex justify-center items-center capitalize`}>
                                                        {t?.type}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }

                    {/* all transaction */}
                    {
                        isFilter && 
                        <div className="bg-white/70 p-4 flex flex-col gap-4 border border-black/20 rounded-md w-full">
                            <h2 className="flex items-center-safe gap-2 capitalize font-semibold text-base">
                                <span className="w-10 h-10 bg-pri-col rounded-md flex justify-center items-center"> <FaFilter className="text-white-col" /> </span>
                                <span>filter transactions</span>
                            </h2>

                            <form 
                                className="w-full flex flex-col gap-6 sm:gap-4"
                                onSubmit={handleFilterTransaction}
                            >
                                <div className="w-full flex flex-col sm:flex-row gap-4">
                                    <div className="w-full sm:w-1/2 flex flex-col gap-1">
                                        <label 
                                            htmlFor="start-date"
                                            className="capitalize font-medium text-sm"
                                        >
                                            start date
                                        </label>
                                        <input 
                                            type="date" 
                                            id="start-date"
                                            className="border border-black/20 h-8 rounded-md px-2 text-sm outline-0" 
                                            value={filterForm.startDate}
                                            onChange={(e) => setFilterForm({...filterForm, startDate: e.target.value})}
                                        />
                                    </div>

                                    <div className="w-full sm:w-1/2 flex flex-col gap-1">
                                        <label 
                                            htmlFor="end-date"
                                            className="capitalize font-medium text-sm"
                                        >
                                            end date
                                        </label>
                                        <input 
                                            type="date" 
                                            id="end-date" 
                                            className="border border-black/20 h-8 rounded-md px-2 text-sm outline-0" 
                                            value={filterForm.endDate}
                                            onChange={(e) => setFilterForm({...filterForm, endDate: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="w-full sm:w-1/2 flex flex-col gap-1">
                                        <label 
                                            htmlFor="transaction-type"
                                            className="capitalize font-medium text-sm"
                                        >
                                            transaction type
                                        </label>
                                        <select 
                                            id="trn-type" 
                                            className="border border-black/20 h-8 rounded-md px-2 text-sm capitalize outline-0" 
                                            value={filterForm.type}
                                            onChange={(e) => setFilterForm({...filterForm, type: e.target.value})}
                                        >
                                            <option value="">select</option>
                                            <option value="all">all</option>
                                            <option value="income">income</option>
                                            <option value="expense">expense</option>
                                        </select>
                                    </div>

                                    <div className="w-full sm:w-1/2 flex flex-col gap-1">
                                        <label 
                                            htmlFor="category"
                                            className="capitalize font-medium text-sm"
                                        >
                                            category
                                        </label>
                                        <select 
                                            id="category" 
                                            className="border border-black/20 h-8 rounded-md px-2 text-sm capitalize outline-0" 
                                            value={filterForm.categoryId}
                                            onChange={(e) => setFilterForm({...filterForm, categoryId: e.target.value})}
                                        >
                                            <option value="">all category</option>
                                            {
                                                categories.filter((catg) => catg.type === filterForm.type)
                                                .map((catg) => {
                                                    return (
                                                        <option key={catg._id} value={catg._id}>
                                                            {catg.name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
                                    <button 
                                        type="submit"
                                        className="flex items-center gap-2 justify-center bg-pri-col text-white-col w-full sm:w-1/2 text-center rounded-md capitalize text-sm font-medium hover:brightness-110 duration-200 cursor-pointer py-2.5"
                                    >
                                        <IoSearch /> 
                                        apply filters
                                    </button>

                                    <button 
                                        type="reset"
                                        className="flex items-center gap-2 justify-center bg-pri-col/5 text-black w-full sm:w-1/2 text-center rounded-md capitalize text-sm font-medium hover:brightness-40 duration-200 cursor-pointer py-2.5 border border-black/10"
                                        onClick={handleFilterFormReset}
                                    >
                                        <TbReload /> 
                                        reset
                                    </button>
                                </div>

                            </form>
                        </div>
                    }

                    {
                        isAllTransaction && 

                        <div className="w-full flex flex-col gap-3 bg-white/70 py-4 rounded-md border border-black/10">
                            <div className="w-full flex justify-between px-4">
                                <h2 className="capitalize font-semibold flex items-center gap-2">
                                    <span className="w-9 h-9 hidden sm:flex justify-center items-center border border-black/15 rounded-md bg-gray-200/50 animate-pulse">
                                        <FaList className="text-lg opacity-70" />
                                    </span>
                                    transactions
                                </h2>

                                <p className="flex items-center gap-2 bg-pri-col/5 py-1 px-3 rounded-md text-sm text-black/60">
                                    <span>{totalTransaction} </span>
                                    <span>{totalTransaction === 1 ? "result" : "results"}</span>
                                </p>
                            </div>

                            <div className="px-4 overflow-x-auto">
                                <table className="w-full border border-black/20">
                                    <thead className="">
                                        <tr className="border border-black/15 bg-dark-col/70 text-white-col">
                                            <th className="capitalize text-xs sm:text-sm py-3 border border-white/20">date</th>
                                            <th className="capitalize text-xs sm:text-sm py-3 border border-white/20">description</th>
                                            <th className="capitalize text-xs sm:text-sm py-3 border border-white/20">type</th>
                                            <th className="capitalize text-xs sm:text-sm py-3 border border-white/20">amount</th>
                                            <th className="capitalize text-xs sm:text-sm py-3 border border-white/20">actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="">
                                        {
                                            allTransactions.map(t => {
                                                return(
                                                    <tr key={t._id} className="">
                                                        <td className="text-xs sm:text-sm px-2 border border-black/20 py-3 whitespace-nowrap">
                                                            {new Date(t?.date).toLocaleDateString("en-US", {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric"
                                                            })}
                                                        </td>

                                                        <td className="text-xs sm:text-sm px-2 border border-black/20 py-3">
                                                            {t?.description}
                                                        </td>

                                                        <td className="text-xs sm:text-sm px-2 border border-black/20 py-3 capitalize">
                                                            {t?.type}
                                                        </td>

                                                        <td className="text-xs sm:text-sm px-2 border border-black/20 py-3">
                                                            {t?.amount.toLocaleString()}
                                                        </td>

                                                        <td className="flex gap-3 items-center justify-center px-2 border border-black/10 py-3">
                                                            <button 
                                                                className="text-xs sm:text-sm flex items-center gap-2 bg-blue-500/90 text-white py-2 px-4 rounded-xl capitalize hover:bg-blue-600/90 font-medium cursor-pointer hover:shadow-md duration-200"
                                                                onClick={() => handleTransactionEdit(t?._id)}
                                                            >
                                                                <MdEdit />
                                                                edit
                                                            </button>

                                                            <button className="bg-red-400 text-white-col px-4 py-2 rounded-xl cursor-pointer hover:bg-red-500 hover:shadow-md duration-150 active:translate-y-1">
                                                                <MdDelete />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }

                    {
                        isTransactionFilter && 

                        <div className="w-full flex flex-col gap-3 bg-white/70 py-4 rounded-md border border-black/10">
                            <div className="w-full flex justify-between px-4">
                                <h2 className="capitalize font-semibold flex items-center gap-2">
                                    <span className="w-9 h-9 hidden sm:flex justify-center items-center border border-black/15 rounded-md bg-gray-200/50 animate-pulse">
                                        <FaList className="text-lg opacity-70" />
                                    </span>
                                    transactions
                                </h2>

                                <p className="flex items-center gap-2 bg-pri-col/5 py-1 px-3 rounded-md text-sm text-black/60">
                                    <span>{filteredTransactions.length} </span>
                                    <span>{filteredTransactions.length === 1 ? "result" : "results"}</span>
                                </p>
                            </div>

                            <div className="px-4 overflow-x-auto">
                                <table className="w-full border border-black/20">
                                    <thead className="">
                                        <tr className="border border-black/15 bg-dark-col/70 text-white-col">
                                            <th className="capitalize text-xs sm:text-sm py-3 border border-white/20">date</th>
                                            <th className="capitalize text-xs sm:text-sm py-3 border border-white/20">description</th>
                                            <th className="capitalize text-xs sm:text-sm py-3 border border-white/20">type</th>
                                            <th className="capitalize text-xs sm:text-sm py-3 border border-white/20">amount</th>
                                            <th className="capitalize text-xs sm:text-sm py-3 border border-white/20">actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="">
                                        {
                                            filteredTransactions.map(t => {
                                                return(
                                                    <tr key={t._id} className="">
                                                        <td className="text-xs sm:text-sm px-2 border border-black/20 py-3 whitespace-nowrap">
                                                            {new Date(t?.date).toLocaleDateString("en-US", {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric"
                                                            })}
                                                        </td>

                                                        <td className="text-xs sm:text-sm px-2 border border-black/20 py-3">
                                                            {t?.description}
                                                        </td>

                                                        <td className="text-xs sm:text-sm px-2 border border-black/20 py-3 capitalize">
                                                            {t?.type}
                                                        </td>

                                                        <td className="text-xs sm:text-sm px-2 border border-black/20 py-3">
                                                            {t?.amount.toLocaleString()}
                                                        </td>

                                                        <td className="flex gap-3 items-center justify-center px-2 border border-black/10 py-3">
                                                            <button 
                                                                className="text-xs sm:text-sm flex items-center gap-2 bg-blue-500/90 text-white py-2 px-4 rounded-xl capitalize hover:bg-blue-600/90 font-medium cursor-pointer hover:shadow-md duration-200"
                                                                onClick={() => handleTransactionEdit(t?._id)}
                                                            >
                                                                <MdEdit />
                                                                edit
                                                            </button>

                                                            <button className="bg-red-400 text-white-col px-4 py-2 rounded-xl cursor-pointer hover:bg-red-500 hover:shadow-md duration-150 active:translate-y-1">
                                                                <MdDelete />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }

                    {
                        isEditing && 
                        <div className="w-full h-full py-8 px-4 bg-dark-col/10 absolute left-0 top-0 flex justify-center items-center overflow-y-auto z-10">
                            <form 
                                className="bg-white/70 w-full max-w-[35rem] h-[95%] mx-auto py-8 px-4 shadow-lg rounded-md flex flex-col gap-6 overflow-y-auto"
                                onSubmit={handleEditFormSubmission}
                            >
                                <div className="flex justify-between gap-4">
                                    <h2 className="font-bold">Edit Transaction</h2>

                                    <button     
                                        className="border border-black/20 p-1.5 rounded bg-gray-200/50 cursor-pointer hover:bg-gray-200 duration-200"
                                        onClick={handleHideEditModal}
                                    >
                                        <IoMdClose />
                                    </button>
                                </div> 

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="amount" className="capitalize font-medium text-sm">amount</label>
                                    <input 
                                        type="number" 
                                        id="amount" 
                                        className="border border-black/20 rounded-md px-2 h-10" 
                                        value={editFormData.amount}
                                        onChange={(e) => setEditFormData({...editFormData, amount: e.target.value})}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="type" className="capitalize font-medium text-sm">type</label>
                                    <select 
                                        name="type" 
                                        id="type"
                                        value={editFormData.type}
                                        onChange={(e) => setEditFormData({...editFormData, type: e.target.value})}
                                        className="border border-black/30 px-2 h-10 rounded-md outline-0"
                                    >
                                        <option value="">Select</option>
                                        <option value="income">Income</option>
                                        <option value="expense">Expense</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="categoryId" className="capitalize font-medium text-sm">category</label>
                                    <select 
                                        name="categoryId" 
                                        id="categoryId"
                                        value={editFormData.categoryId}
                                        onChange={(e) => setEditFormData({...editFormData, categoryId: e.target.value})}
                                        className="border border-black/30 px-2 h-10 rounded-md outline-0"
                                    >
                                        <option value="">Select</option>
                                        {
                                            categories.filter(c => c.type === editFormData.type)
                                            .map(catg => {
                                                return (
                                                    <option key={catg?._id} className="outline-0" value={catg?._id}>
                                                        {catg?.name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="description" className="capitalize font-medium text-sm">description</label>
                                    <input 
                                        type="text" 
                                        id="description" 
                                        className="border border-black/20 rounded-md px-2 h-10" 
                                        value={editFormData.description}
                                        onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="date" className="capitalize font-medium text-sm">date</label>
                                    <input 
                                        type="date" 
                                        id="date" 
                                        className="border border-black/20 rounded-md px-2 h-10" 
                                        value={editFormData.date}
                                        onChange={(e) => setEditFormData({...editFormData, date: e.target.value})}
                                    />
                                </div>

                                <button 
                                    className="bg-pri-col/90 text-white py-2 rounded-md cursor-pointer hover:bg-pri-col font-medium capitalize duration-200"
                                    type="submit"
                                >
                                    save
                                </button>
                            </form>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Dashboard;