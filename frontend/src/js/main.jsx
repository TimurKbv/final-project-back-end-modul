import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../scss/index.scss';
import NotificationProvider from './context/NotificationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <NotificationProvider>
        <App />
    </NotificationProvider>
    
);
