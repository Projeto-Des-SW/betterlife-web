import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export { registerUser };