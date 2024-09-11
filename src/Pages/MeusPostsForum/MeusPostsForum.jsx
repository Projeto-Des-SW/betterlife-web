import React, { useState, useEffect } from 'react';
import dadosUserLogadoService from '../../Services/DadosUserLogado/DadosUserLogado-service';
import Header from '../Header/Header';
import Styles from './MeusPostsForum.module.css'
import forumService from '../../Services/Forum/Forum-service';
import {
    TextField, Grid, Paper, Dialog, DialogActions,
    DialogContent, DialogTitle, DialogContentText,
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';

const MeusPostsForum = () => {
    const navigate = useNavigate();
    const [meusPosts, setMeusPosts] = useState([]);
    const [userId, setUserId] = useState('');
    const [abrirModalEdicao, setAbrirModalEdicao] = useState(false);
    const [abrirModalDeletar, setAbrirModalDeletar] = useState(false);
    const [postId, setPostId] = useState('');
    const [formDataEdicao, setFormDataEdicao] = useState({
        pergunta: '',
        categoria: '',
    });

    useEffect(() => {
        const id = dadosUserLogadoService.getUserInfo().id;
        setUserId(id);
    }, []);

    useEffect(() => {
        if (userId) {
            listarPosts();
        }
    }, [userId]);

    const listarPosts = async () => {
        if (!userId) {
            return
        }
        try {
            const response = await forumService.allPostsById(userId)
            if (response.error === false)
                setMeusPosts(response.data)
            else {
                alert(response.message);
            }
        } catch (error) {
            alert(error.message || 'Não foi encontrado nenhum post');
        }

    }

    const alterarDadosEdicao = (e) => {
        const { id, value } = e.target;
        setFormDataEdicao({
            ...formDataEdicao,
            [id]: value
        });
    };

    const editarDados = async () => {
        if (!formDataEdicao.pergunta || !formDataEdicao.categoria) {
            alert('Todos os campos obrigatórios devem ser preenchidos.');
            return;
        }

        try {
            const response = await forumService.editarPost(postId, JSON.stringify(formDataEdicao));

            if (response.error === false) {
                alert('Post editado com sucesso!');
                fecharModalEdicao();
                listarPosts();
            }

        } catch (error) {
            alert(error.message || 'Erro ao editar post');
        }
    };

    const deletarPost = async () => {
        try {
            const response = await forumService.deletarPost(postId);

            if (response.error === false) {
                alert('Post deletado com sucesso!');
                setAbrirModalDeletar(false);
                listarPosts();
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert(error.message || 'Erro ao deletar post');
        }
    }

    const handleBack = () => {
        navigate('/telaPrincipal');
    };

    const Post = (id) => {
        console.log(id)
        navigate(`/post/${id}`);
    };

    const abrirDialogEdicao = (post) => {
        setPostId(post.id)
        setFormDataEdicao({
            pergunta: '',
            categoria: '',
        });
        setAbrirModalEdicao(true);
    };

    const fecharModalEdicao = () => {
        setAbrirModalEdicao(false);
        setFormDataEdicao({
            pergunta: '',
            categoria: '',
        });
    };

    const abrirDialogDeletar = (post) => {
        setPostId(post.id)
        setAbrirModalDeletar(true);
    };

    return (
        <>
            <Header />

            <Dialog
                aria-labelledby="customized-dialog-title"
                open={abrirModalEdicao}
                onClose={fecharModalEdicao}
                style={{ marginTop: 35, marginBottom: 10 }}
                disableBackdropClick
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    <Grid container alignItems="center">
                        <Grid item xs={10} sm={11}>
                            Editar Pergunta
                        </Grid>
                        <Grid item xs={2} sm={1}>
                            <IconButton onClick={fecharModalEdicao}>
                                x
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe a pergunta:
                            </DialogContentText>
                            <TextField
                                id="pergunta"
                                name="pergunta"
                                label={<span>Pergunta <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Pergunta'
                                value={formDataEdicao.pergunta}
                                onChange={alterarDadosEdicao}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe a categoria:
                            </DialogContentText>
                            <TextField
                                id="categoria"
                                name="categoria"
                                label={<span>Categoria <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Categoria'
                                value={formDataEdicao.categoria}
                                onChange={alterarDadosEdicao}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'space-around' }}>
                    <button type="button" className={Styles.CriarTaxonomiaButton} variant="contained" color="secondary" onClick={fecharModalEdicao}>Cancelar</button>
                    <button type="button" className={Styles.CriarTaxonomiaButton} variant="contained" color="primary" onClick={editarDados}>Salvar</button>
                </DialogActions>
            </Dialog>

            <Dialog
                aria-labelledby="customized-dialog-title"
                open={abrirModalDeletar}
                onClose={() => setAbrirModalDeletar(false)}
                style={{ marginTop: 35, marginBottom: 10 }}
                disableBackdropClick
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    <Grid container alignItems="center">
                        <Grid item xs={10} sm={11}>
                            Deletar Post
                        </Grid>
                        <Grid item xs={2} sm={1}>
                            <IconButton onClick={() => setAbrirModalDeletar(false)}>
                                x
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Tem certeza que deseja deletar esse post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'space-around' }}>
                    <button type="button" className={Styles.CriarTaxonomiaButton} variant="contained" color="secondary" onClick={() => setAbrirModalDeletar(false)}>Cancelar</button>
                    <button type="button" className={Styles.CriarTaxonomiaButton} variant="contained" color="primary" onClick={deletarPost}>Deletar</button>
                </DialogActions>
            </Dialog>

            <div className={Styles.ConteudoContainer}>
                <h1>Meus Posts</h1>
                <Paper className={Styles.paper}>
                    <div style={{ marginBottom: '16px', overflowX: 'auto' }}>
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Pergunta</TableCell>
                                        <TableCell>Categoria</TableCell>
                                        <TableCell>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {meusPosts.map((post, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{post.pergunta}</TableCell>
                                            <TableCell>{post.categoriaforumid}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => Post(post.id)} color="primary">
                                                    <Visibility />
                                                </IconButton>
                                                <IconButton onClick={() => abrirDialogEdicao(post)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => abrirDialogDeletar(post)} color="secondary">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
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

        </>
    )
}

export default MeusPostsForum