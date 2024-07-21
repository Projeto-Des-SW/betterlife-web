import React, { useContext } from 'react';
import Styles from './TelaPrincipal.module.css'
import { UserContext } from '../../Contexts/UserContext';

function TelaPrincipal() {
  const { user } = useContext(UserContext);
  return (
    <div className={Styles.TelaPrincipalContainer}>
      <h1>Bem Vindo</h1>
      <div>
        <p>Email: {user.email}</p>
        <p>Nome: {user.nome}</p>
        <p>Documento: {user.documento}</p>
        <p>Telefone: {user.telefone}</p>
        <p>Tipo de Usuário: {user.tipousuarioid}</p>
      </div>
    </div>
  )
}

export default TelaPrincipal