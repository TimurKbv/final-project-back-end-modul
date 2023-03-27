import useAuthStore from "../hooks/useAuthStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";


function PrivateRoute() {
    const authStore = useAuthStore();
    const location = useLocation();

    return (
        authStore.isAuthenticated() ? <Outlet /> : <Navigate to='/auth/login' replace state={{from: location}} />
    );
}


export default PrivateRoute;