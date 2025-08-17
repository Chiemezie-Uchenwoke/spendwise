import { Link } from "react-router";

const RegisterForm = () => {
    return (
        <div className="form-header">
            <div className="form-wrapper">
                <div className="flex flex-col gap-2">
                    <h2 className="capitalize font-bold text-base md:text-lg lg:text-xl">Create an account</h2>

                    <p className="text-sm text-black/50">
                        Enter your information to create an acount
                    </p>
                </div>

                <form className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label 
                          htmlFor="username"
                          className="font-medium"
                        >
                            Fullname
                        </label>

                        <input 
                          type="text" 
                          placeholder="John Doe" 
                          id="username" 
                          className="border border-black/20 w-full h-[2.5rem] rounded-md px-2 text-sm focus:border-2 focus:border-black lowercase"
                        />
                    </div>

                    <div flex flex-col gap-2>
                        <label 
                          htmlFor="email"
                          className="font-medium"
                        >
                            Email
                        </label>

                        <input 
                          type="email" 
                          id="email" 
                          placeholder="name@example.com" 
                          className="border border-black/20 w-full h-[2.5rem] rounded-md px-2 text-sm focus:border-2 focus:border-black lowercase"
                        />
                    </div>

                    <div flex flex-col gap-2>
                        <label 
                          htmlFor="password"
                          className="font-medium"
                        >
                            Password
                        </label>

                        <input 
                          type="password" 
                          id="password" 
                          placeholder="Enter password"
                          className="border border-black/20 w-full h-[2.5rem] rounded-md px-2 text-sm focus:border-2 focus:border-black lowercase"
                        />
                    </div>

                    <button className="bg-pri-col text-white-col py-2 rounded-md font-semibold capitalize cursor-pointer">Register</button>
                </form>

                <div className="flex flex-col gap-4">
                    <p className="text-xs">
                        Already have an account? <Link to="/login" className="text-pri-col font-medium hover:brightness-90">Login</Link>
                    </p>

                    <Link to="/" className="text-sec-col capitalize text-xs font-semibold hover:underline">back to home page</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;