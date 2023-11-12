import { createContext, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { IAuthData } from "../model/IAuthData";
import AppService from "../services/ApiService";
import TokenService from "../services/TokenService";
import PubSub from "../services/PubSub";

interface AuthContextValue {
    isLoggedIn: boolean;
    login: (authData: IAuthData) => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | any>(null);

function AuthProvider({ children }: any) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(TokenService.isTokenValid());

    const login = async (authData: IAuthData) => {
        try {
            const token = await AppService.login(authData);
            TokenService.setToken(token.access_token);
            setIsLoggedIn(true);
        } catch (e) {
            console.error(e);
        }
    };

    const logout = () => {
        TokenService.removeToken();
        setIsLoggedIn(false);
    };

    const checkAuth = async () => {
        try {
            const token = await AppService.refresh();
            TokenService.setToken(token.access_token);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    PubSub.on('logout', logout);

    const value: AuthContextValue = {
        isLoggedIn,
        login,
        logout,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };