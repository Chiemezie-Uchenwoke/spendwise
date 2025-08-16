import { Link } from "react-router";

const TakeControlCta = () => {
    return (
        <section className="bg-blue-shade py-16">
            <div className="container flex flex-col items-center gap-6 text-center">
                <h2 className="text-white-col font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl">Ready to Take Control of Your Finances?</h2>

                <p className="text-acc-col lg:text-lg">
                    Join thousands of users who are already tracking their expenses smarter.
                </p>

                <Link to="#" className="bg-white-col hover:brightness-95 duration-300 text-pri-col py-3 lg:py-4 px-4 rounded-md sm:px-8 capitalize font-[600] lg:text-lg">
                    get started for free
                </Link>
            </div>
        </section>
    )
}

export default TakeControlCta;