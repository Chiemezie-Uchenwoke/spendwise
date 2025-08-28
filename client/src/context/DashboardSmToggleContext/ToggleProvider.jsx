import { useState } from "react";
import { ToggleContext } from "./ToggleContext";

const ToggleProvider = ({children}) => {
    const [toggle, setToggle] = useState(false);

    return (
        <ToggleContext.Provider value={{toggle, setToggle}}>
            {children}
        </ToggleContext.Provider>
    )
}

export default ToggleProvider;