import { useNavigate } from 'react-router-dom';

const BackButton = ({ to, label = 'Back' }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        } else {
            navigate(-1);
        }
    };

    return (
        <button
            className="btn btn-primary mb-4 fw-bold shadow-sm"
            onClick={handleClick}
            style={{ borderRadius: '30px', padding: '10px 25px' }}
        >
            <i className="bi bi-arrow-left me-2"></i> {label}
        </button>
    );
};

export default BackButton;
