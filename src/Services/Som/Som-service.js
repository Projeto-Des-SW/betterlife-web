import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

class SomService {
    async criarSomAnimal(dados) {
        try {
            const response = await axios.post(`${API_URL}/registerSom`, dados, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 200)
                return {
                    error: false,
                    data: response.data
                }

            return {
                error: true,
                data: response.data
            }
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    };

    async editarSomAnimal(idSom, dados) {
        try {
            const response = await axios.put(`${API_URL}/updateSom/${idSom}`, dados, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 200)
                return {
                    error: false,
                    data: response.data
                }

            return {
                error: true,
                data: response.data
            }
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    };

    async deletarSomAnimal(idSom) {
        try {
            const response = await axios.put(`${API_URL}/deleteSom/${idSom}`, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 200)
                return {
                    error: false,
                    data: response.data
                }

            return {
                error: true,
                data: response.data
            }
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    };
}

const somService = new SomService();
export default somService;