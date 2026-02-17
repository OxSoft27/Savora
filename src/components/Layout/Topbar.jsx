import React from 'react';
import { Bell, Search } from 'lucide-react';

const Topbar = ({ title }) => {
    return (
        <header className="topbar">
            <h1 className="text-xl">{title}</h1>

            <div className="flex-gap-2" style={{ alignItems: 'center' }}>
                <div className="search-bar">
                    <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--color-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                    />
                </div>

                <button className="icon-btn" style={{ position: 'relative' }}>
                    <Bell size={20} />
                    <span style={{
                        position: 'absolute', top: '6px', right: '6px',
                        width: '8px', height: '8px', borderRadius: '50%',
                        backgroundColor: '#EF4444', border: '2px solid white'
                    }}></span>
                </button>
            </div>
        </header>
    );
};

export default Topbar;
