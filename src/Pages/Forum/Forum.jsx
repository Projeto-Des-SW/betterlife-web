import React, { useState, useEffect } from 'react';
import {
     Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from '@material-ui/core';
import Header from '../Header/Header';
import Styles from './Forum.module.css';
import forumService from '../../Services/Forum/Forum-service';
import { useNavigate } from 'react-router-dom';
import categoriaForumService from '../../Services/CategoriaForum/CategoriaForum-service';
import Footer from '../Footer/Footer';

const Forum = () => {
    const navigate = useNavigate();
    const [meusPosts, setMeusPosts] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        listarPosts();
        listarCategorias();
    }, []);

    const listarCategorias = async () => {
        try {
            const response = await categoriaForumService.listarCategoriasForum();
            if (!response.error) {
                setCategorias(response.data);
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert(error.message || 'Erro ao listar categorias');
        }
    };

    const listarPosts = async () => {
        try {
            const response = await forumService.allPosts();
            if (!response.error) {
                setMeusPosts(response.data);
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert(error.message || 'Não foi encontrado nenhum post');
        }
    };

    const handleVerPost = (postId) => {
        navigate(`/post/${postId}`);
    };

    const handleBack = () => {
        navigate('/telaPrincipal');
    };

    return (
        <>
            <Header />
            <div className={Styles.ConteudoContainer}>
                <h1>Fórum de Discussão</h1>
                <Paper className={Styles.paper}>
                    <div style={{ marginBottom: '16px', overflowX: 'auto' }}>
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Pergunta</TableCell>
                                        <TableCell>Categoria</TableCell>
                                        <TableCell>Ação</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {meusPosts.length > 0 ? (
                                        meusPosts.map((post, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{post.pergunta}</TableCell>
                                                <TableCell>{post.nomecategoria}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleVerPost(post.id)}
                                                    >
                                                        Ver Post
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                                                Nenhum post encontrado
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Paper>

                <div className={Styles.buttonContainerVoltar}>
                    <button type="button" className={Styles.CriarTaxonomiaButton} onClick={handleBack}>
                        Voltar
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Forum;
