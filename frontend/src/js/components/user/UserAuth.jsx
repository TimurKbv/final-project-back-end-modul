import { Link } from "react-router-dom"
import useAuthStore from "../../hooks/useAuthStore";


function UserAuth(props) {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated());
    const logout = useAuthStore(state => state.logout);

    return (

        <div className='absolute right-0 top-0'>
            {
            !isAuthenticated 
            ?
                <div className="flex gap-5">
                    <Link 
                    to='/auth/register'
                    className="bg-blue-700 hover:bg-blue-500 text-gray-700 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                        Register
                    </Link>
                    <Link 
                    to='/auth/login'
                    className="bg-green-700 hover:bg-green-500 text-gray-700 font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                        Log In
                    </Link>
                </div>                
            :
                <div className="flex gap-5">
                    {/* <Link 
                    to='/users/user'
                    className="bg-blue-700 hover:bg-blue-500 text-gray-700 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                        Profile
                    </Link> */}
                    <button 
                    onClick={logout}
                    className="bg-red-700 hover:bg-red-500 text-gray-700 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                        Logout
                    </button> 
                </div>
            }
        </div>
    )
}


export default UserAuth;