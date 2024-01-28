import React from "react";
import { useNavigate } from 'react-router-dom';
import authStore from "../stores/authStore";


const LoginForm = () => {
    const store = authStore();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        await store.login();

        //Navigate
        navigate("/");
    }
    return (
        <form onSubmit={handleLogin}>
            <input
                onChange={store.updateForm}
                value={store.loginData.email}
                name="email"
                type="email"
            />
            <input
                onChange={store.updateForm}
                value={store.loginData.password}
                name="password"
                type="password"
            />
            <button type="submit">Login</button>
        </form>
    );
}
export default LoginForm;