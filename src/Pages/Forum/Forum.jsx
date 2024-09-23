import React, { useState, useEffect } from 'react';
import {
     Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import Header from '../Header/Header';
import Styles from './Forum.module.css'
import forumService from '../../Services/Forum/Forum-service';
import { useNavigate } from 'react-router-dom';
import categoriaForumService from '../../Services/CategoriaForum/CategoriaForum-service';
import Footer from '../Footer/Footer';

const Forum = () => {
    const navigate = useNavigate();
    const [meusPosts, setMeusPosts] = useState([]);
    const [categorias, setCategorias]= useState([]);
    
    useEffect(() => {        
        listarPosts();
        listarCategorias();        
    }, []);    

    const listarCategorias = async () => {
        try {
            const response = await categoriaForumService.listarCategoriasForum();

            if (response.error === false) {
                setCategorias(response.data);
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert(error.message || 'Erro ao listar taxonomias');
        }
    }

    const listarPosts = async () => {                
        try {
            const response = await forumService.allPosts()
            if(response.error === false)                
                setMeusPosts(response.data)                          
            else {
                alert(response.message);
            }
        } catch (error) {
            alert(error.message || 'Não foi encontrado nenhum post');
        }
        
    }
    const handleBack = () => {
        navigate('/telaPrincipal');
    };

    const getCategoriaNome = (id) => {
        const categoria = categorias.find((cat) => cat.id === id);
        return categoria ? categoria.nome : 'Categoria não encontrada';
    };

  return (
    <>
    <Header />
    <div className={Styles.ConteudoContainer}>
                <h1>Fórum</h1>
                <Paper className={Styles.paper}>                    
                    <div style={{ marginBottom: '16px', overflowX: 'auto' }}>
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Pergunta</TableCell>
                                        <TableCell>Categoria</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {meusPosts.map((post, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{post.pergunta}</TableCell>
                                            <TableCell>{post.nomecategoria}</TableCell>                                            
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Paper>

                <div className={Styles.buttonContainerVoltar}>
                    <button type="button" className={Styles.CriarTaxonomiaButton} variant="contained" color="default" onClick={handleBack}>Voltar</button>
                </div>
            </div>
    <Footer />
    </>
  )
}

export default Forum