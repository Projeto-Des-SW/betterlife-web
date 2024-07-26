import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from "./RedefinirSenha.module.css";
import logo from "../../Assets/logo.png";

const RedefinirSenha = () => {
  const [senhaValida, setSenhaValida] = useState({
    tamanho: false,
    hasUpperCase: false,
    hasLowerCase: false,
    numero: false,
    special: false,
  });

  const criarNovaSenha = async (e) => {
    e.preventDefault();
    // Lógica de redefinição de senha
  };

  const [novaSenha, setNovaSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [token, setToken] = useState('');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [location.search]);

  useEffect(() => {
    const tamanho = novaSenha.length >= 8;
    const hasUpperCase = /[A-Z]/.test(novaSenha);
    const hasLowerCase = /[a-z]/.test(novaSenha);
    const numero = /[0-9]/.test(novaSenha);
    const special = /[^A-Za-z0-9]/.test(novaSenha);
    setSenhaValida({ tamanho, hasUpperCase, hasLowerCase, numero, special });
  }, [novaSenha]);

  return (
    <div className={styles.forgotPasswordContainer}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <h2>Recuperar Senha</h2>
      <form onSubmit={criarNovaSenha} className={styles.forgotPasswordForm}>
        <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="novasenha">Nova Senha</label>
          <input
            type="password"
            id="novaSenha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
            className={styles.formField}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="repetirsenha">Repetir Nova Senha</label>
          <input
            type="password"
            id="repetirSenha"
            value={repetirSenha}
            onChange={(e) => setRepetirSenha(e.target.value)}
            required
            className={styles.formField}
          />
        </div>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <div className={styles.passwordCriteria}>Mínimo de 8 caracteres: {senhaValida.tamanho ? "✔️" : "❌"}</div>
          <div className={styles.passwordCriteria}>Letra maiúscula: {senhaValida.hasUpperCase ? "✔️" : "❌"}</div>
          <div className={styles.passwordCriteria}>Letra minúscula: {senhaValida.hasLowerCase ? "✔️" : "❌"}</div>
          <div className={styles.passwordCriteria}>Número: {senhaValida.numero ? "✔️" : "❌"}</div>
          <div className={styles.passwordCriteria}>Caractere especial: {senhaValida.special ? "✔️" : "❌"}</div>
        </div>
        <button type="submit" className={styles.submitButton}>
          Redefinir Senha
        </button>
      </form>
      <p className={styles.backToLogin}>
      </p>
    </div>
  );
};

export default RedefinirSenha;
