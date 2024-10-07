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
import imagemService from '../../Services/Imagem/Imagem-service';
import somService from '../../Services/Som/Som-service';
import Footer from '../Footer/Footer';

const RegisterAnimal = () => {
  const navigate = useNavigate();
  const [taxonomias, setTaxonomias] = useState([]);
  const [taxonomiaNome, setTaxonomiaNome] = useState([]);
  const [fotosInput, setFotosInput] = useState({
    arquivofoto: null,
    nomearquivo: null,
  });
  const [somInput, setSomInput] = useState({
    arquivosom: null,
    nomearquivo: null,
  });
  const [dadosCadastro, setDadosCadastro] = useState({
    nome: '',
    nomecientifico: '',
    sexo: '',
    peso: '',
    idade: '',
    descricao: '',
    observacaodaespecie: '',
    usuarioid: dadosUserLogadoService.getUserInfo().id,
    imagemid: '',
    somid: '',
    taxonomiaid: '',
  });

  const MAX_SIZE_IMG = 1024 * 1024 * 5;
  const MAX_SIZE_AUDIO = 1024 * 1024 * 6;

  const handleBack = () => {
    navigate('/telaPrincipal');
  };

  const trataBaseImg = (img) => img.replace(/^data:image\/[a-z]+;base64,/, '');

  const trataBaseSom = (som) => som.replace(/^data:audio\/[a-z]+;base64,/, '');

  const validaImagem = (tipo) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/jpe', 'image/png', 'image/bmp'];
    return allowedTypes.includes(tipo);
  };

  const validaSom = (tipo) => {
    const allowedTypes = ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mpeg'];
    return allowedTypes.includes(tipo);
  };

  const adicionarSom = async (file) => {
    if (file?.size > MAX_SIZE_AUDIO) {
      alert('O tamanho do som não pode ser maior que 6 MB!');
      document.getElementById('somAnimal').value = '';
      return;
    }

    if (file && validaSom(file.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSomInput({
          arquivosom: trataBaseSom(reader.result),
          nomearquivo: file.name,
        });
      };
    } else {
      alert('Formato de som inválido, anexe arquivos do tipo .mp3, .wav, .ogg ou .mpeg!');
      document.getElementById('somAnimal').value = '';
      setSomInput({
        arquivosom: null,
        nomearquivo: null,
      });
    }
  };

  const adicionarFoto = async (file) => {
    if (file?.size > MAX_SIZE_IMG) {
      alert('O tamanho da imagem não pode ser maior que 5 MB!');
      document.getElementById('imagemAnimal').value = '';
      return;
    }

    if (file && validaImagem(file.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFotosInput({
          arquivofoto: trataBaseImg(reader.result),
          nomearquivo: file.name,
        });
      };
    } else {
      alert('Formato de imagem inválido, anexe imagens do tipo .jpe, .jpg, .jpeg, .png ou .bmp!');
      document.getElementById('imagemAnimal').value = '';
      setFotosInput({
        arquivofoto: null,
        nomearquivo: null,
      });
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

  const submeter = async (e) => {
    e.preventDefault();
    if (!dadosCadastro.descricao || !dadosCadastro.nome || !dadosCadastro.nomecientifico || !dadosCadastro.sexo || !dadosCadastro.peso || !dadosCadastro.idade || !dadosCadastro.observacaodaespecie || !dadosCadastro.usuarioid || !dadosCadastro.taxonomiaid) {
      alert('Todos os campos de cadastro são obrigatórios.');
      return;
    }
  
    try {
      const dadosImagem = {
        ...fotosInput,
      };
  
      const dadosSom = {
        ...somInput,
      };
  
      const responseImagem = await imagemService.criarImagemAnimal(JSON.stringify(dadosImagem));
      const responseSom = await somService.criarSomAnimal(JSON.stringify(dadosSom));
  
      if (responseImagem.error === false && responseSom.error === false) {
        const updatedDadosCadastro = {
          ...dadosCadastro,
          somid: responseSom.data.id,
          imagemid: responseImagem.data.id,
        };
  
        const responseAnimal = await registerAnimalService.registerAnimal(JSON.stringify(updatedDadosCadastro));
        if (responseAnimal.error === false) {
          alert('Animal cadastrado com sucesso!');
          setTimeout(() => {
            navigate('/telaPrincipal');
          }, 2000);
        }
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
          <h2 className={styles.title}>Dados do Animal</h2>
          <form onSubmit={submeter} className={styles.registerForm}>
          <div className={styles.form}>
  <Grid container spacing={2}>
    {[
      {
        name: 'nome',
        label: 'Nome do animal',
        type: 'text',
        value: dadosCadastro.nome,
      },
      {
        name: 'nomecientifico',
        label: 'Nome Científico do animal',
        type: 'text',
        value: dadosCadastro.nomecientifico,
      },
      {
        name: 'idade',
        label: 'Idade',
        type: 'text',
        value: dadosCadastro.idade,
      },
      {
        name: 'peso',
        label: 'Peso (em Kg)',
        type: 'text',
        value: dadosCadastro.peso,
      },
      {
        name: 'descricao',
        label: 'Descrição',
        type: 'text',
        value: dadosCadastro.descricao,
      },
      {
        name: 'observacaodaespecie',
        label: 'Observação da Espécie',
        type: 'text',
        value: dadosCadastro.observacaodaespecie,
      },
    ].map(({ name, label, type, value }, index) => (
      <Grid item xs={12} sm={6} key={index}>
        <TextField
          variant="outlined"
          type={type}
          name={name}
          label={
            <span>
              {label} <span style={{ color: 'red' }}>*</span>
            </span>
          }
          value={value}
          onChange={(e) => setDadosCadastro({ ...dadosCadastro, [name]: e.target.value })}
          fullWidth
          id={name}
          className={styles.textField}
        />
      </Grid>
    ))}

    <Grid item xs={12} sm={6}>
      <FormControl variant="outlined" fullWidth className={styles.formControl}>
        <InputLabel id="sexo-label">
          Sexo <span style={{ color: 'red' }}>*</span>
        </InputLabel>
        <Select
          labelId="sexo-label"
          name="sexo"
          value={dadosCadastro.sexo}
          onChange={(e) => setDadosCadastro({ ...dadosCadastro, sexo: e.target.value })}
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
      <FormControl variant="outlined" fullWidth className={styles.formControl}>
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
          displayEmpty
        >
          <MenuItem value="" disabled>
            Taxonomia
          </MenuItem>
          {taxonomias.map((taxonomia) => (
            <MenuItem key={taxonomia.id} value={taxonomia.id}>
              {taxonomia.especie}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    {[
      {
        id: 'imagemAnimal',
        name: 'imagemAnimal',
        accept: 'image/*',
        label: 'Anexar Foto do Animal',
        onChange: (e) => adicionarFoto(e.target.files[0]),
      },
      {
        id: 'somAnimal',
        name: 'somAnimal',
        accept: 'audio/*',
        label: 'Anexar Som do Animal',
        onChange: (e) => adicionarSom(e.target.files[0]),
      },
    ].map(({ id, name, accept, label, onChange }, index) => (
      <Grid item xs={12} sm={6} key={index}>
        <label htmlFor={id} className={styles.fileLabel}>
          {label} <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="file"
          id={id}
          name={name}
          accept={accept}
          onChange={onChange}
          className={styles.fileInput}
        />
      </Grid>
    ))}
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
      <Footer />
    </>
  );
};


export default RegisterAnimal