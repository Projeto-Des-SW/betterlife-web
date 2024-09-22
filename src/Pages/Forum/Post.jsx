import React, { useState, useEffect } from 'react';
import {
     Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import Header from '../Header/Header';
import Styles from './Forum.module.css';
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

    const handleBack = () => {
        navigate('/telaPrincipal');
    };

    return (
        <>
            <Header />
            <div className={Styles.ConteudoContainer}>
                <h1>Post</h1>
                <Paper className={Styles.paper}>
                    <div style={{ marginBottom: '16px', overflowX: 'auto' }}>
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Pergunta</TableCell>
                                        <TableCell>Resposta</TableCell>
                                        <TableCell>Categoria</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {post ? ( 
                                        <TableRow>
                                            <TableCell>{post.pergunta}</TableCell>
                                            <TableCell>{post.resposta}</TableCell>
                                            <TableCell>{post.categoriaforumid}</TableCell>                                            
                                        </TableRow>
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                                                Carregando post...
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

export default Post;
