import { createContext,useState,useContext } from "react";

export const MenuContext = createContext()

export function MenuProvider ({children}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <MenuContext.Provider value = {{mobileMenuOpen,setMobileMenuOpen}} >
            {children}
        </MenuContext.Provider>
    )
}
