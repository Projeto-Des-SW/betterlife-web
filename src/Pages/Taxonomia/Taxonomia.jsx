import React, { useState, useEffect } from 'react';
import Styles from './Taxonomia.module.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import {
    TextField, Grid, Paper, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import dadosUserLogadoService from '../../Services/DadosUserLogado/DadosUserLogado-service';
import taxonomiaService from '../../Services/Taxonomia/Taxonomia-service';

function Taxonomia() {
    const navigate = useNavigate();
    const [abrirModalCadastro, setAbrirModalCadastro] = useState(false);
    const [idTaxonomia, setIdTaxonomia] = useState('');
    const [taxonomias, setTaxonomias] = useState([]);
    const [tableKey, setTableKey] = useState(0);
    const [formData, setFormData] = useState({
        classe: '',
        ordem: '',
        subordem: '',
        filo: '',
        reino: '',
    });

    const alterarDados = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
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

    const cadastrarTaxonomia = async () => {
        if (!verificarCamposPreenchidos(formData)) {
            alert('Todos os campos obrigatórios devem ser preenchidos.');
            return;
        }

        try {
            const response = await taxonomiaService.criarTaxonomia(JSON.stringify(formData));

            if (response.error === false) {
                alert('Taxonomia editada com sucesso!');
                await localStorage.setItem('userInfo', JSON.stringify(response.data));
                window.location.reload();
            }

        } catch (error) {
            alert(error.message || 'Erro ao editar taxonomia');
        }
    };

    // const editarDados = async () => {
    //     if (!verificarCamposPreenchidos(formData)) {
    //         alert('Todos os campos obrigatórios devem ser preenchidos.');
    //         return;
    //     }

    //     try {
    //         const response = await taxonomiaService.editarTaxonomia(JSON.stringify(formData));

    //         if (response.error === false) {
    //             alert('Taxonomia editada com sucesso!');
    //             await localStorage.setItem('userInfo', JSON.stringify(response.data));
    //             window.location.reload();
    //         }

    //     } catch (error) {
    //         alert(error.message || 'Erro ao editar taxonomia');
    //     }
    // };

    // const deletarTaxonomia = async () => {
    //     try {
    //         const response = await taxonomiaService.deletarTaxonomia(idTaxonomia);

    //         if (response.error === false) {
    //             alert('Taxonomia deletada com sucesso!');
    //             dadosUserLogadoService.logOut();
    //             navigate('/login');
    //         } else {
    //             alert(response.message)
    //         }
    //     } catch (error) {
    //         alert(error.message || 'Erro ao deletar taxonomia');
    //     } finally {
    //         setShowConfirmPopup(false);
    //         setPassword('');
    //     }
    // }

    const handleBack = () => {
        navigate('/telaPrincipal');
    };

    useEffect(() => {
        setTableKey(tableKey + 1)
    }, []);

    return (
        <>
            <Header />

            <Dialog
                aria-labelledby="customized-dialog-title"
                open={abrirModalCadastro}
                onClose={() => setAbrirModalCadastro(false)}
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
                            <IconButton onClick={() => setAbrirModalCadastro(false)}>
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
                                value={formData.classe}
                                onChange={alterarDados}
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
                                value={formData.ordem}
                                onChange={alterarDados}
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
                                value={formData.subordem}
                                onChange={alterarDados}
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
                                value={formData.filo}
                                onChange={alterarDados}
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
                                value={formData.reino}
                                onChange={alterarDados}
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
                    <button type="button" className={Styles.CriarTaxonomiaButton} onClick={() => setAbrirModalCadastro(false)}>Cancelar</button>
                    <button type="button" className={Styles.CriarTaxonomiaButton} onClick={() => cadastrarTaxonomia()}>Criar</button>
                </DialogActions>
            </Dialog>

            <div className={Styles.ConteudoContainer}>
                <h1>Taxonomia</h1>
                <Paper className={Styles.paper}>
                    <div className={Styles.buttonContaineCriar}>
                        <button type="button" className={Styles.CriarTaxonomiaButton} onClick={() => setAbrirModalCadastro(true)}>Criar Taxonomia</button>
                    </div>
                    <div key={tableKey} style={{ marginBottom: '16px', overflowX: 'auto' }}>
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Classe</TableCell>
                                        <TableCell>Ordem</TableCell>
                                        <TableCell>Subordem</TableCell>
                                        <TableCell>Filo</TableCell>
                                        <TableCell>Reino</TableCell>
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
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Paper>

                <div className={Styles.buttonContainerVoltar}>
                    <button type="button" className={Styles.CriarTaxonomiaButton} onClick={handleBack}>Voltar</button>
                </div>
            </div>
        </>
    );
}

export default Taxonomia;