import React from 'react';
import Styles from './UserComponent.module.css';
import { useNavigate } from 'react-router-dom';
import { Paper, Grid, Button, Typography } from '@material-ui/core';

function UserComponent() {
  const navigate = useNavigate();

  const AnimaisPage = () => navigate('/animais');
  const Forum = () => navigate('/RegisterPostForum');
  const meusPosts = () => navigate('/meusPosts');

  return (
    <>
      <Paper className={Styles.paper}>
        <Typography variant="h4" className={Styles.title}>Painel do Usuario</Typography>
        <Grid container spacing={3} className={Styles.gridContainer}>          
          <Grid item xs={12} md={4}>
            <Button className={Styles.vetButton} onClick={AnimaisPage}>
              Animais
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button className={Styles.vetButton} onClick={Forum}>
              Criar Post
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button className={Styles.vetButton} onClick={meusPosts}>
              Meus Posts
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default UserComponent;
