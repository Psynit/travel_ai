import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useFavorites } from '../context/FavoritesContext';

import BackButton from '../components/BackButton';

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        api.get('packages/')
            .then(res => {
                console.log('Packages loaded:', res.data.packages);
                setPackages(res.data.packages);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    const getImageUrl = (url) => {
    const BACKEND_URL = "https://travel-ai-1-5mzd.onrender.com";

    const getImageUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${BACKEND_URL}${url}`;
    };

    const filteredPackages = packages.filter(pkg =>
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-vh-100" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            paddingTop: '40px'
        }}>
            <div className="container py-4">
                <BackButton />
                <h2 className="text-center mb-4 fw-bold text-white shadow-text" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Available Packages</h2>

                {/* Search Bar */}
                <div className="row justify-content-center mb-5">
                    <div className="col-md-8 col-lg-6">
                        <div className="input-group input-group-lg shadow-lg">
                            <span className="input-group-text bg-white border-0 text-primary ps-4">
                                <i className="bi bi-search"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control border-0 py-3"
                                placeholder="Search destinations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ borderRadius: '0 30px 30px 0' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    {filteredPackages.length > 0 ? (
                        filteredPackages.map(pkg => (
                            <div className="col-md-4 mb-4" key={pkg.id}>
                                <div className="glass-card h-100 shadow-lg transition-hover border-0 overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px' }}>
                                    <div className="position-relative">
                                        <img
                                            src={getImageUrl(pkg.image)}
                                            className="card-img-top"
                                            alt={pkg.title}
                                            style={{ height: '220px', objectFit: 'cover' }}
                                        />
                                        <button
                                            className={`btn rounded-circle position-absolute top-0 end-0 m-3 shadow-sm ${favorites.includes(pkg.id) ? 'btn-danger' : 'btn-light text-danger'}`}
                                            onClick={() => toggleFavorite(pkg.id)}
                                            style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}
                                        >
                                            <i className={`bi ${favorites.includes(pkg.id) ? 'bi-heart-fill' : 'bi-heart'} fs-5`}></i>
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
                                            <div className="d-flex text-warning small">
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-half"></i>
                                            </div>
                                        </div>

                                        <p className="card-text text-muted mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                                            {pkg.description.substring(0, 90)}...
                                        </p>

                                        <div className="mt-auto pt-3 border-top">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <small className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.75rem' }}>Price per person</small>
                                                    <div className="h4 fw-bold text-primary mb-0">${pkg.price}</div>
                                                </div>
                                                <Link to={`/packages/${pkg.id}`} className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm">
                                                    View <i className="bi bi-arrow-right ms-1"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center text-white py-5">
                            <div className="glass-card p-5 d-inline-block">
                                <i className="bi bi-search display-1 text-muted mb-3 d-block"></i>
                                <h3 className="fw-bold text-dark">No packages found</h3>
                                <p className="text-muted">Try adjusting your search terms.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
}
export default Packages;
