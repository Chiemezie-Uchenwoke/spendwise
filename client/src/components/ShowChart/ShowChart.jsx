import IncomeExpensePie from "../IncomeExpensePie/IncomeExpensePie";

const ShowChart = ({income, expense}) => {

    return (
        <div style={{ padding: 20 }} className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">SpendWise — Income vs Expense</h2>
            <IncomeExpensePie income={income} expense={expense} />
        </div>
    )
}

export default ShowChart;