import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

class ForumService {
    async registerPost(userData) {
        try {
            const response = await axios.post(`${API_URL}/registerForum`, userData, {
                headers: { 'Content-Type': 'application/json' }
            });

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
    }

    async allPostsById(id) {
        try {
            const response = await axios.get(`${API_URL}/getAllForumByUser/${id}`, {
                headers: { 'Content-Type': 'application/json' }
            });
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
    }

    async editarPost(id, dados) {
        try {
            const response = await axios.put(`${API_URL}/updateForum/${id}`, dados, {
                headers: { 'Content-Type': 'application/json' }
            });
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
    }

    async deletarPost(id) {
        try {
            const response = await axios.put(`${API_URL}/deleteForum/${id}`, {
                headers: { 'Content-Type': 'application/json' }
            });
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
    }

    async allPosts() {
        try {
            const response = await axios.get(`${API_URL}/getAllForum/`, {
                headers: { 'Content-Type': 'application/json' }
            });
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
    }

    async listarRespostasPostsUsuario(id) {
        try {
            const response = await axios.get(`${API_URL}/getAllRespondForum/${id}`, {
                headers: { 'Content-Type': 'application/json' }
            });
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
    }

    async listarDadosPostPorID(id) {
        try {
            const response = await axios.get(`${API_URL}/getAllForumByPostId/${id}`, {
                headers: { 'Content-Type': 'application/json' }
            });
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
    }

    // Novo método para adicionar uma resposta
    async addResposta(postId, respostaData) {
        try {
            const response = await axios.put(`${API_URL}/updateForum/${postId}`, respostaData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Adiciona o token se necessário
                },
            });
    
            if (response.status === 200 || response.status === 201)
                return {
                    error: false,
                    data: response.data
                };
    
            return {
                error: true,
                data: response.data
            };
        } catch (error) {
            return {
                error: true,
                message: error.response ? error.response.data.message : 'Erro ao adicionar resposta'
            };
        }
    }
    
}

const forumService = new ForumService();
export default forumService;
