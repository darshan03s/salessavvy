import { ThemeToggleButton } from "@/features/theme"
import { Link, useLocation } from "react-router-dom"
import { Button, buttonVariants } from "../ui/button"
import { Handbag, LogOut, ShoppingCart, User2 } from "lucide-react"
import { cn } from "@/lib/utils"
import CategoriesHeader from "./CategoriesHeader"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const Header = () => {

    const location = useLocation();

    let isAuthRoute = false;

    if (location.pathname.includes('auth')) {
        isAuthRoute = true;
    }

    return (
        <header className="sticky top-0 z-10">
            <div className=" flex justify-between items-center h-12 px-6 py-3 text-foreground backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background">
                <div className="header-left">
                    <Link to="/">{import.meta.env.VITE_APP_NAME}</Link>
                </div>
                <div className="header-right flex items-center gap-3">
                    {
                        !isAuthRoute ?
                            <Link to={'/cart'} className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'rounded-full relative')}>
                                <ShoppingCart />
                                <span
                                    className="absolute -top-1.5 -right-1 flex min-h-5 min-w-6 items-center justify-center rounded-full px-2 bg-red-600 text-[10px] font-bold text-white"
                                >
                                    0
                                </span>

                            </Link> : null
                    }

                    <Popover>
                        <PopoverTrigger className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'rounded-full')}>
                            <User2 />
                        </PopoverTrigger>
                        <PopoverContent side="bottom" align="end" className="w-40 p-2 shadow-none">
                            <div className="flex flex-col gap-2">
                                <Link to="/orders" className={cn(buttonVariants({ variant: 'ghost' }))}>
                                    <Handbag /> Orders
                                </Link>
                                <Button variant={'ghost'} className=''>
                                    <LogOut /> Log Out
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Link to="/auth/login" className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}>
                        Login
                    </Link>
                    <ThemeToggleButton />
                </div>

            </div>
            <CategoriesHeader />
        </header>
    )
}

export default Header