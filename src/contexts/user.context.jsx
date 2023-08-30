import { createContext, useState } from "react";


// the accual value that will be accessed
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

//the actual componenet
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};
    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}