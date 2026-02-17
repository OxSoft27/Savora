import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CheckCircle, Calendar, Clock, MapPin, Users } from 'lucide-react';

const BookingSuccess = () => {
    const location = useLocation();
    const reservation = location.state?.reservation || {};

    return (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <CheckCircle size={32} />
                </div>
                <h1 className="text-2xl font-bold text-[var(--color-text-main)]">Booking Confirmed!</h1>
                <p className="text-[var(--color-text-muted)] mt-2">
                    Thank you, {reservation.name}. We've received your reservation.
                </p>
            </div>

            <Card>
                <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                    Reservation Details
                </h3>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Calendar className="text-[var(--color-primary)] w-5 h-5" />
                        <div>
                            <p className="text-sm text-[var(--color-text-muted)]">Date</p>
                            <p className="font-medium">{reservation.date}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Clock className="text-[var(--color-primary)] w-5 h-5" />
                        <div>
                            <p className="text-sm text-[var(--color-text-muted)]">Time</p>
                            <p className="font-medium">{reservation.time}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Users className="text-[var(--color-primary)] w-5 h-5" />
                        <div>
                            <p className="text-sm text-[var(--color-text-muted)]">Guests</p>
                            <p className="font-medium">{reservation.guests} People</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <MapPin className="text-[var(--color-primary)] w-5 h-5" />
                        <div>
                            <p className="text-sm text-[var(--color-text-muted)]">Zone Preference</p>
                            <p className="font-medium">{reservation.zone}</p>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="flex flex-col gap-3">
                <Link to="/" className="w-full">
                    <Button variant="secondary" className="w-full" style={{ width: '100%' }}>
                        Back to Home
                    </Button>
                </Link>
                <Link to="/book" className="w-full">
                    <Button className="w-full" style={{ width: '100%' }}>
                        Make Another Booking
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default BookingSuccess;
