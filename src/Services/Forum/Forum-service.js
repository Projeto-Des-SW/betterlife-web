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
    addResposta = async (postId, respostaData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token JWT não encontrado no localStorage');
                throw new Error('Usuário não autenticado');
            }

            console.log("Token JWT enviado na requisição:", token); // Log do token

            const response = await axios.post(
                `${API_URL}/posts/${postId}/respostas`,
                respostaData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Enviando o token corretamente
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                return {
                    error: false,
                    data: response.data
                };
            }

            return {
                error: true,
                data: response.data
            };
        } catch (error) {
            console.error('Erro ao adicionar resposta:', error.message); // Log de erro
            return {
                error: true,
                message: error.response ? error.response.data.message : 'Erro ao adicionar resposta'
            };
        }
    };



    async listarRespostas(postId) {
        try {
            const response = await axios.get(`${API_URL}/posts/${postId}/respostas`, {
                headers: { 'Content-Type': 'application/json' }
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
                message: error.response ? error.response.data.message : 'Erro ao listar respostas'
            };
        }
    }

}

const forumService = new ForumService();
export default forumService;
