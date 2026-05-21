import { Outlet } from "react-router-dom";
import NavigatorComponent from "../Navigate/Navigator.jsx";
import Footer from "../footer/Footer.jsx";
import AdminBar from "../components/AdminBar.jsx";    // ← ADD

export default function MainLayout() {
    return(
    <>
        <div><NavigatorComponent/></div>
        <main className="pt-16 md:pt-20">
            <Outlet/>
        </main>
        <div><Footer/></div>
        <AdminBar />                                   {/* ← ADD */}
    </>
    )
}