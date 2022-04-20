import React,{ createContext, useState } from "react";

export const AuthContext = createContext(null);


export default function UserAuth({ children }){

    const [user, setUser] = useState(null);
    return(
        <AuthContext.Provider value = {{user , setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

