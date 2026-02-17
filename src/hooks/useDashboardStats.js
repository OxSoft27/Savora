import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { format, startOfDay, endOfDay, subDays } from 'date-fns';

export const useDashboardStats = () => {
    const [stats, setStats] = useState({
        totalReservations: 0,
        activeTables: 0,
        totalTables: 0,
        revenue: 0,
        loading: true,
    });

    const [insights, setInsights] = useState([]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            if (!supabase) throw new Error('Demo Mode');

            const today = new Date();
            const start = startOfDay(today).toISOString();
            const end = endOfDay(today).toISOString();

            // 1. Total Reservations Today
            const { count: resCount, error: resError } = await supabase
                .from('reservations')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', start)
                .lte('created_at', end);

            if (resError) throw resError;

            // 2. Active Tables
            const { data: tablesData, error: tableError } = await supabase
                .from('tables')
                .select('status');

            if (tableError) throw tableError;

            const totalTables = tablesData?.length || 0;
            const activeTables = tablesData?.filter(t => t.status === 'occupied').length || 0;

            setStats({
                totalReservations: resCount || 0,
                activeTables: activeTables || 0,
                totalTables: totalTables || 0,
                revenue: 850, // Mock revenue as it requires more complex query
                loading: false,
            });

        } catch (error) {
            // Demo / Fallback Data
            console.log('Using mock data for dashboard.');
            setStats({
                totalReservations: 24,
                activeTables: 8,
                totalTables: 12,
                revenue: 1240,
                loading: false,
            });
        } finally {
            generateInsights();
        }
    };

    const generateInsights = async () => {
        const insightsData = [
            {
                type: 'warning',
                title: 'Peak Time Alert',
                message: 'High reservation volume expected between 7:00 PM - 9:00 PM.'
            },
            {
                type: 'info',
                title: 'Growth',
                message: 'Reservations are up 15% compared to last week.'
            }
        ];
        setInsights(insightsData);
    };

    return { stats, insights };
};
