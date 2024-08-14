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

  return (
    <>
      <Paper className={Styles.paper}>
        <div className={Styles.buttonContainer}>
          <button type="button" className={Styles.TaxonomiaButton} onClick={() => TaxonomiaPage()}>Taxonomia</button>
        </div>
      </Paper>
    </>
  )
}

export default VeterinariaComponent;