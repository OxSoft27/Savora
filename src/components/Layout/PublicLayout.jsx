import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';

const PublicLayout = () => {
    return (
        <div className="public-layout">
            <header className="public-header">
                <div className="logo-text">
                    <span>SAVORA</span>
                </div>

                <nav className="public-nav">
                    <a href="#about">About</a>
                    <a href="#reserve">Reserve</a>
                </nav>

                <a href="#reserve" className="btn-reserve-header">
                    Reserve a Table
                </a>
            </header>

            <main className="public-main">
                <Outlet />
            </main>

            <footer className="public-footer">
                <div className="logo-text" style={{ justifyContent: 'center', marginBottom: '1rem' }}>SAVORA</div>
                <p style={{ color: '#8D6E63', marginBottom: '0.5rem', fontSize: '0.875rem' }}>+62 812 3456 7890</p>
                <p style={{ color: '#aaa', fontSize: '0.75rem' }}>
                    &copy; {new Date().getFullYear()} SAVORA. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default PublicLayout;
