import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Armchair, PieChart, Settings, Coffee } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: CalendarDays, label: 'Reservations', path: '/admin/reservations' },
        { icon: Armchair, label: 'Tables', path: '/admin/tables' },
        { icon: PieChart, label: 'Analytics', path: '/admin/analytics' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <Coffee size={24} />
                <span>SAVORA</span>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <item.icon size={20} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="user-profile">
                    <div className="avatar">JD</div>
                    <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>Jane Doe</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Admin</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
