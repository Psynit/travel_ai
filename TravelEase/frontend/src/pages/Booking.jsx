import { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

import BackButton from '../components/BackButton';

const Booking = () => {
    const [searchParams] = useSearchParams();
    const packageId = searchParams.get('packageId');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [pkg, setPkg] = useState(null);
    const [people, setPeople] = useState(1);
    const [travelDate, setTravelDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login'); // Redirect if not logged in
            return;
        }

        if (packageId) {
            api.get(`packages/${packageId}/`)
                .then(res => setPkg(res.data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [packageId, user, navigate]);

    const handleShowModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const confirmBooking = async () => {
        try {
            await api.post('book/', {
                package_id: packageId,
                people: people,
                travel_date: travelDate
            });
            setShowModal(false);
            alert('Booking Successful!');
            navigate('/dashboard');
        } catch (err) {
            alert('Booking failed. Please try again.');
            setShowModal(false);
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
    if (!pkg) return <div className="text-center mt-5">Package not selected.</div>;

    return (
        <div className="min-vh-100" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            paddingTop: '80px'
        }}>
            <div className="container py-5">
                <BackButton label="Go Back" />

                <h2 className="text-center mb-4 fw-bold text-dark shadow-text-light">Book Your Trip: <span className="text-primary">{pkg.title}</span></h2>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="glass-card shadow-lg border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                            <div className="card-body p-5">
                                <form onSubmit={handleShowModal}>
                                    <h4 className="mb-3">Traveler Details</h4>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Full Name</label>
                                            <input type="text" className="form-control" value={user.full_name || ''} readOnly />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-control" value={user.email || ''} readOnly />
                                        </div>
                                    </div>

                                    <h4 className="mb-3 mt-4">Trip Details</h4>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Travel Date</label>
                                            <input type="date" className="form-control" value={travelDate} onChange={e => setTravelDate(e.target.value)} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Number of People</label>
                                            <input type="number" min="1" className="form-control" value={people} onChange={e => setPeople(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div className="alert alert-info mt-3">
                                        <strong>Total Price estimate:</strong> ${pkg.price * people}
                                    </div>

                                    <h4 className="mb-3 mt-4">Payment</h4>
                                    <div className="mb-3">
                                        <label className="form-label">Card Number</label>
                                        <input type="text" className="form-control" placeholder="**** **** **** ****" disabled />
                                        <small className="text-muted">Payment integration is in demo mode. No active payment required.</small>
                                    </div>

                                    <button type="submit" className="btn btn-success btn-lg w-100 mt-3">Book Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <>
                    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title fw-bold">Confirm Booking</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to book this trip?</p>
                                    <ul className="list-group mb-3">
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Package:</span> <strong>{pkg.title}</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Date:</span> <strong>{travelDate}</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Travelers:</span> <strong>{people}</strong>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between active">
                                            <span>Total Price:</span> <strong>${pkg.price * people}</strong>
                                        </li>
                                    </ul>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-success" onClick={confirmBooking}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Booking;
