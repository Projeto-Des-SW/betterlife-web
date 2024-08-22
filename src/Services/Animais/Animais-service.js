import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

class AnimaisService{
    async listarAnimais() {
        try {
            const response = await axios.get(`${API_URL}/getAllAnimals`, {
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

    async editarAnimal(idAnimal, dados) {
        try {
            const response = await axios.put(`${API_URL}/updateAnimal/${idAnimal}`, dados, {
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

    async deletarAnimal(idAnimal) {
        try {
            const response = await axios.put(`${API_URL}/deleteAnimal/${idAnimal}`, {
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
const animaisService = new AnimaisService();
export default animaisService;