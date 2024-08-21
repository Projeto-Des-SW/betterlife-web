import React, { useState, useEffect } from 'react';
import Styles from './Taxonomia.module.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import {
    TextField, Grid, Paper, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import taxonomiaService from '../../Services/Taxonomia/Taxonomia-service';

function Taxonomia() {
    const navigate = useNavigate();
    const [abrirModalCadastro, setAbrirModalCadastro] = useState(false);
    const [abrirModalEdicao, setAbrirModalEdicao] = useState(false);
    const [abrirModalDeletar, setAbrirModalDeletar] = useState(false);
    const [idTaxonomia, setIdTaxonomia] = useState('');
    const [taxonomias, setTaxonomias] = useState([]);
    const [formDataCadastro, setFormDataCadastro] = useState({
        classe: '',
        ordem: '',
        subordem: '',
        filo: '',
        reino: '',
    });
    const [formDataEdicao, setFormDataEdicao] = useState({
        classe: '',
        ordem: '',
        subordem: '',
        filo: '',
        reino: '',
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
            'classe', 'ordem', 'subordem', 'filo', 'reino'
        ];

        for (const campo of camposObrigatorios) {
            const valor = campo.split('.').reduce((obj, chave) => obj && obj[chave], dados);
            if (!valor) {
                return false;
            }
        }
        return true;
    };

    const listarTaxonomias = async () => {
        try {
            const response = await taxonomiaService.listarTaxonomias();

            if (response.error === false) {
                setTaxonomias(response.data);
            } else {
                alert(response.message);
            }

        } catch (error) {
            alert(error.message || 'Erro ao listar taxonomias');
        }
    };

    const cadastrarTaxonomia = async () => {
        if (!verificarCamposPreenchidos(formDataCadastro)) {
            alert('Todos os campos obrigatórios devem ser preenchidos.');
            return;
        }

        try {
            const response = await taxonomiaService.criarTaxonomia(JSON.stringify(formDataCadastro));

            if (response.error === false) {
                alert('Taxonomia criada com sucesso!');
                fecharModalCadastro();
                listarTaxonomias();
            }

        } catch (error) {
            alert(error.message || 'Erro ao criar taxonomia');
        }
    };

    const editarDados = async () => {
        if (!verificarCamposPreenchidos(formDataEdicao)) {
            alert('Todos os campos obrigatórios devem ser preenchidos.');
            return;
        }

        try {
            const response = await taxonomiaService.editarTaxonomia(idTaxonomia, JSON.stringify(formDataEdicao));

            if (response.error === false) {
                alert('Taxonomia editada com sucesso!');
                fecharModalEdicao();
                listarTaxonomias();
            }

        } catch (error) {
            alert(error.message || 'Erro ao editar taxonomia');
        }
    };

    const deletarTaxonomia = async () => {
        try {
            const response = await taxonomiaService.deletarTaxonomia(idTaxonomia);

            if (response.error === false) {
                alert('Taxonomia deletada com sucesso!');
                setAbrirModalDeletar(false);
                listarTaxonomias();
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert(error.message || 'Erro ao deletar taxonomia');
        }
    }

    const handleBack = () => {
        navigate('/telaPrincipal');
    };

    const abrirDialogEdicao = (taxonomia) => {
        setIdTaxonomia(taxonomia.id);
        setFormDataEdicao({
            classe: taxonomia.classe,
            ordem: taxonomia.ordem,
            subordem: taxonomia.subordem,
            filo: taxonomia.filo,
            reino: taxonomia.reino,
        });
        setAbrirModalEdicao(true);
    };

    const abrirDialogDeletar = (taxonomia) => {
        setIdTaxonomia(taxonomia.id);
        setAbrirModalDeletar(true);
    };

    const fecharModalCadastro = () => {
        setAbrirModalCadastro(false);
        setFormDataCadastro({
            classe: '',
            ordem: '',
            subordem: '',
            filo: '',
            reino: '',
        });
    };

    const fecharModalEdicao = () => {
        setAbrirModalEdicao(false);
        setFormDataEdicao({
            classe: '',
            ordem: '',
            subordem: '',
            filo: '',
            reino: '',
        });
    };

    useEffect(() => {
        listarTaxonomias();
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
                            Criar Taxonomia
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
                                Informe a classe:
                            </DialogContentText>
                            <TextField
                                id="classe"
                                name="classe"
                                label={<span>Classe <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Classe'
                                value={formDataCadastro.classe}
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
                                Informe a ordem:
                            </DialogContentText>
                            <TextField
                                id="ordem"
                                name="ordem"
                                label={<span>Ordem <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Ordem'
                                value={formDataCadastro.ordem}
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
                                Informe a subordem:
                            </DialogContentText>
                            <TextField
                                id="subordem"
                                name="subordem"
                                label={<span>Subordem <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Subordem'
                                value={formDataCadastro.subordem}
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
                                Informe o filo:
                            </DialogContentText>
                            <TextField
                                id="filo"
                                name="filo"
                                label={<span>Filo <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Filo'
                                value={formDataCadastro.filo}
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
                                Informe o reino:
                            </DialogContentText>
                            <TextField
                                id="reino"
                                name="reino"
                                label={<span>Reino <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Reino'
                                value={formDataCadastro.reino}
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
                    <button type="button" className={Styles.CriarTaxonomiaButton} variant="contained" color="primary" onClick={cadastrarTaxonomia}>Criar</button>
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
                            Editar Taxonomia
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
                                Informe a classe:
                            </DialogContentText>
                            <TextField
                                id="classe"
                                name="classe"
                                label={<span>Classe <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Classe'
                                value={formDataEdicao.classe}
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
                                Informe a ordem:
                            </DialogContentText>
                            <TextField
                                id="ordem"
                                name="ordem"
                                label={<span>Ordem <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Ordem'
                                value={formDataEdicao.ordem}
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
                                Informe a subordem:
                            </DialogContentText>
                            <TextField
                                id="subordem"
                                name="subordem"
                                label={<span>Subordem <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Subordem'
                                value={formDataEdicao.subordem}
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
                                Informe o filo:
                            </DialogContentText>
                            <TextField
                                id="filo"
                                name="filo"
                                label={<span>Filo <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Filo'
                                value={formDataEdicao.filo}
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
                                Informe o reino:
                            </DialogContentText>
                            <TextField
                                id="reino"
                                name="reino"
                                label={<span>Reino <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='Reino'
                                value={formDataEdicao.reino}
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
                            Deletar Taxonomia
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
                        Tem certeza que deseja deletar essa taxonomia?
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'space-around' }}>
                    <button type="button" className={Styles.CriarTaxonomiaButton} variant="contained" color="secondary" onClick={() => setAbrirModalDeletar(false)}>Cancelar</button>
                    <button type="button" className={Styles.CriarTaxonomiaButton} variant="contained" color="primary" onClick={deletarTaxonomia}>Deletar</button>
                </DialogActions>
            </Dialog>

            <div className={Styles.ConteudoContainer}>
                <h1>Taxonomia</h1>
                <Paper className={Styles.paper}>
                    <div className={Styles.buttonContaineCriar}>
                        <button type="button" className={Styles.CriarTaxonomiaButton} onClick={() => setAbrirModalCadastro(true)}>Criar Taxonomia</button>
                    </div>
                    <div style={{ marginBottom: '16px', overflowX: 'auto' }}>
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Classe</TableCell>
                                        <TableCell>Ordem</TableCell>
                                        <TableCell>Subordem</TableCell>
                                        <TableCell>Filo</TableCell>
                                        <TableCell>Reino</TableCell>
                                        <TableCell>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {taxonomias.map((taxonomia, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{taxonomia.classe}</TableCell>
                                            <TableCell>{taxonomia.ordem}</TableCell>
                                            <TableCell>{taxonomia.subordem}</TableCell>
                                            <TableCell>{taxonomia.filo}</TableCell>
                                            <TableCell>{taxonomia.reino}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => abrirDialogEdicao(taxonomia)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => abrirDialogDeletar(taxonomia)} color="secondary">
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
    );
}

export default Taxonomia;
