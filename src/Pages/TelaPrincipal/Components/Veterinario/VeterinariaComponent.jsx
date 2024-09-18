import React from 'react';
import Styles from './VeterinariaComponent.module.css';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@material-ui/core';

function VeterinariaComponent() {
  const navigate = useNavigate();

  const TaxonomiaPage = () => navigate('/taxonomia');
  const AnimalPage = () => navigate('/registerAnimal');
  const AnimaisPage = () => navigate('/animais');
  const CategoriaForumPage = () => navigate('/categoriaForum');
  const Forum = () => navigate('/RegisterPostForum');
  const meusPosts = () => navigate('/meusPosts');
  const minhasComunidade = () => navigate('/minhasComunidades');
  const Comunidades = () => navigate('/comunidades');

  return (
    <>
      <Paper className={Styles.paper}>
        <div className={Styles.buttonContainer}>
          <div className={Styles.buttonGroup}>
            <button type="button" className={Styles.VeterinarioButton} onClick={TaxonomiaPage}>Taxonomia</button>
            <button type="button" className={Styles.VeterinarioButton} onClick={AnimaisPage}>Animais</button>
            <button type="button" className={Styles.VeterinarioButton} onClick={AnimalPage}>Cadastrar Animal</button>
          </div>
          <div className={Styles.buttonGroup}>
            <button type="button" className={Styles.VeterinarioButton} onClick={Forum}>Criar Post</button>
            <button type="button" className={Styles.VeterinarioButton} onClick={CategoriaForumPage}>Cadastrar Categoria de fórum</button>
          </div>
          <div className={Styles.buttonGroup}>
            <button type="button" className={Styles.VeterinarioButton} onClick={meusPosts}>Meus Posts</button>
            <button type="button" className={Styles.VeterinarioButton} onClick={minhasComunidade}>Minhas Comunidades</button>
            <button type="button" className={Styles.VeterinarioButton} onClick={Comunidades}>Comunidades</button>
          </div>
        </div>
      </Paper>
    </>
  );
}

export default VeterinariaComponent;
