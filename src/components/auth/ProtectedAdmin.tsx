import { useUserContext } from '@/context/UserContext';
import { useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProtectedAdmin = ({ children }: { children: ReactNode }) => {
    const { user, fetchingUser } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !fetchingUser) {
            navigate("/auth/login");
            return;
        }

        if (user?.role === "CUSTOMER") {
            toast.error("You are not Admin");
            navigate("/");
            return;
        }
    }, [user, fetchingUser, navigate]);

    if (user && !fetchingUser && user.role === "ADMIN")
        return <>{children}</>
}

export default ProtectedAdmin
