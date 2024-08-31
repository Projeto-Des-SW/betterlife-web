import React, { useState, useEffect } from 'react';
import Styles from './CategoriaForum.module.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import {
    TextField, Grid, Paper, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import categoriaForumService from '../../Services/CategoriaForum/CategoriaForum-service';

function CategoriaForum() {
    const navigate = useNavigate();
    const [abrirModalCadastro, setAbrirModalCadastro] = useState(false);
    const [abrirModalEdicao, setAbrirModalEdicao] = useState(false);
    const [abrirModalDeletar, setAbrirModalDeletar] = useState(false);
    const [idCategoriaForum, setIdCategoriaForum] = useState('');
    const [categoriasForum, setCategoriasForum] = useState([]);
    const [formDataCadastro, setFormDataCadastro] = useState({
        nome: '',
        descricao: '',
    });
    const [formDataEdicao, setFormDataEdicao] = useState({
        nome: '',
        descricao: '',
    });

    const alterarDadosCadastro = (e) => {
        const { id, value } = e.target;
        setFormDataCadastro({
            ...formDataCadastro,
            [id]: value
        });
    };

    const alterarDadosEdicao = (e) => {
        const { id, value } = e.target;
        setFormDataEdicao({
            ...formDataEdicao,
            [id]: value
        });
    };

    const verificarCamposPreenchidos = (dados) => {
        const camposObrigatorios = [
            'nome', 'descricao'
        ];

        for (const campo of camposObrigatorios) {
            const valor = campo.split('.').reduce((obj, chave) => obj && obj[chave], dados);
            if (!valor) {
                return false;
            }
        }
        return true;
    };

    const listarCategorias = async () => {
        try {
            const response = await categoriaForumService.listarCategoriasForum();

            if (response.error === false) {
                setCategoriasForum(response.data);
            } else {
                alert(response.message);
            }

        } catch (error) {
            alert(error.message || 'Erro ao listar categorias de fórum');
        }
    };

    const cadastrarCategoriaForum = async () => {
        if (!verificarCamposPreenchidos(formDataCadastro)) {
            alert('Todos os campos obrigatórios devem ser preenchidos.');
            return;
        }

        try {
            const response = await categoriaForumService.criarCategoriaForum(JSON.stringify(formDataCadastro));

            if (response.error === false) {
                alert('Categoria de fórum criada com sucesso!');
                fecharModalCadastro();
                listarCategorias();
            }

        } catch (error) {
            alert(error.message || 'Erro ao criar categoria de fórum');
        }
    };

    const editarDados = async () => {
        if (!verificarCamposPreenchidos(formDataEdicao)) {
            alert('Todos os campos obrigatórios devem ser preenchidos.');
            return;
        }

        try {
            const response = await categoriaForumService.editarCategoriaForum(idCategoriaForum, JSON.stringify(formDataEdicao));

            if (response.error === false) {
                alert('Categoria de fórum editada com sucesso!');
                fecharModalEdicao();
                listarCategorias();
            }

        } catch (error) {
            alert(error.message || 'Erro ao editar categoria de fórum');
        }
    };

    const deletarCategoria = async () => {
        try {
            const response = await categoriaForumService.deletarCategoriaForum(idCategoriaForum);

            if (response.error === false) {
                alert('Categoria de fórum deletada com sucesso!');
                setAbrirModalDeletar(false);
                listarCategorias();
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert(error.message || 'Erro ao deletar categoria de fórum');
        }
    }

    const handleBack = () => {
        navigate('/telaPrincipal');
    };

    const abrirDialogEdicao = (categoriaForum) => {
        setIdCategoriaForum(categoriaForum.id);
        setFormDataEdicao({
            nome: categoriaForum.classe,
            descricao: categoriaForum.ordem,
        });
        setAbrirModalEdicao(true);
    };

    const abrirDialogDeletar = (categoriaForum) => {
        setIdCategoriaForum(categoriaForum.id);
        setAbrirModalDeletar(true);
    };

    const fecharModalCadastro = () => {
        setAbrirModalCadastro(false);
        setFormDataCadastro({
            nome: '',
            descricao: '',
        });
    };

    const fecharModalEdicao = () => {
        setAbrirModalEdicao(false);
        setFormDataEdicao({
            nome: '',
            descricao: '',
        });
    };

    useEffect(() => {
        listarCategorias();
    }, []);

    return (
        <>
            <Header />

            <Dialog
                aria-labelledby="customized-dialog-title"
                open={abrirModalCadastro}
                onClose={fecharModalCadastro}
                style={{ marginTop: 35, marginBottom: 10 }}
                disableBackdropClick
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    <Grid container alignItems="center">
                        <Grid item xs={10} sm={11}>
                            Criar Categoria de fórum
                        </Grid>
                        <Grid item xs={2} sm={1}>
                            <IconButton onClick={fecharModalCadastro}>
                                x
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o nome:
                            </DialogContentText>
                            <TextField
                                id="nome"
                                name="nome"
                                label={<span>Nome <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Nome'
                                value={formDataCadastro.nome}
                                onChange={alterarDadosCadastro}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe a descrição:
                            </DialogContentText>
                            <TextField
                                id="descricao"
                                name="descricao"
                                label={<span>Descrição <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Descrição'
                                value={formDataCadastro.descricao}
                                onChange={alterarDadosCadastro}
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
                    <button type="button" className={Styles.CriarCategoriaForumButton} variant="contained" color="secondary" onClick={fecharModalCadastro}>Cancelar</button>
                    <button type="button" className={Styles.CriarCategoriaForumButton} variant="contained" color="primary" onClick={cadastrarCategoriaForum}>Criar</button>
                </DialogActions>
            </Dialog>

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
                            Editar Categoria de fórum
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
                                Informe o nome:
                            </DialogContentText>
                            <TextField
                                id="classe"
                                name="classe"
                                label={<span>Nome <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Nome'
                                value={formDataEdicao.nome}
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
                                Informe a descrição:
                            </DialogContentText>
                            <TextField
                                id="descricao"
                                name="descricao"
                                label={<span>Descrição <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Descrição'
                                value={formDataEdicao.descricao}
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
                    <button type="button" className={Styles.CriarCategoriaForumButton} variant="contained" color="secondary" onClick={fecharModalEdicao}>Cancelar</button>
                    <button type="button" className={Styles.CriarCategoriaForumButton} variant="contained" color="primary" onClick={editarDados}>Salvar</button>
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
                            Deletar Categoria de fórum
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
                        Tem certeza que deseja deletar essa categoriaForum?
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'space-around' }}>
                    <button type="button" className={Styles.CriarCategoriaForumButton} variant="contained" color="secondary" onClick={() => setAbrirModalDeletar(false)}>Cancelar</button>
                    <button type="button" className={Styles.CriarCategoriaForumButton} variant="contained" color="primary" onClick={deletarCategoria}>Deletar</button>
                </DialogActions>
            </Dialog>

            <div className={Styles.ConteudoContainer}>
                <h1>Categorias de fórum</h1>
                <Paper className={Styles.paper}>
                    <div className={Styles.buttonContaineCriar}>
                        <button type="button" className={Styles.CriarCategoriaForumButton} onClick={() => setAbrirModalCadastro(true)}>Criar nova categoria</button>
                    </div>
                    <div style={{ marginBottom: '16px', overflowX: 'auto' }}>
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Descriçao</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {categoriasForum.map((categoriaForum, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{categoriaForum.nome}</TableCell>
                                            <TableCell>{categoriaForum.descricao}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => abrirDialogEdicao(categoriaForum)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => abrirDialogDeletar(categoriaForum)} color="secondary">
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
                    <button type="button" className={Styles.CriarCategoriaForumButton} variant="contained" color="default" onClick={handleBack}>Voltar</button>
                </div>
            </div>
        </>
    );
}

export default CategoriaForum;
