import { useEffect, useState } from "react";
import axios from 'axios';
import useAuthStore from "../hooks/useAuthStore.js";
import { Navigate, useLocation, useNavigate } from "react-router-dom";



function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    // --------------------------------------
    const authenticate = useAuthStore((state) => state.authenticate);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated());

    const token = useAuthStore(state => state.getToken());
    const validateToken = useAuthStore(state => state.validateToken);


    useEffect(() => {
        if (token && !isAuthenticated) {
            validateToken()
        }
    }, []);

    async function submitHandler(evt) {
        evt.preventDefault();

        let userData = {
            username: username,
            password: password
        }
        try { 
            const responseUser = await axios.post('http://localhost:8080/auth/login', userData);

            authenticate(responseUser.data);
            isAuthenticated && navigate('/todolists');
            
        } catch (error) {
            console.log(error); // Todo erstelle ein Fehlermeldung für User
        }
    }
    
    return (
        !isAuthenticated ?
        <div className=" max-w-xs mx-auto mt-20">
            <form 
                className="rounded-3xl bg-zinc-900  px-10 mb-5 py-7 min-w-max shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
                onSubmit={submitHandler}
            >
                <div className="mb-4 border-b border-gray-500">
                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="username_login">
                    Username
                    </label>
                    <input 
                        className=" bg-transparent w-full border-none outline-none mb-1"
                        id="username_login" 
                        type="text" 
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />                   
                </div>
                {username.length < 1 && <p className="text-red-500 text-xs italic mb-7">Please choose a username.</p>}
                <div className="mb-2 border-b border-gray-500">
                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="password_login">
                    Password
                    </label>
                    <input 
                        className=" bg-transparent w-full border-none outline-none mb-1"
                        id="password_login" 
                        type="password" 
                        placeholder="******************"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                {password.length < 1 && <p className="text-red-500 text-xs italic mb-7">Please choose a password.</p>}
                <div className="flex items-center justify-between">
                    <button 
                        className="bg-green-700 hover:bg-green-500 text-gray-700 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                        type="submit">
                        Log In
                    </button>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
            &copy;2023 Todo Corp. All rights reserved.
            </p>
        </div>
    : 

        <Navigate to={'/todolists'} replace state={{from: location}}/>

    )

}

export default Login;