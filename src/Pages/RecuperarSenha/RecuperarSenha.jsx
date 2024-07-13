import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./RecuperarSenha.module.css";
import logo from "../../Assets/logo.png";

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');

  const preencherDados = (e) => {
    setEmail(e.target.value);
  };

  const submeter = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <h2>Recuperar Senha</h2>
      <form onSubmit={submeter} className={styles.forgotPasswordForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={preencherDados}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Enviar</button>
      </form>
      <p className={styles.backToLogin}>
        Lembrou sua senha? <Link to="/login">Voltar para o login</Link>
      </p>
    </div>
  );
};

export default RecuperarSenha;