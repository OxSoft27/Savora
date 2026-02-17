import React from 'react';
import { Card } from '../components/ui/Card';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
    const { stats, insights } = useDashboardStats();

    if (stats.loading) {
        return (
            <div className="flex-center w-full h-[50vh]" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Loader2 className="animate-spin text-muted" size={32} />
            </div>
        );
    }

    return (
        <div>
            <div className="dashboard-metrics">
                <Card>
                    <h3 className="text-muted" style={{ fontSize: '0.875rem' }}>Total Reservations (Today)</h3>
                    <p className="text-3xl mt-2">{stats.totalReservations}</p>
                    <p className="text-success mt-2" style={{ fontSize: '0.75rem' }}>+12% <span className="text-muted">from yesterday</span></p>
                </Card>
                <Card>
                    <h3 className="text-muted" style={{ fontSize: '0.875rem' }}>Active Tables</h3>
                    <p className="text-3xl mt-2">{stats.activeTables}/{stats.totalTables}</p>
                    <p className="text-muted mt-2" style={{ fontSize: '0.75rem' }}>Currently occupied</p>
                </Card>
                <Card>
                    <h3 className="text-muted" style={{ fontSize: '0.875rem' }}>Revenue (Est.)</h3>
                    <p className="text-3xl mt-2">${stats.revenue}</p>
                    <p className="text-success mt-2" style={{ fontSize: '0.75rem' }}>+8% <span className="text-muted">from last week</span></p>
                </Card>
            </div>

            <div className="dashboard-content">
                <Card style={{ minHeight: '400px' }}>
                    <h3 className="text-xl mb-4">Reservation Trends</h3>
                    <div style={{
                        height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backgroundColor: '#F3F4F6', borderRadius: 'var(--radius-md)',
                        border: '2px dashed #E5E7EB', color: 'var(--color-text-muted)'
                    }}>
                        {/* Recharts implementation would go here */}
                        Chart Implementation Placeholder
                    </div>
                </Card>
                <Card>
                    <h3 className="text-xl mb-4" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FBBF24' }}></span>
                        Smart Insights
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {insights.map((insight, index) => (
                            <div key={index} style={{
                                padding: '1rem',
                                backgroundColor: insight.type === 'warning' ? '#FFFBEB' : '#EFF6FF',
                                borderRadius: 'var(--radius-md)',
                                border: `1px solid ${insight.type === 'warning' ? '#FEF3C7' : '#DBEAFE'}`,
                                fontSize: '0.875rem',
                                color: insight.type === 'warning' ? '#92400E' : '#1E40AF'
                            }}>
                                <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{insight.title}</p>
                                {insight.message}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
