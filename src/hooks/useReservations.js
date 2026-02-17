import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchReservations();
    }, [filter]);

    const fetchReservations = async () => {
        setLoading(true);
        try {
            if (!supabase) throw new Error('Demo Mode');

            let query = supabase
                .from('reservations')
                .select('*')
                .order('date', { ascending: true })
                .order('time', { ascending: true });

            if (filter === 'today') {
                const today = new Date().toISOString().split('T')[0];
                query = query.eq('date', today);
            }

            const { data, error } = await query;

            if (error) throw error;

            console.log('Fetched reservations:', data);
            setReservations(data || []);

        } catch (error) {
            console.error('Error fetching reservations:', error);
            // Fallback for demo/error
            const today = new Date().toISOString().split('T')[0];
            setReservations([
                { id: 1, name: 'Demo User (Error)', phone: '08123456789', date: today, time: '19:00', guests: 2, status: 'confirmed', notes: 'Fallback data due to fetch error' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return { reservations, loading, filter, setFilter, refetch: fetchReservations };
};
