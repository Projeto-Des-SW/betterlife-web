import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';  // Corrected import
import styles from "./Login.module.css";
import logo from "../../Assets/logo.png";
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

  const loginGoogle = async (credentialResponse) => {
    if (!credentialResponse || !credentialResponse.credential) {
      return;
    }

    const decoded = jwtDecode(credentialResponse.credential);

    const googleLoginData = {
      email: decoded.email,
      nome: decoded.name,
      googleId: decoded.sub,
    };

    const response = await loginUser(JSON.stringify(googleLoginData));

    if (response.error === false) {
      await localStorage.setItem('userInfo', JSON.stringify(response.data));
      navigate('/telaPrincipal');
    } else {
      alert('Erro ao fazer login com Google');
    }
  };

  return (
    <GoogleOAuthProvider clientId="383573379881-dkuvqs4fmjegc811qem20ruus8uil8u4.apps.googleusercontent.com">
      <div className={styles.loginContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2>Login</h2>
        <form onSubmit={realizarLogin} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={dadosLogin.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={dadosLogin.senha}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Entrar</button>
        </form>

        <div className={styles.googleLoginContainer}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              loginGoogle(credentialResponse);
            }}
            onError={(error) => {
              alert('Erro ao autenticar com Google');
            }}
            useOneTap
          />
        </div>

        <p>
          Esqueceu sua senha? <Link to="/recuperarSenha">Recuperar senha</Link>
        </p>
        <p className={styles.registerPrompt}>
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
