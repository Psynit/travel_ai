import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="d-flex flex-column min-vh-100">

            {/* Hero Section */}
            <header className="hero-section text-white text-center d-flex align-items-center justify-content-center" style={{
                height: '80vh',
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') center/cover no-repeat`
            }}>
                <div className="container">
                    <h1 className="display-3 fw-bold mb-4">Discover the World</h1>
                    <p className="lead mb-5 fw-light fs-4">
                        Curated packages for your next unforgettable adventure.
                    </p>
                    <Link to="/packages" className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg">
                        Start Your Journey
                    </Link>
                </div>
            </header>

            <div style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    {/* Features Section */}
                    <div className="container py-5">
                        <div className="text-center mb-5">
                            <h6 className="text-primary fw-bold text-uppercase ls-2">Why Choose Us</h6>
                            <h2 className="fw-bold display-5">Travel Made Simple</h2>
                        </div>
                        <div className="row text-center g-4">
                            <div className="col-md-4">
                                <div className="glass-card h-100 p-4 transition-hover">
                                    <div className="mb-3 text-primary">
                                        <i className="bi bi-globe2 display-4"></i>
                                    </div>
                                    <h3 className="h4 fw-bold">Top Destinations</h3>
                                    <p className="text-muted">Access a curated list of the world's most breathtaking places.</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="glass-card h-100 p-4 transition-hover">
                                    <div className="mb-3 text-primary">
                                        <i className="bi bi-wallet2 display-4"></i>
                                    </div>
                                    <h3 className="h4 fw-bold">Best Price Guarantee</h3>
                                    <p className="text-muted">We ensure you get the most affordable rates for premium experiences.</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="glass-card h-100 p-4 transition-hover">
                                    <div className="mb-3 text-primary">
                                        <i className="bi bi-shield-lock display-4"></i>
                                    </div>
                                    <h3 className="h4 fw-bold">Secure Booking</h3>
                                    <p className="text-muted">Your data and payments are protected with top-tier security standards.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials Section */}
                    <div className="py-5">
                        <div className="container">
                            <h2 className="text-center fw-bold display-5 mb-5">What Travelers Say</h2>
                            <div className="row g-4">
                                <div className="col-md-4">
                                    <div className="glass-card p-4 h-100">
                                        <div className="d-flex mb-3 text-warning">
                                            <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                                        </div>
                                        <p className="mb-4 fst-italic">"The trip to Bali was absolutely magical. Everything was organized perfectly!"</p>
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>JD</div>
                                            <div>
                                                <h6 className="fw-bold mb-0">John Doe</h6>
                                                <small className="text-muted">Traveler</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="glass-card p-4 h-100">
                                        <div className="d-flex mb-3 text-warning">
                                            <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                                        </div>
                                        <p className="mb-4 fst-italic">"Santorini sunset view was worth every penny. Highly recommended service."</p>
                                        <div className="d-flex align-items-center">
                                            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>SM</div>
                                            <div>
                                                <h6 className="fw-bold mb-0">Sarah Miller</h6>
                                                <small className="text-muted">Adventure Enthusiast</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="glass-card p-4 h-100">
                                        <div className="d-flex mb-3 text-warning">
                                            <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i>
                                        </div>
                                        <p className="mb-4 fst-italic">"Seamless booking process and great customer support throughout our Swiss Alps trip."</p>
                                        <div className="d-flex align-items-center">
                                            <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>MK</div>
                                            <div>
                                                <h6 className="fw-bold mb-0">Mike K.</h6>
                                                <small className="text-muted">Family Vacation</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="container py-5 mb-5">
                        <div className="glass-card p-5 text-center position-relative overflow-hidden">
                            <div className="position-relative z-index-1">
                                <i className="bi bi-envelope-paper display-3 text-primary mb-3"></i>
                                <h2 className="fw-bold mb-3">Subscribe to Our Newsletter</h2>
                                <p className="lead text-muted mb-4">Get exclusive travel offers and tips delivered straight to your inbox.</p>
                                <div className="row justify-content-center">
                                    <div className="col-md-6">
                                        <form className="d-flex gap-2">
                                            <input type="email" className="form-control form-control-lg" placeholder="Enter your email" required />
                                            <button type="submit" className="btn btn-primary btn-lg px-4">Subscribe</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center pb-5">
                        <Link to="/packages" className="btn btn-outline-primary btn-lg rounded-pill px-5 py-3 fw-bold">View All Packages</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
