import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const AppLayout = () => {
    const location = useLocation();

    const getPageTitle = (pathname) => {
        switch (pathname) {
            case '/': return 'Dashboard';
            case '/reservations': return 'Reservations';
            case '/tables': return 'Floor Plan & Tables';
            case '/analytics': return 'Analytics';
            case '/settings': return 'Settings';
            default: return 'Overview';
        }
    };

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-wrapper">
                <Topbar title={getPageTitle(location.pathname)} />
                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
