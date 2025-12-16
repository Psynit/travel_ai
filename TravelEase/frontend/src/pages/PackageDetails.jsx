import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

import BackButton from '../components/BackButton';

const PackageDetails = () => {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`packages/${id}/`)
            .then(res => setPkg(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
    if (!pkg) return <div className="text-center mt-5">Package not found.</div>;

   const BACKEND_URL = "https://travel-ai-1-5mzd.onrender.com";

    const getImageUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${BACKEND_URL}${url}`;
    };


    return (
        <div className="min-vh-100" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            paddingTop: '80px'
        }}>
            <div className="container py-5">
                <BackButton />
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <img src={getImageUrl(pkg.image)} className="img-fluid rounded shadow" alt={pkg.title} />
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="glass-card p-4 h-100" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                            <h2 className="fw-bold mb-3">{pkg.title}</h2>
                            <p className="text-muted h5 mb-4">{pkg.duration} | <span className="text-primary">${pkg.price}</span></p>
                            <p className="lead">{pkg.description}</p>

                            <h4 className="mt-4">Itinerary</h4>
                            <div className="bg-light p-3 rounded border">
                                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                                    {pkg.itinerary || 'Itinerary details coming soon.'}
                                </pre>
                            </div>

                            <div className="mt-4">
                                <Link to={`/book?packageId=${pkg.id}`} className="btn btn-primary btn-lg px-5">Book Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
