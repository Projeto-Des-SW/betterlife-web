import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

class TaxonomiaService {
    async listarTaxonomias() {
        try {
            const response = await axios.get(`${API_URL}/sendEmailReset`, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response.status)
            if (response.status === 200 || response.status === 201)
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

    async criarTaxonomia(dados) {
        try {
            const response = await axios.post(`${API_URL}/taxonomia`, dados, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response.status)
            if (response.status === 200 || response.status === 201)
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

    async editarTaxonomia(dados) {
        try {
            const response = await axios.put(`${API_URL}/sendEmailReset`, dados, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response.status)
            if (response.status === 200 || response.status === 201)
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

    async deletarTaxonomia(idTaxonomia) {
        try {
            const response = await axios.put(`${API_URL}/sendEmailReset/${idTaxonomia}`, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response.status)
            if (response.status === 200 || response.status === 201)
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

const taxonomiaService = new TaxonomiaService();
export default taxonomiaService;