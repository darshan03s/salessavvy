import { Outlet } from "react-router-dom"
import Header from "./Header"

const Main = () => {
    return (
        <main className="flex-1">
            <Outlet />
        </main>
    )
}

const Footer = () => {
    return (
        <footer className="bg-foreground text-background w-full h-12 flex items-center justify-center">
            <span className="text-xs">Copyright @2025</span>
        </footer>
    )
}

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Main />
            <Footer />
        </div>
    )
}

export default Layout