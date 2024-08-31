import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

class CategoriaForumService {
    async listarCategoriasForum() {
        try {
            const response = await axios.get(`${API_URL}/getAllCategoriaForum`, {
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

    async criarCategoriaForum(dados) {
        try {
            const response = await axios.post(`${API_URL}/registerCategoryForum`, dados, {
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

    async editarCategoriaForum(idTaxonomia, dados) {
        try {
            const response = await axios.put(`${API_URL}/updateTaxonomia/${idTaxonomia}`, dados, {
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

    async deletarCategoriaForum(idTaxonomia) {
        try {
            const response = await axios.put(`${API_URL}/deleteTaxonomia/${idTaxonomia}`, {
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

const categoriaForumService = new CategoriaForumService();
export default categoriaForumService;