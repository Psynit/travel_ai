import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import BackButton from '../components/BackButton';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        api.get('packages/')
            .then(res => {
                setPackages(res.data.packages);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const favoritePackages = packages.filter(pkg => favorites.includes(pkg.id));

    const getImageUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `http://localhost:8000${url}?v=2`;
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="min-vh-100" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(https://images.unsplash.com/photo-1518684079-3c830dcef6c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            paddingTop: '40px'
        }}>
            <div className="container py-4">
                <BackButton />
                <h2 className="text-center mb-5 fw-bold text-dark shadow-text">My Favorite Trips</h2>

                {favoritePackages.length === 0 ? (
                    <div className="text-center py-5 glass-card">
                        <i className="bi bi-heart-break display-1 text-muted mb-3 d-block"></i>
                        <h3 className="text-muted">No favorites yet!</h3>
                        <p>Go back to packages and save the trips you love.</p>
                        <Link to="/packages" className="btn btn-primary mt-3 rounded-pill px-4">Browse Packages</Link>
                    </div>
                ) : (
                    <div className="row">
                        {favoritePackages.map(pkg => (
                            <div className="col-md-4 mb-4" key={pkg.id}>
                                <div className="glass-card h-100 shadow-lg transition-hover border-0 overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '15px' }}>
                                    <div className="position-relative">
                                        <img
                                            src={getImageUrl(pkg.image)}
                                            className="card-img-top"
                                            alt={pkg.title}
                                            style={{ height: '220px', objectFit: 'cover' }}
                                        />
                                        <button
                                            className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3 shadow-sm text-danger"
                                            onClick={() => toggleFavorite(pkg.id)}
                                            style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <i className="bi bi-heart-fill fs-5"></i>
                                        </button>
                                        <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                                            <h5 className="card-title fw-bold text-white mb-0">
                                                <i className="bi bi-geo-alt-fill text-warning me-2"></i>{pkg.title}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="card-body d-flex flex-column p-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="d-flex align-items-center text-muted small">
                                                <i className="bi bi-clock me-1 text-primary"></i> {pkg.duration}
                                            </div>
                                            <div className="h5 fw-bold text-primary mb-0">${pkg.price}</div>
                                        </div>

                                        <p className="card-text text-muted mb-4" style={{ fontSize: '0.95rem' }}>
                                            {pkg.description.substring(0, 90)}...
                                        </p>

                                        <div className="mt-auto border-top pt-3 text-center">
                                            <Link to={`/packages/${pkg.id}`} className="btn btn-outline-primary rounded-pill px-4 fw-bold w-100">
                                                View Details
                                            </Link>
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

export default Favorites;
