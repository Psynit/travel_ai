import axios from 'axios';

const api = axios.create({
    baseURL:"https://travel-ai-1-5mzd.onrender.com",
    withCredentials: true, // Important for session cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
