import React from "react";
import { createContext } from "react";

const PantryContext = createContext();
const PantryProvider = ({ children }) => {

    const value = {
        
    }

    return (
        <PantryContext.Provider value={value}>
            {children}
        </PantryContext.Provider>
    )
};