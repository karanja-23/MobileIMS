import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [Token, setToken] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser, Token, setToken }}>
            {children}
        </UserContext.Provider>     
    )
}
export {UserContext, UserProvider}