import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useReservations } from '../hooks/useReservations';
import { Plus, Filter, Calendar, Users, Clock, Search } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const Reservations = () => {
    const { reservations, loading, filter, setFilter } = useReservations();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const getStatusVariant = (status) => {
        switch (status) {
            case 'confirmed': return 'success';
            case 'pending': return 'warning';
            case 'cancelled': return 'error';
            case 'completed': return 'neutral';
            default: return 'neutral';
        }
    };

    const filteredReservations = reservations.filter(res =>
        res.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex-between mb-6">
                <div className="flex-gap-2">
                    <div className="search-bar" style={{ marginRight: '1rem' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--color-text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search guest..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={filter === 'all' ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={() => setFilter('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={filter === 'today' ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={() => setFilter('today')}
                        >
                            Today
                        </Button>
                    </div>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus size={16} style={{ marginRight: '0.5rem' }} />
                    New Reservation
                </Button>
            </div>

            <Card noPadding style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                        <tr>
                            <th style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>Guest</th>
                            <th style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>Date & Time</th>
                            <th style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>Table</th>
                            <th style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>Guests</th>
                            <th style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>Status</th>
                            <th style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" className="text-center p-8 text-muted">Loading reservations...</td></tr>
                        ) : filteredReservations.length === 0 ? (
                            <tr><td colSpan="6" className="text-center p-8 text-muted">No reservations found.</td></tr>
                        ) : (
                            filteredReservations.map((res) => (
                                <tr key={res.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <p style={{ fontWeight: 500, color: '#1F2937' }}>{res.customer_name}</p>
                                        <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{res.customer_phone || 'No phone'}</p>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-muted" />
                                            <span style={{ fontSize: '0.875rem' }}>{res.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Clock size={14} className="text-muted" />
                                            <span style={{ fontSize: '0.875rem' }}>{res.time}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>
                                        {res.tables ? `${res.tables.name} (${res.tables.zone})` : 'Unassigned'}
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <div className="flex items-center gap-1 text-sm">
                                            <Users size={14} className="text-muted" />
                                            {res.guests}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <Badge variant={getStatusVariant(res.status)}>
                                            {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                                        </Badge>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="New Reservation"
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button onClick={() => setIsModalOpen(false)}>Create Reservation</Button>
                    </>
                }
            >
                <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Guest Name</label>
                        <input type="text" className="search-input w-full" style={{ width: '100%' }} placeholder="John Doe" />
                    </div>
                    <div className="grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Date</label>
                            <input type="date" className="search-input w-full" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Time</label>
                            <input type="time" className="search-input w-full" style={{ width: '100%' }} />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Guests</label>
                        <input type="number" className="search-input w-full" style={{ width: '100%' }} defaultValue={2} />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Reservations;
