import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useTables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            setLoading(true);

            if (!supabase) throw new Error('Demo Mode');

            const { data, error } = await supabase
                .from('tables')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;

            if (!data || data.length === 0) {
                throw new Error('Empty data');
            } else {
                setTables(data);
            }
        } catch (error) {
            // Fallback
            setTables([
                { id: 1, name: 'T-1', capacity: 4, zone: 'Main Hall', status: 'available' },
                { id: 2, name: 'T-2', capacity: 2, zone: 'Main Hall', status: 'occupied' },
                { id: 3, name: 'T-3', capacity: 4, zone: 'Window', status: 'available' },
                { id: 4, name: 'T-4', capacity: 6, zone: 'Window', status: 'reserved' },
                { id: 5, name: 'T-5', capacity: 2, zone: 'Terrace', status: 'available' },
                { id: 6, name: 'T-6', capacity: 4, zone: 'Terrace', status: 'available' },
                { id: 7, name: 'T-7', capacity: 8, zone: 'Private', status: 'available' },
                { id: 8, name: 'T-8', capacity: 2, zone: 'Window', status: 'occupied' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return { tables, loading, refetch: fetchTables };
};
