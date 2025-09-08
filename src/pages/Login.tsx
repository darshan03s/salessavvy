import LoginForm from "@/components/auth/LoginForm"
import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className="login-page max-w-[400px] mx-auto h-[calc(100vh-48px-48px)] flex justify-center items-center">
            <div className="p-2 px-3 md:px-2 w-full">
                <LoginForm />
                <div className="flex items-center gap-2 justify-center pt-2 text-sm">Not registered? <Link to={"/auth/register"} className="text-blue-400 underline">Register here</Link> </div>
            </div>
        </div>
    )
}

export default Login
