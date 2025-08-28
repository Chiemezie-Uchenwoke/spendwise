import { useState } from "react";
import { ToggleContext } from "./ToggleContext";

const ToggleProvider = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <ToggleContext.Provider value={{isSidebarOpen, setIsSidebarOpen}}>
            {children}
        </ToggleContext.Provider>
    )
}

export default ToggleProvider;