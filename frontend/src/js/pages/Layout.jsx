import { useEffect } from 'react';
import {Link, Outlet} from 'react-router-dom';
import Notification from '../components/Notification';
import UserAuth from '../components/user/UserAuth';
import useAuthStore from '../hooks/useAuthStore';

function Layout() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated());
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore(state => state.getToken());
    const validateToken = useAuthStore(state => state.validateToken);

    // Auto Auth
    useEffect(() => {
        if (token && !isAuthenticated) {
            validateToken()
        }
    }, []);

    return (
        <>
            <nav className='mb-10 '>
                <ul 
                className='flex gap-5 justify-center text-3xl font-bold text-gray-400 '
                >
                    <li className='hover:text-white'><Link to='/'>Home</Link></li>
                    <li className='hover:text-white transition-colors duration-300'><Link to='/todolists'>Todos</Link></li>
                </ul>
            </nav>

            {/* {<h2 style={{textAlign: 'center', fontSize: '18sp'}}>Welcome aboard, {isAuthenticated ? user.fullname : 'Anonymous'}!</h2>} */}

            <Notification />
            <UserAuth />

            <Outlet />
        </>
    );
}

export default Layout;