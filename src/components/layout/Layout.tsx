import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const Main = () => {
    return (
        <main className="flex-1">
            <Outlet />
        </main>
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