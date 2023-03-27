import { createContext, useEffect, useState } from "react";



export const NotificationContext = createContext();


function NotificationProvider({children}) {
    const [showNotification, setShowNotification] = useState(false);
    const [type, setType] = useState();
    const [message, setMessage] = useState();

    useEffect(() => {
        const time = setTimeout(() => {
            setShowNotification(false)
        }, 3000);
        return () => clearTimeout(time);
    }, [showNotification]);
    
    function notificationHandler(props) {
        setType(props.type);
        setMessage(props.message);
        setShowNotification(true);
    }  

    return (
        <NotificationContext.Provider
        value={{notificationHandler,  showNotification, type, message}}
        >
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider;