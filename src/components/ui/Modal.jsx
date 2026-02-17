import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';

export const Modal = ({ isOpen, onClose, title, children, footer }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)'
        }} onClick={onClose}>
            <div
                ref={modalRef}
                className="modal-content"
                style={{
                    backgroundColor: 'white', borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '500px',
                    maxHeight: '90vh', overflowY: 'auto',
                    animation: 'fadeIn 0.2s ease-out'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header" style={{
                    padding: '1.5rem', borderBottom: '1px solid var(--color-border)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <h3 className="text-lg">{title}</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body" style={{ padding: '1.5rem' }}>
                    {children}
                </div>

                {footer && (
                    <div className="modal-footer" style={{
                        padding: '1rem 1.5rem', borderTop: '1px solid var(--color-border)',
                        display: 'flex', justifyContent: 'flex-end', gap: '0.75rem',
                        backgroundColor: '#F9FAFB'
                    }}>
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};
