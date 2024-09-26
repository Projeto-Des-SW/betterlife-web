import React, { useState, useEffect } from 'react';
import {
    Paper, Typography, Button, Divider, TextField
} from '@material-ui/core';
import Header from '../Header/Header';
import Styles from './Post.module.css';
import forumService from '../../Services/Forum/Forum-service';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import dadosUserLogadoService from '../../Services/DadosUserLogado/DadosUserLogado-service';

const Post = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [respostas, setRespostas] = useState([]);
    const [resposta, setResposta] = useState('');

    useEffect(() => {
        listarDadosPost();
        listarRespostas();
    }, [id]);

    const listarRespostas = async () => {
        try {
            const response = await forumService.listarRespostas(id);
            if (!response.error) {
                setRespostas(response.data);
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert(error.message || 'Erro ao listar respostas');
        }
    };

    const listarDadosPost = async () => {
        try {
            const response = await forumService.listarDadosPostPorID(id);
            if (!response.error) {
                setPost(response.data);
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert(error.message || 'Não foi encontrado nenhum post');
        }
    };

    const handleAddResposta = async () => {
        try {
            const usuarioidresposta = dadosUserLogadoService.getUserInfo().id;
    
            if (!usuarioidresposta) {
                alert('Usuário não autenticado!');
                return;
            }
    
            const response = await forumService.addResposta(id, { usuarioidresposta, resposta });
            if (!response.error) {
                alert('Resposta adicionada com sucesso');
                setResposta(''); 
                listarRespostas(); 
            } else {
                alert(response.message || 'Erro ao adicionar resposta');
            }
        } catch (error) {
            alert(error.message || 'Erro ao adicionar resposta');
        }
    };

    const handleBackToForum = () => {
        navigate('/forum');
    };

    return (
        <>
            <Header />
            <div className={Styles.conteudoContainer}>
                {post ? (
                    <>
                        <Paper className={Styles.postContainer}>
                            <Typography variant="h4" className={Styles.postTitle}>
                                {post.pergunta}
                            </Typography>
                            <Divider className={Styles.divider} />
                            <Typography variant="body1" className={Styles.postResposta}>
                                {post.resposta}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" className={Styles.postCategoria}>
                                Categoria: {post.nomecategoria}
                            </Typography>
                        </Paper>

                        <div className={Styles.respostaContainer}>
                            <TextField
                                label="Adicione sua resposta"
                                multiline
                                rows={4}
                                value={resposta}
                                onChange={(e) => setResposta(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddResposta}
                                style={{ marginTop: '16px' }}
                            >
                                Enviar Resposta
                            </Button>
                        </div>

                        <div className={Styles.respostasContainer}>
                            <Typography variant="h6">Respostas</Typography>
                            {respostas.length > 0 ? (
                                respostas.map((resposta) => (
                                    <Paper key={resposta.id} className={Styles.respostaItem}>
                                        <Typography variant="body1">{resposta.resposta}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Respondido por: {resposta.nomeusuario} em {new Date(resposta.dataresposta).toLocaleString()}
                                        </Typography>
                                    </Paper>
                                ))
                            ) : (
                                <Typography variant="body2" color="textSecondary">Nenhuma resposta ainda.</Typography>
                            )}
                        </div>

                        <div className={Styles.buttonContainer}>
                            <Button variant="contained" color="primary" onClick={handleBackToForum}>
                                Voltar ao Fórum
                            </Button>
                        </div>
                    </>
                ) : (
                    <Typography variant="h6" color="error">
                        Carregando post...
                    </Typography>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Post;
