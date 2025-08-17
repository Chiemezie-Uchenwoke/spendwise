import { Link } from "react-router";

const RegisterForm = () => {
    return (
        <form>
            <div>
                <h2>Create an account</h2>
                <p>
                    Enter your information to create an acount
                </p>
            </div>
            
            <div>
                <label htmlFor="username">Fullname</label>
                <input type="text" placeholder="John Doe" id="username" />
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="name@example.com" />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
            </div>

            <button>Register</button>

            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </form>
    )
}

export default RegisterForm;