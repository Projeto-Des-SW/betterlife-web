import React from 'react';
import Styles from './UserComponent.module.css';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@material-ui/core';

function UserComponent() {
  const navigate = useNavigate();

  const AnimaisPage = () => navigate('/animais');
  const Forum = () => navigate('/RegisterPostForum');
  const meusPosts = () => navigate('/meusPosts');
  const Comunidades = () => navigate('/comunidades');

  return (
    <>
      <Paper className={Styles.paper}>
        <div className={Styles.buttonContainer}>
          <div className={Styles.buttonGroup}>
            <button type="button" className={Styles.UserButton} onClick={AnimaisPage}>Animais</button>
            <button type="button" className={Styles.UserButton} onClick={Forum}>Criar Post</button>
          </div>
          <div className={Styles.buttonGroup}>
            <button type="button" className={Styles.UserButton} onClick={meusPosts}>Meus Posts</button>
            <button type="button" className={Styles.UserButton} onClick={Comunidades}>Comunidades</button>
          </div>
        </div>
      </Paper>
    </>
  );
}

export default UserComponent;
