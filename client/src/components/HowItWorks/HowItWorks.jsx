const HowItWorks = () => {

    const howItWorksSteps = [
        {
            id: 1,
            heading: "Sign up",
            text: "Create your free account in seconds with just your email and password."
        },
        {
            id: 2,
            heading: "Add transaction",
            text: "Start logging your daily transactions with amount, category, and descriptions."
        },
        {
            id: 3,
            heading: "Track & Analyze",
            text: "Monitor your spending habits and make informed financial decisions."
        }
    ]

    return (
        <section id="how-it-works" className="top-margin bg-acc-col/45 py-16">
            <div className="container flex flex-col gap-10">
                <div className="section-intro">
                    <h2 className="section-heading">How it works</h2>
                    <p className="section-text">
                        Get started in three simple steps
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 lg:gap-8">
                    {
                        howItWorksSteps.map((step) => {
                            return (
                                <div key={step.id} className="flex flex-col gap-4 border border-black/15 py-8 px-4 rounded-md ">
                                    <span className="w-[3rem] h-[3rem] flex justify-center items-center bg-pri-col text-white-col rounded-[50%] font-bold">{step.id}</span>

                                    <h3 className="font-bold capitalize">{step.heading}</h3>

                                    <p className="text-base sm:text-sm lg:text-base">
                                        {step.text}
                                    </p> 
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default HowItWorks;