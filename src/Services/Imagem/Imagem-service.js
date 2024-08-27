import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

class ImagemService {
    async criarImagemAnimal(dados) {
        try {
            const response = await axios.post(`${API_URL}/registerImagem`, dados, {
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

    async editarImagemAnimal(idImagem, dados) {
        try {
            const response = await axios.put(`${API_URL}/updateImagem/${idImagem}`, dados, {
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

    async deletarImagemAnimal(idImagem) {
        try {
            const response = await axios.put(`${API_URL}/deleteImagem/${idImagem}`, {
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

const imagemService = new ImagemService();
export default imagemService;