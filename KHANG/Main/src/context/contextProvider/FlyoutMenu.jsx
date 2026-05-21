import {createContext, useContext,useState } from "react";

export const FlyoutContext = createContext()
export function FlyoutProvider({children}) {
    const [openMenu,setOpenMenu] = useState(null);
    return (
        <FlyoutContext.Provider value = {{openMenu,setOpenMenu}}>
            {children}
        </FlyoutContext.Provider>
    )
}
    