import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../hooks/useAuthStore";
import { Navigate, useLocation } from "react-router-dom";


function UserProfile() {
    const [userData, setUserData] = useState({});
    const token = useAuthStore(state => state.getToken());
    const isAuthenticated = useAuthStore(state => state.isAuthenticated());
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserData();
        }
    }, []);

    async function fetchUserData() {
        // Fuehre axios Request auf protected Route durch
        // und definiere im options Objekt die Authorization, wo der Token reinkommt
        const resp = await axios.get('http://localhost:8080/users/user', {
            // withCredentials: true
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setUserData(resp.data.data);
    }


    return (
     isAuthenticated 
     ?
        <div className="container ml-5 w-full">
            <h2>Hello, <span>{userData.fullname}!</span></h2>
            

            <div className="container mt-5 ml-5 w-full flex flex-col gap-3">
                <h3 className="font-bold ">Your Profile</h3>
                
                <div className="w-2/5 flex justify-between"><h5>Name: </h5> <span className="font-bold">{userData.fullname}</span></div>
                <div className="w-2/5 flex justify-between"><h5>Username:</h5> <span className="font-bold">{userData.username}</span></div>
                <div className="w-2/5 flex justify-between"><h5>City: </h5> <span className="font-bold">{userData.city}</span></div>
                <div className="w-2/5 flex justify-between"><h5>Email: </h5> <span className="font-bold">{userData.email}</span></div>
                <div className="w-2/5 flex justify-between"><h5>Last login: </h5> <span className="font-bold">{userData.lastLogin}</span></div>
                <div className="w-2/5 flex justify-between"><h5>You have lists: </h5> <span className="font-bold">...</span></div>
                <div className="w-2/5 flex justify-between"><h5>You have uncompleted tasks: </h5> <span className="font-bold">...</span></div>
                
            </div>
        </div>
    :
        <Navigate to={'/auth/login'} replace state={{from: location}}/>
    )
}

export default UserProfile;