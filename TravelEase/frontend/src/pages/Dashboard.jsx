import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

import BackButton from '../components/BackButton';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        api.get('my-bookings/')
            .then(res => setBookings(res.data.bookings))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [user, navigate]);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;

    const getImageUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `http://localhost:8000${url}?v=2`;
    };

    return (
        <div className="min-vh-100" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        }}>
            <div className="container py-5">
                <BackButton />
                <h2 className="mb-4 fw-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>My Bookings</h2>
                {bookings.length === 0 ? (
                    <div className="glass-card p-5 text-center">
                        <i className="bi bi-airplane display-1 text-muted mb-3"></i>
                        <h3 className="text-muted">You have no bookings yet.</h3>
                        <p className="lead mb-4">Start your adventure today!</p>
                        <button onClick={() => navigate('/packages')} className="btn btn-primary btn-lg">Explore Packages</button>
                    </div>
                ) : (
                    <div className="row">
                        {bookings.map(book => (
                            <div className="col-md-6 col-lg-4 mb-4" key={book.id}>
                                <div className="glass-card h-100 overflow-hidden position-relative" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                                    {book.image ? (
                                        <div style={{ height: '150px', background: `url(${getImageUrl(book.image)}) center/cover no-repeat` }}></div>
                                    ) : (
                                        <div className="bg-secondary" style={{ height: '150px' }}></div>
                                    )}

                                    <div className="p-4">
                                        <h5 className="fw-bold mb-1">{book.package_title}</h5>
                                        <p className="text-muted small mb-3">
                                            <i className="bi bi-calendar-event me-2"></i>
                                            {new Date(book.travel_date).toLocaleDateString()}
                                        </p>

                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <div>
                                                <small className="text-muted d-block">Travelers</small>
                                                <span className="fw-bold">{book.people}</span>
                                            </div>
                                            <div className="text-end">
                                                <small className="text-muted d-block">Total Cost</small>
                                                <span className="fw-bold text-primary fs-5">${book.total_amount}</span>
                                            </div>
                                        </div>

                                        <div className="mt-3 pt-3 border-top">
                                            <span className="badge bg-success w-100 py-2">
                                                <i className="bi bi-check-circle me-1"></i> Confirmed
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
