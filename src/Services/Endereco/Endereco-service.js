import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

class EnderecoService {
    async criarEndereco(dados) {
        try {
            const response = await axios.post(`${API_URL}/registerAddress`, dados, {
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

    async editarEndereco(idEndereco, dados) {
        try {
            const response = await axios.put(`${API_URL}/updateAddress/${idEndereco}`, dados, {
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

    async deletarEndereco(idEndereco) {
        try {
            const response = await axios.put(`${API_URL}/deleteAddress/${idEndereco}`, {
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

const enderecoService = new EnderecoService();
export default enderecoService;