import { useState, useEffect, useContext } from "react"
import { navItems } from "./navItem.js";
import { MenuContext } from "../context/contextProvider/menuContext.jsx"
import { useAuth } from "../context/AuthContext.jsx"
import NavButton from "./NavigateButton/NavButton.jsx";
import MobileMenuButtonComponent from "./NavigateButton/mobile/MobileMenuButton.jsx";
import MobileDashboard from "./NavigateButton/mobile/MobileDashboard.jsx";
import LoginModal from "../components/LoginModal.jsx"
import myImage from "../assets/yay.jpeg"
import "../index.css"

export default function NavigatorComponent() {
    const { mobileMenuOpen, setMobileMenuOpen } = useContext(MenuContext);
    const { admin, logout } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Change this inside your NavigatorComponent file
    const nav = navItems?.map((item) => (
        <NavButton 
            key={item.to} 
            label={item.label} 
            to={item.to} 
            menu={item.menu} 
            isScrolled={isScrolled} // <-- Pass down the scrolling state here
        />
    )) ?? [];
    useEffect(() => {
        const handleScroll = () => {
            // Trigger color flip when user scrolls past 20px
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") setMobileMenuOpen(false);
        }
        if (mobileMenuOpen) { 
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
            return () => {
                document.removeEventListener("keydown", handleEscape);
                document.body.style.overflow = "auto";
            };
        }
    }, [mobileMenuOpen, setMobileMenuOpen]);

    return (
        <>
            {/* FIXED DYNAMIC STYLES:
              - At Top: Plain gray background (`bg-zinc-800`), white text (`text-white`), transparent border.
              - Scrolled: Translucent transparent white (`bg-white/80 backdrop-blur-md`), black text (`text-black`), dark border line.
            */}
            <nav 
                className={`h-16 md:h-20 fixed top-0 left-0 right-0 w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 flex items-center justify-between z-50 transition-all duration-300 ease-in-out
                ${isScrolled 
                    ? "bg-white/80 backdrop-blur-md text-black border-b border-black/10 shadow-sm" 
                    : "bg-zinc-800 text-white border-b border-transparent"
                }`}
            >
                
                <img src={myImage} loading="lazy" alt="Logo"
                    className="h-9 md:h-11 w-auto object-contain flex-shrink-0" />

                <div className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1 justify-center ml-8">
                    {nav}
                </div>

                <div className="hidden md:flex items-center gap-3 ml-4">
                    {/* Admin controls */}
                    {admin ? (
                        <div className="flex items-center gap-2">
                            <span className={`text-xs font-mono px-2 py-1 rounded-full border transition-colors ${
                                isScrolled 
                                ? "text-amber-700 bg-amber-50 border-amber-200" 
                                : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                            }`}>
                                ⚙ {admin.username}
                            </span>
                            <button
                                onClick={logout}
                                className={`text-xs transition-colors ${isScrolled ? "text-zinc-500 hover:text-red-600" : "text-zinc-400 hover:text-red-400"}`}
                                title="Sign out"
                            >
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowLogin(true)}
                            className={`opacity-0 hover:opacity-60 transition-opacity duration-300 p-1 ${isScrolled ? "text-zinc-800" : "text-zinc-300"}`}
                            title="Admin"
                            aria-label="Admin login"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Passed down scrolling state if your custom button needs internal style changes */}
                <MobileMenuButtonComponent
                    setMobilePara={setMobileMenuOpen}
                    mobilePara={mobileMenuOpen}
                    aria-expanded={mobileMenuOpen}
                    isScrolled={isScrolled} 
                />

                {mobileMenuOpen && (
                    <MobileDashboard nav={nav} />
                )}
            </nav>

            {/* Login Modal */}
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </>
    )
}