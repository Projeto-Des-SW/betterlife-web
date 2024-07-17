import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "./Register.module.css";
import logo from "../../Assets/logo.png";
import { cpf, cnpj } from 'cpf-cnpj-validator';

const Register = () => {
  const [tipoCadastro, setTipoCadastro] = useState('pessoaComum');
  const [dadosCadastro, setDadosCadastro] = useState({
    email: '',
    senha: '',
    confirmacaoSenha: '',
    nome: '',
    cpf: '',
    telefone: '',
    documento: '',
    cnpj: ''
  });

  const alterarDados = (e) => {
    const { name, value } = e.target;
    setDadosCadastro({
      ...dadosCadastro,
      [name]: value
    });
  };

  const submeter = (e) => {
    e.preventDefault();
    if(dadosCadastro.senha !== dadosCadastro.confirmacaoSenha){
      alert('Senhas diferentes');
    } else if(tipoCadastro === 'pessoaComum' && !cpf.isValid(dadosCadastro.cpf)) {
      alert('CPF inválido');
    } else if(tipoCadastro === 'departamento' && !cnpj.isValid(dadosCadastro.cnpj)) {
      alert('CNPJ inválido');
    } else {
      console.log(dadosCadastro);
    }    
  };

  useEffect(() => {
    setDadosCadastro(prevState => ({
      ...prevState,
      cpf: '',
      documento: '',
      cnpj: ''
    }));
  }, [tipoCadastro]);

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerHeader}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2>Cadastro</h2>
      </div>
      <p className={styles.userTypePrompt}>Selecione seu tipo de usuário</p>
      <div className={styles.tabs}>
        <button
          className={tipoCadastro === 'pessoaComum' ? styles.activeTab : ''}
          onClick={() => setTipoCadastro('pessoaComum')}
        >
          Pessoa Comum
        </button>
        <button
          className={tipoCadastro === 'veterinaria' ? styles.activeTab : ''}
          onClick={() => setTipoCadastro('veterinaria')}
        >
          Veterinária
        </button>
        <button
          className={tipoCadastro === 'departamento' ? styles.activeTab : ''}
          onClick={() => setTipoCadastro('departamento')}
        >
          Departamento
        </button>
      </div>
      <form onSubmit={submeter} className={styles.registerForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={dadosCadastro.email}
            onChange={alterarDados}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={dadosCadastro.senha}
            onChange={alterarDados}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmacaoSenha">Confirmação da senha:</label>
          <input
            type="password"
            id="confirmacaoSenha"
            name="confirmacaoSenha"
            value={dadosCadastro.confirmacaoSenha}
            onChange={alterarDados}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome do usuário:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={dadosCadastro.nome}
            onChange={alterarDados}
            required
          />
        </div>
        {tipoCadastro === 'pessoaComum' && (
          <div className={styles.formGroup}>
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={dadosCadastro.cpf}
              onChange={alterarDados}
              required
            />
          </div>
        )}
        {tipoCadastro === 'veterinaria' && (
          <div className={styles.formGroup}>
            <label htmlFor="documento">Número do Documento:</label>
            <input
              type="text"
              id="documento"
              name="documento"
              value={dadosCadastro.documento}
              onChange={alterarDados}
              required
            />
          </div>
        )}
        {tipoCadastro === 'departamento' && (
          <div className={styles.formGroup}>
            <label htmlFor="cnpj">CNPJ:</label>
            <input
              type="text"
              id="cnpj"
              name="cnpj"
              value={dadosCadastro.cnpj}
              onChange={alterarDados}
              required
            />
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="telefone">Número do telefone com DDD:</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={dadosCadastro.telefone}
            onChange={alterarDados}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Cadastre-se</button>
      </form>
      <p className={styles.backToLogin}>
        Já tem uma conta? <Link to="/login">Voltar para o login</Link>
      </p>
    </div>
  );
};

export default Register;
