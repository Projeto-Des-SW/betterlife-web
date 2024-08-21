import React from 'react';
import Styles from './VeterinariaComponent.module.css';
import { useNavigate } from 'react-router-dom';
import {
  Paper
} from '@material-ui/core';

function VeterinariaComponent() {
  const navigate = useNavigate();

  const TaxonomiaPage = () => {
    navigate('/taxonomia');
  };

  const AnimalPage = () => {
    navigate('/registerAnimal');
  };

  return (
    <>
      <Paper className={Styles.paper}>
        <div className={Styles.buttonContainer}>
          <button type="button" className={Styles.VeterinarioButton} onClick={() => TaxonomiaPage()}>Taxonomia</button>
          <button type="button" className={Styles.VeterinarioButton} onClick={() => AnimalPage()}>Cadastrar Animal</button>
        </div>
      </Paper>
    </>
  )
}

export default VeterinariaComponent;