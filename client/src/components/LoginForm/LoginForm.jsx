import { Link } from "react-router";

const LoginForm = () => {
    return (
        <div className="form-header">
            <div className="form-wrapper">
                <div className="flex flex-col gap-2">
                    <h2 className="capitalize font-bold text-base md:text-lg lg:text-xl">Login</h2>

                    <p className="text-sm text-black/50">
                        Provide your information to access your acount
                    </p>
                </div>

                <form 
                  className="flex flex-col gap-5"
                >
                    <div className="flex flex-col gap-2">
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

                    <div className="flex flex-col gap-2">
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
                        className="border border-black/20 w-full h-[2.5rem] rounded-md px-2 text-sm focus:border-2 focus:border-black placeholder:capitalize"
                        />
                    </div>

                    <button className="bg-pri-col text-white-col py-2 rounded-md font-semibold capitalize cursor-pointer hover:brightness-95 duration-300 ease-in-out">Login</button>
                </form>

                <div className="flex flex-col gap-4">
                    <p className="text-xs">
                        Don't have an account? <Link to="/register" className="text-pri-col font-medium hover:brightness-90">Sign up</Link>
                    </p>

                    <Link to="/" className="text-sec-col capitalize text-xs font-semibold hover:underline self-start">back to home page</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;