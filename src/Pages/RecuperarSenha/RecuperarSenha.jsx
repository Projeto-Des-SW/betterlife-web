import React, { useState } from 'react';
import styles from "./RecuperarSenha.module.css";
import logo from "../../Assets/logo2.png";
import RecuperarSenhaService from '../../Services/RecuperarSenha/RecuperarSenha-service';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const preencherDados = (e) => {
    const { value } = e.target;
    setEmail(value);

    if (!validarEmail(value)) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }
  };

  const enviarSolicitacao = async (e) => {
    e.preventDefault();
    if (emailError) {
      alert(emailError);
      return;
    }
    
    const dados = { email };

    try {
      const response = await RecuperarSenhaService.sendEmailReset(JSON.stringify(dados));
      if (response.error === false) {
        alert("Email de recuperação enviado!");
      } else {
        alert("Erro na conexão, por favor tente mais tarde");
      }
    } catch (error) {
      alert("Erro inesperado, tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logoTitleSection}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <div>
            <h2 className={styles.title}>Esqueceu a senha?</h2>
            <p className={styles.subTitle}>Digite seu e-mail para recuperar sua conta</p>
          </div>
        </div>
        <form onSubmit={enviarSolicitacao} className={styles.form}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={preencherDados}
            className={styles.inputField}
            required
          />
          {emailError && <span className={styles.error}>{emailError}</span>}
          <button type="submit" className={styles.submitButton}>Avançar</button>
        </form>
      </div>
    </div>
  );
};

export default RecuperarSenha;
