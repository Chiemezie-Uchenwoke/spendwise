import { FaPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { FaChartLine } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";

const Features = () => {
    return (
        <section 
          id="features" 
          className="container top-margin flex flex-col gap-8"
        >
            <div className="flex flex-col items-center gap-2">
                <h2 
                  className="capitalize font-bold text-xl md:text-2xl lg:text-3xl"
                >
                    simple yet powerful features
                </h2>

                <p className="text-center sm:text-lg">
                    Everything you need to manage your expenses effectively
                </p>
            </div>

            <div className="grid grid-cols-1 min-[520px]:grid-cols-2 min-[768px]:grid-cols-3 min-[768px]:grid-rows-2 gap-8">
                <div className="features-card">
                    <span className="features-icon-wrapper">
                        <FaPlus className="features-icon" />
                    </span>

                    <h3 className="font-bold">Add Expenses</h3>

                    <p className="font-500 text-black/60">
                        Quickly add new expenses with amount, category, and description in seconds.
                    </p>
                </div>

                <div className="features-card">
                    <span className="features-icon-wrapper">
                        <FaEdit className="features-icon" />
                    </span>

                    <h3 className="font-bold">Edit & Delete</h3>

                    <p className="font-500 text-black/60">
                        Easily modify or remove expenses to keep your records accurate and up-to-date.
                    </p>
                </div>

                <div className="features-card">
                    <span className="features-icon-wrapper">
                        <IoMdPricetags className="features-icon" />
                    </span>

                    <h3 className="font-bold">Categorize</h3>

                    <p className="font-500 text-black/60">
                        Organize expenses by categories like food, transport, shopping, and more.
                    </p>
                </div>

                <div className="features-card">
                    <span className="features-icon-wrapper">
                        <FaChartLine className="features-icon" />
                    </span>

                    <h3 className="font-bold">Visual Reports</h3>

                    <p className="font-500 text-black/60">
                        View your income and expenses in real time with beautiful, insightful charts.
                    </p>
                </div>

                <div className="features-card">
                    <span className="features-icon-wrapper">
                        <IoSearch className="features-icon" />
                    </span>

                    <h3 className="font-bold">Search & Filter</h3>

                    <p className="font-500 text-black/60">
                        Find specific expenses quickly with powerful search and filtering options.
                    </p>
                </div>

                <div className="features-card">
                    <span className="features-icon-wrapper">
                        <FaMobileAlt className="features-icon" />
                    </span>

                    <h3 className="font-bold">Mobile Friendly</h3>

                    <p className="font-500 text-black/60">
                        Access your expenses anywhere with our responsive web design.
                    </p>
                </div>
            </div>

        </section>
    )
}

export default Features;