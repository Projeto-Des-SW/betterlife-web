import React, { useState } from 'react';
import Styles from '../PerfilUsuario/PerfilUsuario.module.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import {
  TextField, Grid, Paper, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText
} from '@material-ui/core';
import usuarioService from '../../Services/Usuario/Usuario-service';
import dadosUserLogadoService from '../../Services/DadosUserLogado/DadosUserLogado-service';
import IconButton from '@material-ui/core/IconButton';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    email: dadosUserLogadoService.getUserInfo().email,
    nome: dadosUserLogadoService.getUserInfo().nome,
    documento: dadosUserLogadoService.getUserInfo().documento,
    telefone: dadosUserLogadoService.getUserInfo().telefone,
    cep: dadosUserLogadoService.getUserInfo().cep,
    cidade: dadosUserLogadoService.getUserInfo().cidade,
    bairro: dadosUserLogadoService.getUserInfo().bairro,
    uf: dadosUserLogadoService.getUserInfo().uf,
    pais: dadosUserLogadoService.getUserInfo().pais,
    complemento: dadosUserLogadoService.getUserInfo().complemento,
    numero: dadosUserLogadoService.getUserInfo().numero,
  });
  const navigate = useNavigate();
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [password, setPassword] = useState('');

  const alterarDados = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const editarDados = async (e) => {
    e.preventDefault();
    try {
      const response = await usuarioService.updateUser(JSON.stringify(formData), dadosUserLogadoService.getUserInfo().id);

      if (response.error === false) {
        alert('Usuário editado com sucesso!');
        await localStorage.setItem('userInfo', JSON.stringify(response.data));
        window.location.reload();
      }

    } catch (error) {
      alert(error.message || 'Erro ao editar usuário');
    }
  };

  const confirmarDelecao = async () => {
    if (password !== '') {
      try {
        const response = await usuarioService.deleteUser(dadosUserLogadoService.getUserInfo().id, password);

        if (response.error === false) {
          alert('Usuário deletado com sucesso!');
          dadosUserLogadoService.logOut();
          navigate('/login');
        } else {
          alert('Senha incorreta - Usuário não deletado')
        }
      } catch (error) {
        alert(error.message || 'Erro ao deletar usuário');
      } finally {
        setShowConfirmPopup(false);
        setPassword('');
      }
    } else {
      alert("Informe sua senha para prosseguir.")
    }
  };

  const handleBack = () => {
    navigate('/telaPrincipal');
  };

  return (
    <div className={Styles.UserProfileContainer}>
      <Header />

      <Dialog
        aria-labelledby="customized-dialog-title"
        open={showConfirmPopup}
        onClose={() => setShowConfirmPopup(false)}
        style={{ marginTop: 35, marginBottom: 10 }}
        disableBackdropClick
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Grid container alignItems="center">
            <Grid item xs={10} sm={11}>
              Confirmação de Senha
            </Grid>
            <Grid item xs={2} sm={1}>
              <IconButton onClick={() => setShowConfirmPopup(false)}>
                x
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <Grid item xs={12} sm={12}>
            <Grid item xs={12} sm={12}>
              <DialogContentText>
                Informe sua senha:
              </DialogContentText>
              <TextField
                id="password"
                label={<span>Senha <span style={{ color: 'red' }}> *</span></span>}
                type="password"
                placeholder='Senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions style={{ justifyContent: 'space-around' }}>
          <button type="button" className={Styles.BackButton} onClick={() => setShowConfirmPopup(false)}>Cancelar</button>
          <button type="button" className={Styles.BackButton} onClick={confirmarDelecao}>Confirmar</button>
        </DialogActions>
      </Dialog>

      <Paper className={Styles.paper}>
        <h2 className={Styles.title}>Perfil do Usuário</h2>
        <h4 className={Styles.title}>Dados Pessoais</h4>
        <form onSubmit={editarDados}>
          <div className={Styles.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="email"
                  name="email"
                  label={
                    <span>
                      E-mail <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  value={formData.email}
                  onChange={alterarDados}
                  fullWidth
                  id="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="nome"
                  name="nome"
                  label={
                    <span>
                      Nome <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  value={formData.nome}
                  onChange={alterarDados}
                  fullWidth
                  id="nome"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="documento"
                  name="documento"
                  label={
                    <span>
                      Documento <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  value={formData.documento}
                  onChange={alterarDados}
                  fullWidth
                  id="documento"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="telefone"
                  name="telefone"
                  label={
                    <span>
                      Telefone <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  value={formData.telefone}
                  onChange={alterarDados}
                  fullWidth
                  id="telefone"
                />
              </Grid>

              <Grid item xs={12}>
                <h4 className={Styles.title} style={{ textAlign: 'center' }}>Endereço</h4>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="text"
                  name="cep"
                  label={
                    <span>
                      CEP <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  value={formData.cep}
                  onChange={alterarDados}
                  fullWidth
                  id="cep"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="text"
                  name="bairro"
                  label={
                    <span>
                      Bairro <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  value={formData.bairro}
                  onChange={alterarDados}
                  fullWidth
                  id="bairro"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="text"
                  name="cidade"
                  label={
                    <span>
                      Cidade <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  value={formData.cidade}
                  onChange={alterarDados}
                  fullWidth
                  id="cidade"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="text"
                  name="uf"
                  label={
                    <span>
                      UF <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  value={formData.uf}
                  onChange={alterarDados}
                  fullWidth
                  id="uf"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="text"
                  name="pais"
                  label={
                    <span>
                      País <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  value={formData.pais}
                  onChange={alterarDados}
                  fullWidth
                  id="pais"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="text"
                  name="numero"
                  label={
                    <span>
                      Número <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  value={formData.numero}
                  onChange={alterarDados}
                  fullWidth
                  id="numero"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="text"
                  name="complemento"
                  label={
                    <span>
                      Complemento
                    </span>
                  }
                  value={formData.complemento}
                  onChange={alterarDados}
                  fullWidth
                  id="complemento"
                />
              </Grid>
            </Grid>
          </div>
          <div className={Styles.buttonContainer}>
            <button type="button" className={Styles.BackButton} onClick={() => setShowConfirmPopup(true)}>Deletar Conta</button>
            <button type="submit" className={Styles.SaveButton}>Salvar</button>
            <button type="button" className={Styles.BackButton} onClick={handleBack}>Voltar</button>
          </div>
        </form>
      </Paper>

    </div>
  );
}

export default UserProfile;
