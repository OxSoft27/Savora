import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Coffee, Clock, MapPin, Calendar, Users, Phone, Map, CreditCard } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const Booking = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        guests: 1,
        date: '',
        time: '',
        zone: '', // Table/Zone preference
        dp: '',
        request: ''
    });

    const updateForm = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!supabase) throw new Error('Supabase client not initialized');

            // 1. Insert into Supabase
            const { data, error: insertError } = await supabase
                .from('reservations')
                .insert([
                    {
                        name: formData.name,
                        phone: formData.phone,
                        email: formData.email,
                        guests: parseInt(formData.guests),
                        date: formData.date,
                        time: formData.time,
                        status: 'pending', // Default status
                        notes: `Table: ${formData.zone}. DP: ${formData.dp}. Notes: ${formData.request}`
                    }
                ])
                .select();

            if (insertError) throw insertError;

            // 2. Navigate to Success
            navigate('/book/success', { state: { reservation: formData } });

        } catch (err) {
            console.error('Booking Error:', err);
            setError(err.message || 'Failed to submit reservation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section">
                <p className="hero-subtitle">Premium Café Experience</p>
                <h1 className="hero-title">
                    Where Every Sip <br /> Tells a Story
                </h1>
                <p className="hero-text">
                    Indulge in handcrafted brews and artisan cuisine in an atmosphere of refined elegance. Reserve your moment of bliss.
                </p>
                <a href="#reserve" className="btn-hero">
                    Reserve a Table
                </a>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <Coffee size={24} />
                        </div>
                        <h3 className="feature-title">Artisan Brews</h3>
                        <p className="feature-text">
                            Single-origin beans roasted to perfection, crafted by expert baristas.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <Clock size={24} />
                        </div>
                        <h3 className="feature-title">Open Daily</h3>
                        <p className="feature-text">
                            Mon–Sat: 8 AM – 10 PM <br /> Sun: 9 AM – 9 PM
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <MapPin size={24} />
                        </div>
                        <h3 className="feature-title">Prime Location</h3>
                        <p className="feature-text">
                            In the heart of the city, an oasis of calm and flavor.
                        </p>
                    </div>
                </div>
            </section>

            {/* Reservation Form Section */}
            <section id="reserve" className="booking-section">
                <div className="section-header">
                    <h2 className="section-title">Make a Reservation</h2>
                    <p className="section-subtitle">Select your preferred date, time, and table. We'll take care of the rest.</p>
                </div>

                <div className="booking-form-container">
                    <form onSubmit={handleSubmit} className="booking-form-grid">
                        {error && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                <span className="font-medium">Error!</span> {error}
                            </div>
                        )}

                        <div className="form-row-2">
                            {/* Name */}
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={(e) => updateForm('name', e.target.value)}
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+62 812 3456 7890"
                                    className="form-input"
                                    value={formData.phone}
                                    onChange={(e) => updateForm('phone', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="form-input"
                                value={formData.email}
                                onChange={(e) => updateForm('email', e.target.value)}
                            />
                        </div>

                        {/* Guests */}
                        <div className="form-group">
                            <label className="form-label">Number of Guests</label>
                            <input
                                type="number"
                                min="1"
                                placeholder="2"
                                className="form-input"
                                value={formData.guests}
                                onChange={(e) => updateForm('guests', e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-row-2">
                            {/* Date */}
                            <div className="form-group">
                                <label className="form-label">Date</label>
                                <div className="input-wrapper">
                                    <Calendar className="input-icon" />
                                    <input
                                        type="date"
                                        className="form-input has-icon"
                                        value={formData.date}
                                        onChange={(e) => updateForm('date', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Time */}
                            <div className="form-group">
                                <label className="form-label">Time</label>
                                <div className="input-wrapper">
                                    <Clock className="input-icon" />
                                    <select
                                        className="form-select has-icon"
                                        value={formData.time}
                                        onChange={(e) => updateForm('time', e.target.value)}
                                        required
                                    >
                                        <option value="">Select time</option>
                                        <option value="17:00">05:00 PM</option>
                                        <option value="18:00">06:00 PM</option>
                                        <option value="19:00">07:00 PM</option>
                                        <option value="20:00">08:00 PM</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Table Selection */}
                        <div className="form-group">
                            <label className="form-label">Table</label>
                            <div className="input-wrapper">
                                <Map className="input-icon" />
                                <select
                                    className="form-select has-icon"
                                    value={formData.zone}
                                    onChange={(e) => updateForm('zone', e.target.value)}
                                    required
                                >
                                    <option value="">Select date & time first</option>
                                    <option value="Main Hall">Main Hall</option>
                                    <option value="Window View">Window View</option>
                                    <option value="Terrace">Terrace (Outdoor)</option>
                                    <option value="Private Room">Private Room</option>
                                </select>
                            </div>
                        </div>

                        {/* DP Amount */}
                        <div className="form-group">
                            <label className="form-label">Down Payment (IDR)</label>
                            <div className="input-wrapper">
                                <CreditCard className="input-icon" />
                                <input
                                    type="number"
                                    placeholder="e.g. 50000"
                                    className="form-input has-icon"
                                    value={formData.dp}
                                    onChange={(e) => updateForm('dp', e.target.value)}
                                />
                            </div>
                            <p className="form-helper">* Optional for small groups</p>
                        </div>

                        {/* Special Request */}
                        <div className="form-group">
                            <label className="form-label">Social Notes (Optional)</label>
                            <textarea
                                className="form-textarea"
                                placeholder="Any dietary requirements, celebrations, etc."
                                value={formData.request}
                                onChange={(e) => updateForm('request', e.target.value)}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={loading}
                            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                        >
                            {loading ? 'Processing...' : 'Confirm Reservation'}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Booking;
