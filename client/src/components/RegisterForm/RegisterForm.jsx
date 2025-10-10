import { Link } from "react-router";
import Notification from "../Notification/Notification";
import { useState } from "react";

const RegisterForm = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({
        message: "",
        type: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const url = "https://spendwise-backend-48nv.onrender.com/auth/register"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (!data.success){
                setNotification({message: data.message, type: "error"});
            } else {
                setNotification({message: data.message, type: "success"});

                setFormData({
                    username: "",
                    email: "",
                    password: ""
                });

                setIsPasswordTouched(false);
            }

        } catch (error) {
            console.error(error);
            setNotification({message: "Network error. Please check your connection and try again.", type: "error"});
        } finally {
            setLoading(false);
        }
        
        
    }

    const HandlePasswordError = () => {
        return (
            <p className="text-red-500 text-xs">Password should have at least 8 characters</p>
        )
    }

    return (
        <div className="form-header">

            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification({message: "", type: ""})}
            />

            <div className="form-wrapper">
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-base md:text-lg lg:text-xl">Create an account</h2>

                    <p className="text-sm text-black/50">
                        Enter your information to create an acount
                    </p>
                </div>

                <form 
                  className="flex flex-col gap-5"
                  onSubmit={handleSubmit}
                >
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
                          className="border border-black/20 w-full h-[2.5rem] rounded-md px-2 text-sm focus:border-2 focus:border-black lowercase placeholder:capitalize"
                          value={formData.username}
                          onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                    </div>

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
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                          className="border border-black/20 w-full h-[2.5rem] rounded-md px-2 text-sm focus:border-2 focus:border-black lowercase placeholder:capitalize"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          onBlur={() => setIsPasswordTouched(true)}
                        />
                        {isPasswordTouched && (formData.password.length < 8) ? <HandlePasswordError /> : null}
                    </div>

                    <button type="submit" disabled={loading} className="bg-pri-col text-white-col py-2 rounded-md font-semibold capitalize cursor-pointer hover:brightness-95 duration-300 ease-in-ou">
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <div className="flex flex-col gap-4">
                    <p className="text-xs">
                        Already have an account? <Link to="/login" className="text-pri-col font-medium hover:brightness-90">Login</Link>
                    </p>

                    <Link to="/" className="text-sec-col capitalize text-xs font-semibold hover:underline self-start">back to home page</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;