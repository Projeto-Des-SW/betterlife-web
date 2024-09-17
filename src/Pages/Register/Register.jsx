import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./Register.module.css";
import logo from "../../Assets/logo2.png";
import { cpf, cnpj } from 'cpf-cnpj-validator';
import {
  TextField, Grid, Paper
} from '@material-ui/core';
import registerService from '../../Services/Register/Register-service';

const Register = () => {
  const navigate = useNavigate();
  const [tipoCadastro, setTipoCadastro] = useState('pessoaComum');

  const [dadosCadastro, setDadosCadastro] = useState({
    email: '',
    senha: '',
    nome: '',
    telefone: '',
    documento: '',
  });

  const [dadosEndereco, setDadosEndereco] = useState({
    cep: '',
    logradouro: '',
    bairro: '',
    uf: '',
    pais: '',
    complemento: '',
    numero: '',
    localidade: ''
  });

  const [senhaValida, setSenhaValida] = useState({
    tamanho: false,
    hasUpperCase: false,
    hasLowerCase: false,
    numero: false,
    special: false,
  });

  const validarSenha = (senha) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(senha);
    const hasLowerCase = /[a-z]/.test(senha);
    const hasNumber = /[0-9]/.test(senha);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    return senha.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const alterarDados = (e) => {
    const { name, value } = e.target;
    setDadosCadastro((prevState) => {
      const novoEstado = { ...prevState, [name]: value };

      if (name === 'senha') {
        const tamanho = value.length >= 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const numero = /[0-9]/.test(value);
        const special = /[^A-Za-z0-9]/.test(value);
        setSenhaValida({ tamanho, hasUpperCase, hasLowerCase, numero, special });
      }

      return novoEstado;
    });
  };

  const alterarDadosEndereco = (e) => {
    const { name, value } = e.target;
    setDadosEndereco((prevState) => ({ ...prevState, [name]: value }));
  };

  const validarDocumento = (tipo, documento) => {
    if (tipo === 'pessoaComum') {
      return cpf.isValid(documento);
    } else if (tipo === 'departamento') {
      return cnpj.isValid(documento);
    } else if (tipo === 'veterinaria') {
      return /^\d{6}$/.test(documento);
    }
    return false;
  };

  const submeter = async (e) => {
    e.preventDefault();

    if (!dadosCadastro.email || !dadosCadastro.senha || !dadosCadastro.nome || !dadosCadastro.telefone || !dadosCadastro.documento) {
      alert('Todos os campos de cadastro são obrigatórios.');
      return;
    }

    if (!dadosEndereco.cep || !dadosEndereco.logradouro || !dadosEndereco.bairro ||
      !dadosEndereco.uf || !dadosEndereco.pais || !dadosEndereco.numero || !dadosEndereco.localidade) {
      alert('Todos os campos de endereço são obrigatórios.');
      return;
    }

    if (!validarDocumento(tipoCadastro, dadosCadastro.documento)) {
      alert('Documento inválido');
      return;
    } else if (!validarSenha(dadosCadastro.senha)) {
      alert('A senha deve ter no mínimo 8 caracteres, incluir uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
      return;
    }

    try {
      const dados = {
        ...dadosCadastro,
        tipousuarioid: tipoCadastro === 'pessoaComum' ? 1 : tipoCadastro === 'veterinaria' ? 2 : 3,
        endereco: {
          cep: dadosEndereco.cep,
          logradouro: dadosEndereco.logradouro,
          bairro: dadosEndereco.bairro,
          uf: dadosEndereco.uf,
          pais: dadosEndereco.pais,
          complemento: dadosEndereco.complemento,
          numero: dadosEndereco.numero,
          cidade: dadosEndereco.localidade
        }
      };

      const response = await registerService.registerUser(JSON.stringify(dados));

      if (response.error === false) {
        alert('Usuário cadastrado com sucesso!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }

    } catch (error) {
      alert(error.message || 'Erro ao registrar usuário');
    }
  };

  const consultarCEP = async (e) => {
    try {
      const response = await registerService.consultaCep(dadosEndereco.cep);

      if (response.error === false) {
        const { logradouro, localidade, bairro, uf, pais, complemento, numero } = response.data;
        setDadosEndereco(prevState => ({
          ...prevState,
          logradouro,
          localidade,
          bairro,
          uf,
          pais,
          complemento,
          numero
        }));
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    setDadosCadastro((prevState) => ({
      ...prevState,
      documento: ''
    }));
  }, [tipoCadastro]);

  useEffect(() => {
    const tamanho = dadosCadastro.senha.length >= 8;
    const hasUpperCase = /[A-Z]/.test(dadosCadastro.senha);
    const hasLowerCase = /[a-z]/.test(dadosCadastro.senha);
    const numero = /[0-9]/.test(dadosCadastro.senha);
    const special = /[^A-Za-z0-9]/.test(dadosCadastro.senha);
    setSenhaValida({ tamanho, hasUpperCase, hasLowerCase, numero, special });
  }, [dadosCadastro.senha]);

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerContent}>
        <div className={styles.logoSection}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h2 className={styles.registerTitle}>Cadastro</h2>
          <p className={styles.subTitle}>Crie sua conta para acessar o Betterlife</p>
        </div>
        <div className={styles.formSection}>
          <Paper className={styles.paper}>
            <h2 className={styles.title}>Dados Pessoais</h2>
            <form onSubmit={submeter} className={styles.registerForm}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="nome"
                    label="Nome do usuário *"
                    value={dadosCadastro.nome}
                    onChange={alterarDados}
                    fullWidth
                    id="nome"
                    InputProps={{
                      style: { height: '56px', padding: '0px 0px' } // Ajustando a altura e o padding
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="documento"
                    label={tipoCadastro === 'pessoaComum' ? 'CPF *' : tipoCadastro === 'veterinaria' ? 'Número do Registro de Medicina Veterinária *' : 'CNPJ *'}
                    value={dadosCadastro.documento}
                    onChange={alterarDados}
                    fullWidth
                    id="documento"
                    InputProps={{
                      style: { height: '56px', padding: '0px 0px' } // Ajustando a altura e o padding
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="telefone"
                    label="Número do telefone com DDD *"
                    value={dadosCadastro.telefone}
                    onChange={alterarDados}
                    fullWidth
                    id="telefone"
                    InputProps={{
                      style: { height: '56px', padding: '0px 0px' } // Ajustando a altura e o padding
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="email"
                    name="email"
                    label="E-mail *"
                    value={dadosCadastro.email}
                    onChange={alterarDados}
                    fullWidth
                    id="email"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="password"
                    name="senha"
                    label="Senha *"
                    value={dadosCadastro.senha}
                    onChange={alterarDados}
                    fullWidth
                    id="senha"
                  />
                  <div className={styles.passwordTooltip}>
                    <div className={styles.passwordCriteria}>Mínimo de 8 caracteres: {senhaValida.tamanho ? "✔️" : "❌"}</div>
                    <div className={styles.passwordCriteria}>Letra maiúscula: {senhaValida.hasUpperCase ? "✔️" : "❌"}</div>
                    <div className={styles.passwordCriteria}>Letra minúscula: {senhaValida.hasLowerCase ? "✔️" : "❌"}</div>
                    <div className={styles.passwordCriteria}>Número: {senhaValida.numero ? "✔️" : "❌"}</div>
                    <div className={styles.passwordCriteria}>Caractere especial: {senhaValida.special ? "✔️" : "❌"}</div>
                  </div>
                </Grid>
              </Grid>

              <h2 className={styles.title}>Endereço</h2>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="cep"
                    label="CEP *"
                    value={dadosEndereco.cep}
                    onBlur={consultarCEP}
                    onChange={alterarDadosEndereco}
                    fullWidth
                    id="cep"
                    InputProps={{
                      style: { height: '56px', padding: '0px 0px' } // Ajustando a altura e o padding
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="localidade"
                    label="Cidade *"
                    value={dadosEndereco.localidade}
                    onChange={alterarDadosEndereco}
                    fullWidth
                    id="localidade"
                    InputProps={{
                      style: { height: '56px', padding: '0px 0px' } // Mantendo o mesmo estilo para garantir consistência
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="logradouro"
                    label="Logradouro *"
                    value={dadosEndereco.logradouro}
                    onChange={alterarDadosEndereco}
                    fullWidth
                    id="logradouro"
                    InputProps={{
                      style: { height: '56px', padding: '0px 0px' } // Ajustando a altura e o padding
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="bairro"
                    label="Bairro *"
                    value={dadosEndereco.bairro}
                    onChange={alterarDadosEndereco}
                    fullWidth
                    id="bairro"
                    InputProps={{
                      style: { height: '56px', padding: '0px 0px' } // Ajustando a altura e o padding
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="uf"
                    label="UF *"
                    value={dadosEndereco.uf}
                    onChange={alterarDadosEndereco}
                    fullWidth
                    id="uf"
                    InputProps={{
                      style: { height: '56px', padding: '0px 0px' } // Ajustando a altura e o padding
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="pais"
                    label="País *"
                    value={dadosEndereco.pais}
                    onChange={alterarDadosEndereco}
                    fullWidth
                    id="pais"
                    InputProps={{
                      style: { height: '56px', padding: '0px 0px' } // Ajustando a altura e o padding
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="complemento"
                    label="Complemento"
                    value={dadosEndereco.complemento}
                    onChange={alterarDadosEndereco}
                    fullWidth
                    id="complemento"
                    InputProps={{
                      style: { height: '56px', padding: '0px 0px' } // Ajustando a altura e o padding
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    type="number"
                    name="numero"
                    label="Número *"
                    value={dadosEndereco.numero}
                    onChange={alterarDadosEndereco}
                    fullWidth
                    id="numero"
                  />
                </Grid>
              </Grid>

              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submitButton}>Cadastre-se</button>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Register;
