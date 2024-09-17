import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./Login.module.css";
import logo from "../../Assets/logo2.png"; // Atualize para o caminho correto do seu logo
import GoogleIcon from '@mui/icons-material/Google';
import { loginUser } from '../../Services/Login/Login-service';

const Login = () => {
  const navigate = useNavigate();

  const [dadosLogin, setDadosLogin] = useState({
    email: '',
    senha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosLogin({
      ...dadosLogin,
      [name]: value
    });
  };

  const realizarLogin = async (e) => {
    e.preventDefault();

    const response = await loginUser(JSON.stringify(dadosLogin));

    if (response.error === false) {
      await localStorage.setItem('userInfo', JSON.stringify(response.data));
      setTimeout(() => {
        navigate('/telaPrincipal');
      }, 1000);
    } else {
      alert(response.data.error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <div className={styles.logoSection}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h2 className={styles.loginTitle}>Fazer login</h2>
          <p className={styles.subTitle}>Ir para o Betterlife</p>
        </div>
        <div className={styles.formSection}>
          <form onSubmit={realizarLogin} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
                value={dadosLogin.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Senha"
                value={dadosLogin.senha}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.forgotPassword}>
              <Link to="/recuperarSenha">Esqueci minha senha</Link>
            </div>
            <button type="button" className={styles.googleButton}>
              <GoogleIcon className={styles.googleIcon} />
              Entre com o Google
            </button>
            <div className={styles.actionButtons}>
              <Link to="/register" className={styles.registerButton}>Criar conta</Link>
              <button type="submit" className={styles.submitButton}>Entrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
