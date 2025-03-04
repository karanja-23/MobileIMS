import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [Token, setToken] = useState(null);
    const [data, setData] = useState(null)
    const [expoToken, setExpoToken] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser, Token, setToken, data, setData, expoToken, setExpoToken }}>
            {children}
        </UserContext.Provider>     
    )
}
export {UserContext, UserProvider}