import React, { useState, useEffect } from 'react';
import styles from './Animais.module.css';
import { useNavigate } from 'react-router-dom';
import {
    TextField, Grid, Select, Paper, MenuItem, Dialog, FormControl, InputLabel, DialogActions, DialogContent, DialogTitle, DialogContentText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import Header from '../Header/Header';
import dadosUserLogadoService from '../../Services/DadosUserLogado/DadosUserLogado-service';
import animaisService from '../../Services/Animais/Animais-service';
import taxonomiaService from '../../Services/Taxonomia/Taxonomia-service';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Animais = () => {
    const navigate = useNavigate();
    const [abrirModalEdicao, setAbrirModalEdicao] = useState(false);
    const [abrirModalDeletar, setAbrirModalDeletar] = useState(false);
    const [animais, setAnimais] = useState([]);
    const [taxonomias, setTaxonomias] = useState([]);
    const [idAnimal, setIdAnimal] = useState('');
    const [imagem, setImagem] = useState(null);
    const [som, setSom] = useState(null);
    const [taxonomiaNome, setTaxonomiaNome] = useState([]);
    const [formDataEdicao, setFormDataEdicao] = useState({
        nome: '',
        nomecientifico: '',
        sexo: '',
        peso: '',
        idade: '',
        descricao: '',
        observacaodaespecie: '',
        usuarioid: dadosUserLogadoService.getUserInfo().id,
        imagemid: 1,
        somid: 1,
        taxonomiaid: '',
    });

    const reverterBaseImg = (img) => `data:image/png;base64,${img}`;

    const alterarDadosEdicao = (e) => {
        const { id, value } = e.target;
        setFormDataEdicao({
            ...formDataEdicao,
            [id]: value
        });
    };

    const verificarCamposPreenchidos = (dados) => {
        const camposObrigatorios = [
            'nome', 'nomecientifico', 'sexo', 'peso', 'idade', 'descricao', 'observacaodaespecie', 'taxonomiaid'
        ];

        for (const campo of camposObrigatorios) {
            const valor = campo.split('.').reduce((obj, chave) => obj && obj[chave], dados);
            if (!valor) {
                return false;
            }
        }
        return true;
    };

    const listarAnimais = async () => {
        try {
            const response = await animaisService.listarAnimais();

            if (response.error === false) {
                const animaisComImagem = response.data.map(animal => ({
                    ...animal,
                    imagem: {
                        arquivofoto: reverterBaseImg(animal.arquivofoto),
                        nomearquivo: animal.nomearquivo
                    }
                }));
                setAnimais(animaisComImagem);
            } else {
                alert(response.message);
            }

        } catch (error) {
            alert(error.message || 'Erro ao listar Animais');
        }
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
    }

    const editarDados = async () => {
        if (!verificarCamposPreenchidos(formDataEdicao)) {
            alert('Todos os campos obrigatórios devem ser preenchidos.');
            return;
        }

        try {
            const response = await animaisService.editarAnimal(idAnimal, JSON.stringify(formDataEdicao));

            if (response.error === false) {
                alert('Animal editada com sucesso!');
                fecharModalEdicao();
                listarAnimais();
            }

        } catch (error) {
            alert(error.message || 'Erro ao editar Animal');
        }
    };

    const deletarAnimal = async () => {
        try {

            const response = await animaisService.deletarAnimal(idAnimal);

            if (response.error === false) {
                alert('animal deletada com sucesso!');
                setAbrirModalDeletar(false);
                listarAnimais();
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert(error.message || 'Erro ao deletar animal');
        }
    }

    const handleBack = () => {
        navigate('/telaPrincipal');
    };

    const abrirDialogEdicao = (animal) => {
        setIdAnimal(animal.id);
        setFormDataEdicao({
            nome: animal.nome,
            nomecientifico: animal.nomecientifico,
            sexo: animal.sexo,
            peso: animal.peso,
            idade: animal.idade,
            descricao: animal.descricao,
            observacaodaespecie: animal.observacaodaespecie,
            usuarioid: dadosUserLogadoService.getUserInfo().id,
            imagemid: animal.imagemid,
            somid: animal.somid,
            taxonomiaid: animal.taxonomiaid,
        });
        setAbrirModalEdicao(true);
    };

    const abrirDialogDeletar = (animal) => {
        setIdAnimal(animal.id);
        setAbrirModalDeletar(true);
    };

    const fecharModalEdicao = () => {
        setAbrirModalEdicao(false);
        setFormDataEdicao({
            nome: '',
            nomecientifico: '',
            sexo: '',
            peso: '',
            idade: '',
            descricao: '',
            observacaodaespecie: '',
            imagemid: '',
            somid: '',
            taxonomiaid: '',
        });
    };

    useEffect(() => {
        listarAnimais();
        listarTaxonomias();
    }, []);

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
                            Editar Animal
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
                        <Grid item xs={12}>
                            <div className={styles.imageUploadWrapper}>
                                <div className={styles.imageUploadContainer}>
                                    <input
                                        type="file"
                                        id="imagemAnimal"
                                        name="imagemAnimal"
                                        accept="image/*"
                                        className={styles.imageUploadInput}
                                        onChange={(e) => setImagem(e.target.files[0])}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o Nome:
                            </DialogContentText>
                            <TextField
                                id="nome"
                                name="nome"
                                label={<span>nome <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='nome'
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
                                Informe o Nome Cientifico:
                            </DialogContentText>
                            <TextField
                                id="nomecientifico"
                                name="nomecientifico"
                                label={<span>nome cientifico <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='nomecientifico'
                                value={formDataEdicao.nomecientifico}
                                onChange={alterarDadosEdicao}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="animal-label">
                                    Sexo <span style={{ color: 'red' }}>*</span>
                                </InputLabel>
                                <Select
                                    variant="outlined"
                                    name="sexo"
                                    label={
                                        <span>
                                            Sexo <span style={{ color: 'red' }}>*</span>
                                        </span>
                                    }
                                    value={formDataEdicao.sexo}
                                    onChange={alterarDadosEdicao}
                                    fullWidth
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>
                                        Sexo
                                    </MenuItem>
                                    <MenuItem value="Macho">Macho</MenuItem>
                                    <MenuItem value="Fêmea">Fêmea</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DialogContentText>
                                Informe o peso:
                            </DialogContentText>
                            <TextField
                                id="peso"
                                name="peso"
                                label={<span>peso <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='peso'
                                value={formDataEdicao.peso}
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
                                Informe o idade:
                            </DialogContentText>
                            <TextField
                                id="idade"
                                name="idade"
                                label={<span>idade <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='idade'
                                value={formDataEdicao.idade}
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
                                Informe o descricao:
                            </DialogContentText>
                            <TextField
                                id="descricao"
                                name="descricao"
                                label={<span>descricao <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='descricao'
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
                                Informe o observação da especie:
                            </DialogContentText>
                            <TextField
                                id="observacaodaespecie"
                                name="observacaodaespecie"
                                label={<span>observação da especie <span style={{ color: 'red' }}> *</span></span>}
                                type="text"
                                placeholder='observacaodaespecie'
                                value={formDataEdicao.observacaodaespecie}
                                onChange={alterarDadosEdicao}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="animal-label">
                                    Taxonomia <span style={{ color: 'red' }}>*</span>
                                </InputLabel>
                                <Select
                                    labelId="taxonomia-label"
                                    name="Taxonomia"
                                    value={taxonomiaNome}
                                    onChange={(e) => {
                                        const selectedTaxonomia = e.target.value;
                                        setTaxonomiaNome(selectedTaxonomia);
                                        setFormDataEdicao({ ...formDataEdicao, taxonomiaid: selectedTaxonomia })
                                    }}
                                    label="Taxonomia *"
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>
                                        Taxonomia
                                    </MenuItem>
                                    {taxonomias.map((taxonomia) => (
                                        <MenuItem key={taxonomia.id} value={taxonomia.id}>
                                            {taxonomia.reino}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <label htmlFor="somAnimal" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                                Anexar Som do Animal <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="file"
                                id="somAnimal"
                                name="somAnimal"
                                accept="audio/*"
                                onChange={(e) => setSom(e.target.files[0])}
                                style={{
                                    display: 'block',
                                    maxWidth: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                                    backgroundColor: '#f9f9f9',
                                    border: '1px solid #ccc',
                                    cursor: 'pointer',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'space-around' }}>
                    <button type="button" className={styles.AnimalButton} variant="contained" color="secondary" onClick={fecharModalEdicao}>Cancelar</button>
                    <button type="button" className={styles.AnimalButton} variant="contained" color="primary" onClick={editarDados}>Salvar</button>
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
                            Deletar Animal
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
                        Tem certeza que deseja deletar esse Animal?
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'space-around' }}>
                    <button type="button" className={styles.AnimalButton} variant="contained" color="secondary" onClick={() => setAbrirModalDeletar(false)}>Cancelar</button>
                    <button type="button" className={styles.AnimalButton} variant="contained" color="primary" onClick={deletarAnimal}>Deletar</button>
                </DialogActions>
            </Dialog>

            <div className={styles.ConteudoContainer}>
                <h1>Animais</h1>
                <Paper className={styles.paper}>
                    <div style={{ marginBottom: '16px', overflowX: 'auto' }}>
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Nome Cientifico</TableCell>
                                        <TableCell>Sexo</TableCell>
                                        <TableCell>Peso</TableCell>
                                        <TableCell>Idade</TableCell>
                                        <TableCell>Descrição</TableCell>
                                        <TableCell>Obs. da especie</TableCell>
                                        <TableCell>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {animais.map((animal, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{animal.nome}</TableCell>
                                            <TableCell>{animal.nomecientifico}</TableCell>
                                            <TableCell>{animal.sexo}</TableCell>
                                            <TableCell>{animal.peso}</TableCell>
                                            <TableCell>{animal.idade}</TableCell>
                                            <TableCell>{animal.descricao}</TableCell>
                                            <TableCell>{animal.observacaodaespecie}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => abrirDialogEdicao(animal)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => abrirDialogDeletar(animal)} color="secondary">
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
                <div className={styles.buttonContainer}>
                    <button type="button" className={styles.AnimalButton} variant="contained" color="default" onClick={handleBack}>Voltar</button>
                </div>
            </div>

        </>
    )
}

export default Animais;