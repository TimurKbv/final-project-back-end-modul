import { useContext, useState } from "react";
import axios from 'axios';
import useAuthStore from "../hooks/useAuthStore";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { NotificationContext } from "../context/NotificationContext";
import Notification from "../components/Notification";





function Register(props) {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');

    /* ------------------------------------------------ */
    const [registerError, setRegisterError] = useState(false);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated());

    const navigate = useNavigate();
    const location = useLocation();
    // Alert
    const {notificationHandler} = useContext(NotificationContext);

    function alertSuccessHandler(msg) {
        notificationHandler({type: 'success', message: msg})
    }
    function alertFailHandler(msg) {
        notificationHandler({type: 'fail', message: msg})
    }
 

    async function submitHandler(evt) {
        evt.preventDefault();
        setRegisterError(false);

        if (username.trim().length < 3) {
            setRegisterError(true);
            return  //Todo erstelle ein Fehlermeldung für User
        }
        if (password.trim().length < 5) {
            setRegisterError(true);
            return //Todo erstelle ein Fehlermeldung für User
        }

        let userData = {
            username: username,
            password: password,
            fullname: fullname,
            city:  city,
            email: email
        }
        
        try {
            const response = await axios.post('http://localhost:8080/auth/register', userData);

            alertSuccessHandler('Thank you for registration!');

            navigate('/auth/login');

        } catch (error) {
            console.log(error);
            alertFailHandler(error.response.data.message);
        }

    } 
    
    return ( !isAuthenticated ?
        <div className="max-w-xs mx-auto mt-20">
            
            <form 
                className="rounded-3xl bg-zinc-900  px-10 mb-5 py-7 min-w-max shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
                onSubmit={submitHandler}
            >
                {/* fullname */}
                <div className="mb-6 border-b border-gray-500 ">
                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="fullname">
                    Fullname
                    </label>
                    <input 
                        className=" bg-transparent w-full border-none outline-none  focus:outline-none"
                        id="fullname" 
                        type="text" 
                        placeholder=" Captain Jack Sparrow"
                        value={fullname}
                        onChange={evt => setFullname(evt.target.value)}
                    />
                </div>
                {/* city */}
                <div className="mb-3 border-b border-gray-500">
                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="city">
                    city
                    </label>
                    <input 
                        className=" bg-transparent w-full border-none outline-none  focus:outline-none"
                        id="city" 
                        type="text" 
                        placeholder="Tortuga"
                        value={city}
                        onChange={evt => setCity(evt.target.value)}
                    />
                </div>
                {/* email */}
                <div className="mb-3 border-b border-gray-500">
                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="email">
                    Email
                    </label>
                    <input 
                        className=" bg-transparent w-full border-none outline-none  focus:outline-none"
                        id="email" 
                        type="email" 
                        placeholder="mail@mail.com"
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}
                    />
                </div>
                {/* username */}
                <div className="mb-4 border-b border-gray-500">
                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="username">
                    Username
                    </label>
                    <input 
                        className=" bg-transparent w-full border-none outline-none  focus:outline-none"
                        id="username" 
                        type="text" 
                        placeholder="captainJack"
                        value={username}
                        onChange={evt => setUsername(evt.target.value)}
                    />
                    {registerError && <p className="text-red-500 text-xs italic">Username schould be longer then 3 letter</p>}
                </div>
                {/* password */}
                <div className="mb-6 border-b border-gray-500">
                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="password">
                    Password
                    </label>
                    <input 
                        className=" bg-transparent w-full border-none outline-none  focus:outline-none"
                        id="password" 
                        type="password" 
                        placeholder="******************"
                        onChange={evt => setPassword(evt.target.value)}
                        value={password}
                    />
                    {registerError && <p className="text-red-500 text-xs italic">Password schould be longer!</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button 
                        className="bg-blue-700 hover:bg-blue-500 text-gray-900 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                        type="submit">
                        Registration
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

export default Register;