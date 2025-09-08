import RegisterForm from "@/components/auth/RegisterForm"
import { Link } from "react-router-dom"

const Register = () => {
    return (
        <div className="register-page max-w-[400px] mx-auto h-[calc(100vh-48px-48px)] flex justify-center items-center">
            <div className="p-2 px-3 md:px-2 w-full">
                <RegisterForm />
                <div className="flex items-center gap-2 justify-center pt-2 text-sm">Already registered? <Link to={"/auth/login"} className="text-blue-400 underline">Login here</Link> </div>
            </div>
        </div>
    )
}

export default Register
