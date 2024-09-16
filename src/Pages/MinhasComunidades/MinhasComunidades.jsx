import React, { useState, useEffect } from 'react';
import Styles from './MinhasComunidades.module.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import {
    TextField, Grid, Paper, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import comunidadeService from '../../Services/Comunidade/Comunidade-service';
import dadosUserLogadoService from '../../Services/DadosUserLogado/DadosUserLogado-service';
import enderecoService from '../../Services/Endereco/Endereco-service';
import Footer from '../Footer/Footer';

function MinhasComunidades() {
    const navigate = useNavigate();
    const [abrirModalCadastro, setAbrirModalCadastro] = useState(false);
    const [abrirModalEdicao, setAbrirModalEdicao] = useState(false);
    const [abrirModalDeletar, setAbrirModalDeletar] = useState(false);
    const [idComunidade, setIdComunidade] = useState('');
    const [idEndereco, setIdEndereco] = useState('');
    const [comunidades, setComunidades] = useState([]);
    const [formDataCadastro, setFormDataCadastro] = useState({
        nome: '',
        descricao: '',
        endereco: {
            cep: '',
            logradouro: '',
            bairro: '',
            uf: '',
            pais: '',
            complemento: '',
            numero: '',
            cidade: ''
        },
        responsavel: '',
        telefone: '',
        usuarioid: dadosUserLogadoService.getUserInfo().id
    });
    const [formDataEdicao, setFormDataEdicao] = useState({
        nome: '',
        descricao: '',
        endereco: {
            cep: '',
            logradouro: '',
            bairro: '',
            uf: '',
            pais: '',
            complemento: '',
            numero: '',
            cidade: ''
        },
        responsavel: '',
        telefone: '',
        usuarioid: dadosUserLogadoService.getUserInfo().id
    });

    const alterarDadosCadastro = (e) => {
        const { id, value } = e.target;
        const [parentKey, childKey] = id.split('.');

        if (childKey) {
            setFormDataCadastro(prev => ({
                ...prev,
                [parentKey]: {
                    ...prev[parentKey],
                    [childKey]: value
                }
            }));
        } else {
            setFormDataCadastro({
                ...formDataCadastro,
                [id]: value
            });
        }
    };

    const alterarDadosEdicao = (e) => {
        const { id, value } = e.target;
        const [parentKey, childKey] = id.split('.');

        if (childKey) {
            setFormDataEdicao(prev => ({
                ...prev,
                [parentKey]: {
                    ...prev[parentKey],
                    [childKey]: value
                }
            }));
        } else {
            setFormDataEdicao({
                ...formDataEdicao,
                [id]: value
            });
        }
    };

    const verificarCamposPreenchidos = (dados) => {
        const camposObrigatorios = [
            'nome',
            'descricao',
            'responsavel',
            'telefone',
            'endereco.cep',
            'endereco.logradouro',
            'endereco.bairro',
            'endereco.uf',
            'endereco.pais',
            'endereco.complemento',
            'endereco.numero',
            'endereco.cidade'
        ];

        for (const campo of camposObrigatorios) {
            const valor = campo.split('.').reduce((obj, chave) => obj && obj[chave], dados);
            if (!valor) {
                return false;
            }
        }
        return true;
    };

    const listarComunidades = async () => {
        try {
            const response = await comunidadeService.listarComunidadePorUser(dadosUserLogadoService.getUserInfo().id);

            if (response.error === false) {
                setComunidades(response.data);
            } else {
                alert(response.message);
            }

        } catch (error) {
            alert(error.message || 'Erro ao listar comunidades');
        }
    };

    const cadastrarComunidade = async () => {
        if (!verificarCamposPreenchidos(formDataCadastro)) {
            alert('Todos os campos obrigatórios devem ser preenchidos.');
            return;
        }

        try {
            const responseEndereco = await enderecoService.criarEndereco(JSON.stringify(formDataCadastro.endereco));

            if (responseEndereco.error === false) {
                const novaComunidade = {
                    ...formDataCadastro,
                    enderecoid: responseEndereco.data.id
                };

                const responseComunidade = await comunidadeService.criarComunidade(JSON.stringify(novaComunidade));

                if (responseComunidade.error === false) {
                    alert('Comunidade criada com sucesso!');
                    fecharModalCadastro();
                    listarComunidades();
                }
            } else {
                alert(responseEndereco.message);
            }
        } catch (error) {
            alert(error.message || 'Erro ao criar comunidade e endereço');
        }
    };

    const editarDados = async () => {
        if (!verificarCamposPreenchidos(formDataEdicao)) {
            alert('Todos os campos obrigatórios devem ser preenchidos.');
            return;
        }

        try {
            const responseEndereco = await enderecoService.editarEndereco(idEndereco, JSON.stringify(formDataEdicao.endereco));

            if (responseEndereco.error === false) {
                const comunidadeAtualizada = {
                    ...formDataEdicao,
                    enderecoid: responseEndereco.data.id
                };

                const responseComunidade = await comunidadeService.editarComunidade(idComunidade, JSON.stringify(comunidadeAtualizada));

                if (responseComunidade.error === false) {
                    alert('Comunidade editada com sucesso!');
                    fecharModalEdicao();
                    listarComunidades();
                }
            } else {
                alert(responseEndereco.message);
            }
        } catch (error) {
            alert(error.message || 'Erro ao editar comunidade e endereço');
        }
    };

    const deletarComunidade = async () => {
        try {
            const response = await comunidadeService.deletarComunidade(idComunidade);

            if (response.error === false) {
                alert('Comunidade deletada com sucesso!');
                setAbrirModalDeletar(false);
                listarComunidades();
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert(error.message || 'Erro ao deletar comunidade');
        }
    }

    const handleBack = () => {
        navigate('/telaPrincipal');
    };

    const abrirDialogEdicao = (comunidade) => {
        setIdComunidade(comunidade.id);
        setFormDataEdicao({
            nome: comunidade.nome,
            descricao: comunidade.descricao,
            endereco: {
                cep: comunidade.cep,
                logradouro: comunidade.logradouro,
                bairro: comunidade.bairro,
                uf: comunidade.uf,
                pais: comunidade.pais,
                complemento: comunidade.complemento,
                numero: comunidade.numero,
                cidade: comunidade.cidade
            },
            responsavel: comunidade.responsavel,
            telefone: comunidade.telefone,
        });
        setIdEndereco(comunidade.enderecoid);
        setAbrirModalEdicao(true);
    };

    const abrirDialogDeletar = (comunidade) => {
        setIdComunidade(comunidade.id);
        setAbrirModalDeletar(true);
    };

    const fecharModalCadastro = () => {
        setAbrirModalCadastro(false);
        setFormDataCadastro({
            nome: '',
            descricao: '',
            endereco: {
                cep: '',
                logradouro: '',
                bairro: '',
                uf: '',
                pais: '',
                complemento: '',
                numero: '',
                cidade: ''
            },
            responsavel: '',
            telefone: '',
        });
    };

    const fecharModalEdicao = () => {
        setAbrirModalEdicao(false);
        setFormDataEdicao({
            nome: '',
            descricao: '',
            endereco: {
                cep: '',
                logradouro: '',
                bairro: '',
                uf: '',
                pais: '',
                complemento: '',
                numero: '',
                cidade: ''
            },
            responsavel: '',
            telefone: '',
        });
    };

    useEffect(() => {
        listarComunidades();
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
                            Criar Comunidade
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
                                Informe o nome da comunidade:
                            </DialogContentText>
                            <TextField
                                id="nome"
                                name="nome"
                                label={<span>Nome <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Nome da comunidade'
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
                                Informe a descrição da comunidade:
                            </DialogContentText>
                            <TextField
                                id="descricao"
                                name="descricao"
                                label={<span>Descrição <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Descrição da comunidade'
                                value={formDataCadastro.descricao}
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
                                Informe o CEP:
                            </DialogContentText>
                            <TextField
                                id="endereco.cep"
                                name="endereco.cep"
                                placeholder='CEP'
                                label={<span>CEP <span style={{ color: 'red' }}> *</span></span>}
                                value={formDataCadastro.endereco.cep}
                                onChange={alterarDadosCadastro}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o Logradouro:
                            </DialogContentText>
                            <TextField
                                id="endereco.logradouro"
                                name="endereco.logradouro"
                                placeholder='Logradouro'
                                label={<span>Logradouro <span style={{ color: 'red' }}> *</span></span>}
                                value={formDataCadastro.endereco.logradouro}
                                onChange={alterarDadosCadastro}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o bairro:
                            </DialogContentText>
                            <TextField
                                id="endereco.bairro"
                                name="endereco.bairro"
                                placeholder='Bairro'
                                label={<span>Bairro <span style={{ color: 'red' }}> *</span></span>}
                                value={formDataCadastro.endereco.bairro}
                                onChange={alterarDadosCadastro}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe a UF:
                            </DialogContentText>
                            <TextField
                                id="endereco.uf"
                                name="endereco.uf"
                                placeholder='UF'
                                label={<span>UF <span style={{ color: 'red' }}> *</span></span>}
                                value={formDataCadastro.endereco.uf}
                                onChange={alterarDadosCadastro}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o país:
                            </DialogContentText>
                            <TextField
                                id="endereco.pais"
                                name="endereco.pais"
                                placeholder='País'
                                label={<span>País <span style={{ color: 'red' }}> *</span></span>}
                                value={formDataCadastro.endereco.pais}
                                onChange={alterarDadosCadastro}
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o complemento:
                            </DialogContentText>
                            <TextField
                                id="endereco.complemento"
                                name="endereco.complemento"
                                placeholder='Complemento'
                                label={<span>Complemento <span style={{ color: 'red' }}> *</span></span>}
                                value={formDataCadastro.endereco.complemento}
                                onChange={alterarDadosCadastro}
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o número:
                            </DialogContentText>
                            <TextField
                                id="endereco.numero"
                                name="endereco.numero"
                                placeholder='Número'
                                label={<span>Número <span style={{ color: 'red' }}> *</span></span>}
                                value={formDataCadastro.endereco.numero}
                                onChange={alterarDadosCadastro}
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe a cidade:
                            </DialogContentText>
                            <TextField
                                id="endereco.cidade"
                                name="endereco.cidade"
                                placeholder='Cidade'
                                label={<span>Cidade <span style={{ color: 'red' }}> *</span></span>}
                                value={formDataCadastro.endereco.cidade}
                                onChange={alterarDadosCadastro}
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o responsável:
                            </DialogContentText>
                            <TextField
                                id="responsavel"
                                name="responsavel"
                                label={<span>Responsável <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Responsável'
                                value={formDataCadastro.responsavel}
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
                                Informe o telefone:
                            </DialogContentText>
                            <TextField
                                id="telefone"
                                name="telefone"
                                label={<span>Telefone <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Telefone da Comunidade'
                                value={formDataCadastro.telefone}
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
                    <button type="button" className={Styles.CriarTaxonomiaButton} variant="contained" color="secondary" onClick={fecharModalCadastro}>Cancelar</button>
                    <button type="button" className={Styles.CriarTaxonomiaButton} variant="contained" color="primary" onClick={cadastrarComunidade}>Criar</button>
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
                            Editar Comunidade
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
                                Informe o nome da comunidade:
                            </DialogContentText>
                            <TextField
                                id="nome"
                                name="nome"
                                label={<span>Nome <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Nome da comunidade'
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
                                Informe a descrição da comunidade:
                            </DialogContentText>
                            <TextField
                                id="descricao"
                                name="descricao"
                                label={<span>Descrição <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Descrição da comunidade'
                                value={formDataEdicao.descricao}
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
                                Informe o CEP:
                            </DialogContentText>
                            <TextField
                                id="endereco.cep"
                                name="endereco.cep"
                                label={<span>CEP <span style={{ color: 'red' }}> *</span></span>}
                                placeholder='CEP'
                                value={formDataEdicao.endereco.cep}
                                onChange={alterarDadosEdicao}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o Logradouro:
                            </DialogContentText>
                            <TextField
                                id="endereco.logradouro"
                                name="endereco.logradouro"
                                label={<span>Logradouro <span style={{ color: 'red' }}> *</span></span>}
                                placeholder='Logradouro'
                                value={formDataEdicao.endereco.logradouro}
                                onChange={alterarDadosEdicao}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o bairro:
                            </DialogContentText>
                            <TextField
                                id="endereco.bairro"
                                name="endereco.bairro"
                                label={<span>Bairro <span style={{ color: 'red' }}> *</span></span>}
                                placeholder='Bairro'
                                value={formDataEdicao.endereco.bairro}
                                onChange={alterarDadosEdicao}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe a UF:
                            </DialogContentText>
                            <TextField
                                id="endereco.uf"
                                name="endereco.uf"
                                label={<span>UF <span style={{ color: 'red' }}> *</span></span>}
                                placeholder='UF'
                                value={formDataEdicao.endereco.uf}
                                onChange={alterarDadosEdicao}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o país:
                            </DialogContentText>
                            <TextField
                                id="endereco.pais"
                                name="endereco.pais"
                                label={<span>País <span style={{ color: 'red' }}> *</span></span>}
                                placeholder='País'
                                value={formDataEdicao.endereco.pais}
                                onChange={alterarDadosEdicao}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o complemento:
                            </DialogContentText>
                            <TextField
                                id="endereco.complemento"
                                name="endereco.complemento"
                                label={<span>Complemento <span style={{ color: 'red' }}> *</span></span>}
                                placeholder='Complemento'
                                value={formDataEdicao.endereco.complemento}
                                onChange={alterarDadosEdicao}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o número:
                            </DialogContentText>
                            <TextField
                                id="endereco.numero"
                                name="endereco.numero"
                                label={<span>Número <span style={{ color: 'red' }}> *</span></span>}
                                placeholder='Número'
                                value={formDataEdicao.endereco.numero}
                                onChange={alterarDadosEdicao}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe a cidade:
                            </DialogContentText>
                            <TextField
                                id="endereco.cidade"
                                name="endereco.cidade"
                                label={<span>Cidade <span style={{ color: 'red' }}> *</span></span>}
                                placeholder='Cidade'
                                value={formDataEdicao.endereco.cidade}
                                onChange={alterarDadosEdicao}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o responsável:
                            </DialogContentText>
                            <TextField
                                id="responsavel"
                                name="responsavel"
                                label={<span>Responsável <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Responsável'
                                value={formDataEdicao.responsavel}
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
                                Informe o telefone:
                            </DialogContentText>
                            <TextField
                                id="telefone"
                                name="telefone"
                                label={<span>Telefone <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Telefone da Comunidade'
                                value={formDataEdicao.telefone}
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
                            Editar Comunidade
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
                                Informe o nome da comunidade:
                            </DialogContentText>
                            <TextField
                                id="nome"
                                name="nome"
                                label={<span>Nome <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Nome da comunidade'
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
                                Informe a descrição da comunidade:
                            </DialogContentText>
                            <TextField
                                id="descricao"
                                name="descricao"
                                label={<span>Descrição <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Descrição da comunidade'
                                value={formDataEdicao.descricao}
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
                                Informe o CEP:
                            </DialogContentText>
                            <TextField
                                id="endereco.cep"
                                name="endereco.cep"
                                label={<span>CEP <span style={{ color: 'red' }}> *</span></span>}
                                value={formDataEdicao.endereco.cep}
                                onChange={alterarDadosEdicao}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o Logradouro:
                            </DialogContentText>
                            <TextField
                                id="endereco.logradouro"
                                name="endereco.logradouro"
                                label={<span>Logradouro <span style={{ color: 'red' }}> *</span></span>}
                                value={formDataEdicao.endereco.logradouro}
                                onChange={alterarDadosEdicao}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o bairro:
                            </DialogContentText>
                            <TextField
                                id="endereco.bairro"
                                name="endereco.bairro"
                                label={<span>Bairro <span style={{ color: 'red' }}> *</span></span>}
                                value={formDataEdicao.endereco.bairro}
                                onChange={alterarDadosEdicao}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe a UF:
                            </DialogContentText>
                            <TextField
                                id="endereco.uf"
                                name="endereco.uf"
                                label={<span>UF <span style={{ color: 'red' }}> *</span></span>}
                                value={formDataEdicao.endereco.uf}
                                onChange={alterarDadosEdicao}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o país:
                            </DialogContentText>
                            <TextField
                                id="endereco.pais"
                                name="endereco.pais"
                                label={<span>País <span style={{ color: 'red' }}> *</span></span>}
                                value={formDataEdicao.endereco.pais}
                                onChange={alterarDadosEdicao}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o complemento:
                            </DialogContentText>
                            <TextField
                                id="endereco.complemento"
                                name="endereco.complemento"
                                label={<span>Complemento <span style={{ color: 'red' }}> *</span></span>}
                                value={formDataEdicao.endereco.complemento}
                                onChange={alterarDadosEdicao}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o número:
                            </DialogContentText>
                            <TextField
                                id="endereco.numero"
                                name="endereco.numero"
                                label={<span>Número <span style={{ color: 'red' }}> *</span></span>}
                                value={formDataEdicao.endereco.numero}
                                onChange={alterarDadosEdicao}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe a cidade:
                            </DialogContentText>
                            <TextField
                                id="endereco.cidade"
                                name="endereco.cidade"
                                label={<span>Cidade <span style={{ color: 'red' }}> *</span></span>}
                                value={formDataEdicao.endereco.cidade}
                                onChange={alterarDadosEdicao}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o responsável:
                            </DialogContentText>
                            <TextField
                                id="responsavel"
                                name="responsavel"
                                label={<span>Responsável <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Responsável'
                                value={formDataEdicao.responsavel}
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
                                Informe o telefone:
                            </DialogContentText>
                            <TextField
                                id="telefone"
                                name="telefone"
                                label={<span>Telefone <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Telefone da Comunidade'
                                value={formDataEdicao.telefone}
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

            <div className={Styles.ConteudoContainer}>
                <h1>Minhas Comunidade</h1>
                <Paper className={Styles.paper}>
                    <div className={Styles.buttonContaineCriar}>
                        <button type="button" className={Styles.CriarTaxonomiaButton} onClick={() => setAbrirModalCadastro(true)}>Criar Comunidade</button>
                    </div>
                    <div style={{ marginBottom: '16px', overflowX: 'auto' }}>
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome da Comunidade</TableCell>
                                        <TableCell>Descrição</TableCell>
                                        <TableCell>Responsável</TableCell>
                                        <TableCell>Telefone</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {comunidades.map((comunidade, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{comunidade.nome}</TableCell>
                                            <TableCell>{comunidade.descricao}</TableCell>
                                            <TableCell>{comunidade.responsavel}</TableCell>
                                            <TableCell>{comunidade.telefone}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => abrirDialogEdicao(comunidade)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => abrirDialogDeletar(comunidade)} color="secondary">
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
            <Footer />
        </>
    );
}

export default MinhasComunidades;
