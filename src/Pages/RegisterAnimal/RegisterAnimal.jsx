import React, { useState, useEffect } from 'react';
import styles from './RegisterAnimal.module.css';
import { useNavigate } from 'react-router-dom';
import {
  TextField, Grid, Paper, Select, MenuItem, FormControl, InputLabel
} from '@material-ui/core';
import registerAnimalService from '../../Services/RegisterAnimal/RegisterAnimal-service';
import Header from '../Header/Header';
import taxonomiaService from '../../Services/Taxonomia/Taxonomia-service';
import dadosUserLogadoService from '../../Services/DadosUserLogado/DadosUserLogado-service';

const RegisterAnimal = () => {
  const navigate = useNavigate();
  const [taxonomias, setTaxonomias] = useState([]);
  const [taxonomiaNome, setTaxonomiaNome] = useState([]);
  const [imagem, setImagem] = useState(null);
  const [som, setSom] = useState(null);

  const handleBack = () => {
    navigate('/telaPrincipal');
  };

  const [dadosCadastro, setDadosCadastro] = useState({
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
  })

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

  const submeter = async (e) => {
    e.preventDefault();
    if (!dadosCadastro.descricao || !dadosCadastro.nome || !dadosCadastro.nomecientifico || !dadosCadastro.sexo || !dadosCadastro.peso || !dadosCadastro.idade || !dadosCadastro.observacaodaespecie || !dadosCadastro.usuarioid || !dadosCadastro.imagemid || !dadosCadastro.somid || !dadosCadastro.taxonomiaid) {
      alert('Todos os campos de cadastro são obrigatórios.');
      return
    }

    try {
      const dados = {
        ...dadosCadastro,
      }
      const response = await registerAnimalService.registerAnimal(JSON.stringify(dados));
      if (response.error === false) {
        alert('Animal cadastrado com sucesso!')
        setTimeout(() => {
          navigate('/telaPrincipal')
        }, 2000)
      }
    } catch (error) {
      alert(error.message || 'Erro ao registrar animal');
    }
  };

  useEffect(() => {
    listarTaxonomias();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.ConteudoContainer}>
        <h1>Cadastro de animal silvestre</h1>

        <Paper className={styles.paper}>
          <h2 className={styles.title}>Imagem do Animal</h2>
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
          <h2 className={styles.title}>Dados do Animal</h2>
          <form onSubmit={submeter} className={styles.registerForm}>
            <div className={styles.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="nome"
                    label={
                      <span>
                        Nome do animal <span style={{ color: 'red' }}>*</span>
                      </span>
                    }
                    value={dadosCadastro.nome}
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, nome: e.target.value })}
                    fullWidth
                    id="nome"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="nomecientifico"
                    label={
                      <span>
                        Nome Científico do animal <span style={{ color: 'red' }}>*</span>
                      </span>
                    }
                    value={dadosCadastro.nomecientifico}
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, nomecientifico: e.target.value })}
                    fullWidth
                    id="nomecientifico"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="idade"
                    label={
                      <span>
                        Idade <span style={{ color: 'red' }}>*</span>
                      </span>
                    }
                    value={dadosCadastro.idade}
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, idade: e.target.value })}
                    fullWidth
                    id="nomecientifico"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="taxonomia-label">
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
                      value={dadosCadastro.sexo}
                      onChange={(e) => setDadosCadastro({ ...dadosCadastro, sexo: e.target.value })}
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

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="peso"
                    label={
                      <span>
                        Peso (em Kg) <span style={{ color: 'red' }}>*</span>
                      </span>
                    }
                    value={dadosCadastro.peso}
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, peso: e.target.value })}
                    fullWidth
                    id="peso"
                  />

                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="descricao"
                    label={
                      <span>
                        Descrição <span style={{ color: 'red' }}>*</span>
                      </span>
                    }
                    value={dadosCadastro.descricao}
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, descricao: e.target.value })}
                    fullWidth
                    id="descricao"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="observacaodaespecie"
                    label={
                      <span>
                        Observação da Espécie <span style={{ color: 'red' }}>*</span>
                      </span>
                    }
                    value={dadosCadastro.observacaodaespecie}
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, observacaodaespecie: e.target.value })}
                    fullWidth
                    id="observacaodaespecie"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="taxonomia-label">
                      Taxonomia <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      labelId="taxonomia-label"
                      name="taxonomia"
                      value={taxonomiaNome}
                      onChange={(e) => {
                        const selectedTaxonomia = e.target.value;
                        setTaxonomiaNome(selectedTaxonomia);
                        setDadosCadastro({ ...dadosCadastro, taxonomiaid: selectedTaxonomia });
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
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>Cadastrar Animal</button>
            </div>
          </form>
        </Paper>
        <div className={styles.buttonContainer}>
          <button type="button" className={styles.VoltarButton} variant="contained" color="default" onClick={handleBack}>Voltar</button>
        </div>
      </div >
    </>
  );
};


export default RegisterAnimal