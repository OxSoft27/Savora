import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useTables } from '../hooks/useTables';
import { Plus, Users, MapPin } from 'lucide-react';

const Tables = () => {
    const { tables, loading } = useTables();
    const [selectedTable, setSelectedTable] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTableClick = (table) => {
        setSelectedTable(table);
        setIsModalOpen(true);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'available': return '#10B981'; // Green
            case 'occupied': return '#EF4444'; // Red
            case 'reserved': return '#F59E0B'; // Amber
            default: return '#9CA3AF';
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTable(null);
    };

    return (
        <div>
            <div className="flex-between mb-6">
                <h2 className="text-xl">Floor Map</h2>
                <Button onClick={() => { setSelectedTable(null); setIsModalOpen(true); }}>
                    <Plus size={16} style={{ marginRight: '0.5rem' }} />
                    Add Table
                </Button>
            </div>

            {loading ? (
                <div className="text-center p-8 text-muted">Loading tables...</div>
            ) : (
                <div className="tables-grid">
                    {tables.map((table) => (
                        <Card
                            key={table.id}
                            className="card-hover"
                            style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                            onClick={() => handleTableClick(table)}
                        >
                            <div style={{
                                position: 'absolute', top: 0, left: 0, width: '4px', height: '100%',
                                backgroundColor: getStatusColor(table.status)
                            }}></div>

                            <div className="flex-between mb-4" style={{ paddingLeft: '0.5rem' }}>
                                <span className="text-xl">{table.name}</span>
                                <Badge variant={
                                    table.status === 'available' ? 'success' :
                                        table.status === 'occupied' ? 'error' : 'warning'
                                }>
                                    {table.status}
                                </Badge>
                            </div>

                            <div style={{ paddingLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div className="flex items-center gap-2 text-muted" style={{ fontSize: '0.875rem' }}>
                                    <Users size={14} />
                                    <span>Capacity: {table.capacity}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted" style={{ fontSize: '0.875rem' }}>
                                    <MapPin size={14} />
                                    <span>{table.zone}</span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={selectedTable ? `Edit Table ${selectedTable.name}` : 'New Table'}
                footer={
                    <>
                        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                        <Button onClick={closeModal}>{selectedTable ? 'Save Changes' : 'Create Table'}</Button>
                    </>
                }
            >
                <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Table Name</label>
                        <input
                            type="text"
                            className="search-input w-full"
                            style={{ width: '100%' }}
                            defaultValue={selectedTable?.name || ''}
                            placeholder="e.g. T-12"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Capacity</label>
                            <input
                                type="number"
                                className="search-input w-full"
                                style={{ width: '100%' }}
                                defaultValue={selectedTable?.capacity || 4}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Zone</label>
                            <select className="search-input w-full" style={{ width: '100%' }} defaultValue={selectedTable?.zone || 'Main Hall'}>
                                <option value="Main Hall">Main Hall</option>
                                <option value="Terrace">Terrace</option>
                                <option value="Window">Window View</option>
                                <option value="Private">Private Room</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Status</label>
                        <div className="flex gap-2">
                            {['available', 'occupied', 'reserved'].map(status => (
                                <button
                                    key={status}
                                    type="button"
                                    onClick={() => { }} // In real app, update state
                                    className={`btn btn-sm ${selectedTable?.status === status ? 'btn-primary' : 'btn-secondary'}`}
                                    style={{ textTransform: 'capitalize' }}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Tables;
