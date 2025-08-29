import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const TransactionModal = (isOpen, onClose, onSubmit, defaultValues={}, mode="add") => {

    const [formData, setFormData] = useState({
        amount: "",
        type: "",
        categoryId: "",
        description: "",
        date: ""
    });

    if (!isOpen) return null;
// backdrop-blur-sm bg-black/40 absolute inset-0 flex items-center justify-center
    return (
        <div className="w-full ">
            <div className="w-full max-w-[35rem] mx-auto border border-black/30 shadow-xs rounded-md py-8 px-4 flex flex-col gap-4">
                <div className="flex justify-between">
                    <h2
                        className="font-bold"
                    > 
                        {mode === "add" ? "Add Transaction" : "Edit Transaction"} 
                    </h2>

                    <button
                        className="flex items-center justify-center w-[1.8rem] h-[1.8rem] border border-black/30 rounded bg-white-shade hover:brightness-95 duration-100 cursor-pointer"
                    >
                        <IoMdClose />
                    </button>
                </div>

                <form 
                    className="flex flex-col gap-4"
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

                    <div>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TransactionModal;