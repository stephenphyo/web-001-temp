import { createContext, useState } from 'react';

/* Context */
const AuthContext = createContext();
export default AuthContext;

/* Context Provider */
export const AuthContextProvider = (props) => {

    /* useState */
    const [auth, setAuth] = useState({});
    const [email, setEmail] = useState({});

    /* Context Values */
    const value = {
        auth, setAuth,
        email, setEmail
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}