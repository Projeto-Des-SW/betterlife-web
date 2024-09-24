import React, { useState, useEffect } from 'react';
import {
    Paper, Typography, Button, Divider
} from '@material-ui/core';
import Header from '../Header/Header';
import Styles from './Post.module.css';  // Atualizando para um novo arquivo CSS
import forumService from '../../Services/Forum/Forum-service';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Post = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        listarDadosPost();
    }, [id]);

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

                        <div className={Styles.buttonContainer}>
                            <Button variant="contained" color="primary" onClick={handleBackToForum}>
                                Voltar para o Fórum
                            </Button>
                        </div>
                    </>
                ) : (
                    <Typography variant="h6" className={Styles.loadingMessage}>
                        Carregando post...
                    </Typography>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Post;
