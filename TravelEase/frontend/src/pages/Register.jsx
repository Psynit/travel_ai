import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import BackButton from '../components/BackButton';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        full_name: '',
        phone: ''
    });
    const { register } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await register(formData);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center position-relative" style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
        }}>
            <div className="position-absolute top-0 start-0 m-4">
                <BackButton to="/" label="Home" />
            </div>
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ maxWidth: '600px', width: '100%' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-primary">Create Account</h2>
                        <p className="text-muted">Join TravelEase today</p>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" name="full_name" className="form-control" id="nameInput" placeholder="Full Name" onChange={handleChange} required />
                            <label htmlFor="nameInput">Full Name</label>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <div className="form-floating">
                                    <input type="text" name="username" className="form-control" id="userInput" placeholder="Username" onChange={handleChange} required />
                                    <label htmlFor="userInput">Username</label>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="form-floating">
                                    <input type="text" name="phone" className="form-control" id="phoneInput" placeholder="Phone" onChange={handleChange} />
                                    <label htmlFor="phoneInput">Phone</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" name="email" className="form-control" id="emailInput" placeholder="name@example.com" onChange={handleChange} required />
                            <label htmlFor="emailInput">Email Address</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input type="password" name="password" className="form-control" id="passInput" placeholder="Password" onChange={handleChange} required />
                            <label htmlFor="passInput">Password</label>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg fw-bold">REGISTER</button>
                        </div>
                    </form>
                    <div className="text-center mt-4">
                        <p className="mb-0 text-muted">Already have an account? <Link to="/login" className="fw-bold text-primary text-decoration-none">Login here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
