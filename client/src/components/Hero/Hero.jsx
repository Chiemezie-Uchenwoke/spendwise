import { Link } from "react-router";
import mobileChart from "../../assets/mobile_chart.jpg";

const Hero = () => {
    return (
        <section className="bg-pri-col min-h-[calc(100vh-4rem)] md:min-h-[calc(60vh-4rem)] lg:min-h-[calc(100vh-4rem)] 2xl:min-h-[calc(80vh-4rem)]  flex items-center justify-center py-12">
            <div className="container h-full flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex flex-col gap-6 md:gap-4 lg:gap-6 md:w-[50%]">
                    <h2 
                      className="capitalize font-bold text-3xl min-[1200px]:text-5xl min-[1500px]:text-6xl text-white-col"
                    >
                        track your finances effortlessly
                    </h2>

                    <p className="text-white-col min-[1200px]:text-lg/[2rem] min-[1500px]:text-xl/[2.5rem]">
                        Take control of your finances with our simple and intuitive expense tracking app. Add, edit, and achieve your financial goals. 
                    </p>

                    <div className="my-3 flex flex-col min-[400px]:flex-row min-[768px]:flex-col min-[840px]:flex-row gap-4">
                        <Link to="/login" 
                          className="bg-white-col text-pri-col font-medium py-3 px-4 min-[400px]:px-6 min-[600px]:px-8 rounded-md capitalize hover:brightness-95 border-2 border-white-col text-center transition duration-300 ease-in-out"
                        >
                            start tracking
                        </Link>

                        <a 
                          href="#how-it-works" 
                          className="capitalize border-2 font-medium py-3 px-4 min-[400px]:px-6 min-[600px]:px-8 border-white-col rounded-md text-white-col text-center hover:bg-white-col hover:text-pri-col duration-300 ease-in-out" 
                        >
                            how it works
                        </a>
                    </div>
                </div>

                <div className="w-full h-full md:w-[50%]">
                    <img 
                      src={mobileChart} 
                      alt="image of a mobile phone showing a chart"
                      className="w-full h-[60%] max-h-[22rem] 2xl:max-h-[27rem] object-cover rounded-md shadow-md"
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero;