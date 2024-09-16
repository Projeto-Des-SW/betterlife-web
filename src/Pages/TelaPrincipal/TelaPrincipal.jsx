import React from 'react';
import Styles from './TelaPrincipal.module.css';
import UserComponent from './Components/Usuario/UserComponent';
import VeterinariaComponent from './Components/Veterinario/VeterinariaComponent';
import DepartamentoComponent from './Components/Departamento/DepartamentoComponent';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import dadosUserLogadoService from '../../Services/DadosUserLogado/DadosUserLogado-service';

function TelaPrincipal() {
  const renderContent = () => {
    const userType = dadosUserLogadoService.getUserInfo().tipousuario;
    switch (userType) {
      case 'Usuário Comum':
        return <UserComponent />;
      case 'Veterinário':
        return <VeterinariaComponent />;
      case 'Departamento':
        return <DepartamentoComponent />;
      default:
        return <div>Bem-vindo ao sistema, estamos processando seu acesso...</div>;
    }
  };
  
  return (
    <>
      <Header />
      <div className={Styles.ConteudoContainer}>
        <h1>Bem Vindo</h1>
        {renderContent()}
      </div>
      <Footer />
    </>
  );
}

export default TelaPrincipal;
