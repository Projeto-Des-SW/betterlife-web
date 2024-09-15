import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

class ComunidadeService {
    async listarComunidade() {
        try {
            const response = await axios.get(`${API_URL}/getAllComunidade`, {
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

    async listarComunidadePorUser(idComunidade) {
        try {
            const response = await axios.get(`${API_URL}/getAllComunidadePorUser/${idComunidade}`, {
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

    async criarComunidade(dados) {
        try {
            const response = await axios.post(`${API_URL}/registerComunidade`, dados, {
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

    async editarComunidade(idComunidade, dados) {
        try {
            const response = await axios.put(`${API_URL}/updateComunidade/${idComunidade}`, dados, {
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

    async deletarComunidade(idComunidade) {
        try {
            const response = await axios.put(`${API_URL}/deletarComunidade/${idComunidade}`, {
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

const comunidadeService = new ComunidadeService();
export default comunidadeService;