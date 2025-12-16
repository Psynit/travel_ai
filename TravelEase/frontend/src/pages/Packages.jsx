import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useFavorites } from '../context/FavoritesContext';
import BackButton from '../components/BackButton';

const BACKEND_URL = "https://travel-ai-1-5mzd.onrender.com";

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

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

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
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            paddingTop: '40px'
        }}>
            <div className="container py-4">
                <BackButton />

                <h2 className="text-center mb-4 fw-bold text-white">
                    Available Packages
                </h2>

                {/* Search */}
                <div className="row justify-content-center mb-4">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Search destinations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row">
                    {filteredPackages.map(pkg => (
                        <div className="col-md-4 mb-4" key={pkg.id}>
                            <div className="card h-100 shadow">
                                <img
                                    src={getImageUrl(pkg.image)}
                                    className="card-img-top"
                                    alt={pkg.title}
                                    style={{ height: '220px', objectFit: 'cover' }}
                                />

                                <div className="card-body">
                                    <h5 className="card-title">{pkg.title}</h5>
                                    <p className="card-text">
                                        {pkg.description.substring(0, 90)}...
                                    </p>
                                    <p className="fw-bold text-primary">
                                        ${pkg.price}
                                    </p>

                                    <Link
                                        to={`/packages/${pkg.id}`}
                                        className="btn btn-primary"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredPackages.length === 0 && (
                        <div className="col-12 text-center text-white">
                            No packages found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Packages;

