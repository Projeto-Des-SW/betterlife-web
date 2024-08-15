import React, { useState, useEffect } from 'react';
import styles from './RegisterAnimal.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../Assets/logo.png";
import {
    TextField, Grid, Paper, Select, MenuItem
} from '@material-ui/core';
import registerAnimalService from '../../Services/RegisterAnimal/RegisterAnimal-service';

const RegisterAnimal = () => {
    const navigate = useNavigate();
    
    const [dadosCadastro, setDadosCadastro] = useState({
        nome:'',
        nomeCientifico:'',
        sexo:'',
        peso:'',
        idade:'',
        descricao:'',
        observacaoDaEspecie:'',
        usuarioId:'',
        imagemId:'',
        somId:'',
        taxonomiaId:'',
    })

    const [imagem, setImagem] = useState(null);
    const [som, setSom] = useState(null);

    const submeter = async(e) =>{
        e.preventDefault();
        if (!dadosCadastro.descricao || !dadosCadastro.nome ||!dadosCadastro.nomeCientifico ||!dadosCadastro.sexo ||!dadosCadastro.peso ||!dadosCadastro.idade ||!dadosCadastro.observacaoDaEspecie ||!dadosCadastro.usuarioId ||!dadosCadastro.imagemId ||!dadosCadastro.somId ||!dadosCadastro.taxonomiaId){
            alert('Todos os campos de cadastro são obrigatórios.');
            return
        }

        try {
            const dados = {
                ...dadosCadastro,
            }
            const response = await registerAnimalService.registerAnimal(JSON.stringify(dados));
            if (response.error === false){
                alert('Animal cadastrado com sucesso!')
                setTimeout(()=>{
                    navigate('/telaPrincipal')
                }, 2000)
            }
        } catch (error) {
            alert(error.message || 'Erro ao registrar animal');
        }
    };

    return (
        <div className={styles.registerContainer}>
          <div className={styles.registerHeader}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <h2>Cadastro de animal silvestre</h2>
            
          </div>         
    
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
                      fullWidth
                      id="nome"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      type="text"
                      name="nomeCientifico"
                      label={
                        <span>
                          Nome Científico do animal <span style={{ color: 'red' }}>*</span>
                        </span>
                      }
                      value={dadosCadastro.nomeCientifico}
                      fullWidth
                      id="nomeCientifico"
                    />
                  </Grid>
    
                  <Grid item xs={12} sm={6}>
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
                        Selecione o sexo
                        </MenuItem>
                        <MenuItem value="Macho">Macho</MenuItem>
                        <MenuItem value="Fêmea">Fêmea</MenuItem>
                    </Select>
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
                      fullWidth
                      id="descricao"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      type="text"
                      name="observacaoDaEspecie"
                      label={
                        <span>
                          Descrição <span style={{ color: 'red' }}>*</span>
                        </span>
                      }
                      value={dadosCadastro.observacaoDaEspecie}
                      fullWidth
                      id="observacaoDaEspecie"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Select
                        variant="outlined"
                        name="sexo"
                        label={
                        <span>
                            Taxonomia <span style={{ color: 'red' }}>*</span>
                        </span>
                        }
                        value={dadosCadastro.sexo}
                        onChange={(e) => setDadosCadastro({ ...dadosCadastro, taxonomiaId: e.target.value })}
                        fullWidth
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                        Selecione a taxonomia
                        </MenuItem>                        
                    </Select>
                  </Grid>
                    <Grid item xs={12} sm={6}>
                        <label htmlFor="somAnimal">
                            <span>
                                Anexar Som do Animal <span style={{ color: 'red' }}>*</span>
                            </span>
                        </label>
                        <input
                            type="file"
                            id="somAnimal"
                            name="somAnimal"
                            accept="audio/*"
                            onChange={(e) => setSom(e.target.files[0])}
                        />
                    </Grid>
                </Grid>
              </div> 
              <div className={styles.form}>
                <div className={styles.buttonContainer}>
                  <button type="submit" className={styles.submitButton}>Cadastrar Animal</button>
                </div>
    
              </div>
            </form>
          </Paper>    
          
        </div >
      );
    };
    

export default RegisterAnimal