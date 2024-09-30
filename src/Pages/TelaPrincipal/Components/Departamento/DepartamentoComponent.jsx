import React from 'react';
import Styles from './DepartamentoComponent.module.css';
import { useNavigate } from 'react-router-dom';
import { Paper, Grid, Button, Typography } from '@material-ui/core';

function DepartamentoComponent() {
  const navigate = useNavigate();

  const TaxonomiaPage = () => navigate('/taxonomia');
  const AnimalPage = () => navigate('/registerAnimal');
  const AnimaisPage = () => navigate('/animais');
  const CategoriaForumPage = () => navigate('/categoriaForum');
  const Forum = () => navigate('/RegisterPostForum');
  const meusPosts = () => navigate('/meusPosts');
  const minhasComunidade = () => navigate('/minhasComunidades');

  return (
    <>
      <Paper className={Styles.paper}>
        <Typography variant="h4" className={Styles.title}>Painel Veterinário</Typography>
        <Grid container spacing={3} className={Styles.gridContainer}>
          <Grid item xs={12} md={4}>
            <Button className={Styles.vetButton} onClick={TaxonomiaPage}>
              Taxonomia
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button className={Styles.vetButton} onClick={AnimaisPage}>
              Animais
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button className={Styles.vetButton} onClick={AnimalPage}>
              Cadastrar Animal
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
          <Grid item xs={12} md={4}>
            <Button className={Styles.vetButton} onClick={CategoriaForumPage}>
            Categorias do fórum
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button className={Styles.vetButton} onClick={minhasComunidade}>
              Minhas Comunidades
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>    
  );
}

export default DepartamentoComponent;
