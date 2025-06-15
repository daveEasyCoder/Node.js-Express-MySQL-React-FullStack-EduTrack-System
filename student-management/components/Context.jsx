import React, { createContext, useContext, useState } from "react";

const mycontext = createContext()
export const useSidebar = () => useContext(mycontext)

export const ContextProvider = ({children}) => {
    
  const [isSidebarVisible,setIsSidebarVisible] = useState(false)

    return (
        <mycontext.Provider value = {{isSidebarVisible,setIsSidebarVisible}}>
            {children}
        </mycontext.Provider>
    )
}