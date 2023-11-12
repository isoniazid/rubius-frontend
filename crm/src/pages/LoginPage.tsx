import { useState } from "react";
import { Button } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";
import { IAuthData } from "../model/IAuthData";
export const LoginPage = () => {

    const { isLoggedIn, login } = useAuth();


    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const handleClick = () => {


        login({ userName: userName, password: password });
    }

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }



    return (
        <div className="login">
            <div className="login__window">
                <h3>Пожалуйста, авторизуйтесь</h3>
                <input type="text" name="userName" onChange={e => setUserName(e.target.value)}></input>
                <input type="password" name="password" onChange={e => setPassword(e.target.value)}></input>
                <Button variant="outline-primary" onClick={handleClick}>Войти</Button>
            </div>
        </div>
    );
}