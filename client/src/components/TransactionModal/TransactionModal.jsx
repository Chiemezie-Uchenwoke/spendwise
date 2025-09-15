import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import getTransactionCategory from "../../services/category";
import { addTransaction } from "../../services/transaction";
import Notification from "../Notification/Notification";
import useRefreshUserToken from "../../hooks/useRefreshUserToken";

const TransactionModal = ({isOpen, onCloseModal}) => {

    const [notification, setNotification] = useState({
        message: "",
        type: ""
    });
    const [categories, setCategories] = useState([]); 
    const [formData, setFormData] = useState({
        amount: "",
        type: "",
        categoryId: "",
        description: "",
        date: ""
    });
    const refreshUserToken = useRefreshUserToken();

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

    useEffect(() => {
        if (isOpen) {
            setNotification({ message: "", type: "" });
        }
    }, [isOpen]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.amount || !formData.categoryId || !formData.type || !formData.description || !formData.date){
            setNotification({
                message: "Missing required fields",
                type: "info"
            });
            return;
        }

        try {
            const result = await addTransaction(formData);

            if (result.status === 401 || result.status === 403){
                const refreshed = refreshUserToken();
                if (refreshed) handleSubmit();
            }

            if (!result?.success){
                setNotification({
                    message: result.message,
                    type: "error"
                });
            } else {
                setNotification({
                    message: result.message,
                    type: "success"
                });

                setFormData({
                    amount: "",
                    type: "",
                    categoryId: "",
                    description: "",
                    date: ""
                });

                
            }
        } catch(err){
            console.error(err);
            setNotification({message: "Network error. Please check your connection and try again.", type: "error"});
        } finally {
            setTimeout(() => {
                onCloseModal();
            }, 2000)
        }
        
    }

    if (!isOpen) return null;

// backdrop-blur-sm bg-black/40 absolute inset-0 flex items-center justify-center
    return (
        <div className="w-full ">
            {
                notification.message && 
                <Notification  
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({message: "", type: ""})}
                />
            }
            <div className="w-full max-w-[35rem] mx-auto bg-white/70 border border-black/30 shadow-xs rounded-md py-8 px-4 flex flex-col gap-6">
                <div className="flex justify-between">
                    <h2
                        className="font-bold"
                    > 
                        Add Transaction 
                    </h2>

                    <button
                        className="flex items-center justify-center w-[1.8rem] h-[1.8rem] border border-black/30 rounded bg-white-shade hover:brightness-95 duration-100 cursor-pointer"
                        onClick={onCloseModal}
                    >
                        <IoMdClose />
                    </button>
                </div>

                <form 
                    className="flex flex-col gap-8"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="amount" className="capitalize font-medium text-sm">amount</label>
                        <input 
                            id="amount"
                            type="number"
                            placeholder="Amount"
                            value={formData.amount}
                            className="border border-black/30 px-2 h-10 rounded-md"
                            onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="type" className="capitalize font-medium text-sm">type</label>
                        <select 
                            name="type" 
                            id="type"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="border border-black/30 px-2 h-10 rounded-md"
                        >
                            <option value="">Select</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="categoryId" className="capitalize font-medium text-sm">Select Category</label>
                        <select 
                            name="categoryId" 
                            id="categoryId"
                            value={formData.categoryId}
                            onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                            className="border border-black/30 px-2 h-10 rounded-md"
                        >
                            <option value="">Select</option>
                            {
                                categories.filter(catg => catg.type === formData.type)
                                    .map((catg) => {
                                    return(
                                        
                                            <option 
                                                key={catg?._id}
                                                value={catg?._id}
                                                className="outline-0"
                                            >
                                                {catg.name}
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
                                placeholder="Description" 
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="border border-black/30 px-2 h-10 rounded-md"
                            />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="date" className="capitalize font-medium text-sm">Transaction date</label>
                        <input 
                            type="date" 
                            placeholder="Choose Date"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="border border-black/30 px-2 h-10 rounded-md"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="bg-pri-col/90 hover:bg-pri-col duration-300 text-white-col py-2 rounded-md cursor-pointer capitalize font-semibold text-base"
                    >
                        submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default TransactionModal;