import React, { useState, useEffect } from 'react';
import Styles from './Comunidades.module.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import comunidadeService from '../../Services/Comunidade/Comunidade-service';
import dadosUserLogadoService from '../../Services/DadosUserLogado/DadosUserLogado-service';
import Footer from '../Footer/Footer';

function Comunidades() {
    const navigate = useNavigate();
    const [comunidades, setComunidades] = useState([]);
   
    const listarComunidades = async () => {
        try {
            const response = await comunidadeService.listarComunidade();

            if (response.error === false) {
                setComunidades(response.data);
            } else {
                alert(response.message);
            }

        } catch (error) {
            alert(error.message || 'Erro ao listar comunidades');
        }
    };

    const handleBack = () => {
        navigate('/telaPrincipal');
    };

    useEffect(() => {
        listarComunidades();
    }, []);

    return (
        <>
            <Header />

            <div className={Styles.ConteudoContainer}>
                <h1>Comunidades</h1>
                <Paper className={Styles.paper}>
                    <div style={{ marginBottom: '16px', overflowX: 'auto' }}>
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome da Comunidade</TableCell>
                                        <TableCell>Descrição</TableCell>
                                        <TableCell>Responsável</TableCell>
                                        <TableCell>Telefone</TableCell>
                                        <TableCell>Cidade</TableCell>
                                        <TableCell>Endereço</TableCell>
                                        <TableCell>Complemento</TableCell>
                                        <TableCell>Bairro</TableCell>
                                        <TableCell>CEP</TableCell>
                                        <TableCell>País</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {comunidades.map((comunidade, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{comunidade.nome}</TableCell>
                                            <TableCell>{comunidade.descricao}</TableCell>
                                            <TableCell>{comunidade.responsavel}</TableCell>
                                            <TableCell>{comunidade.telefone}</TableCell>
                                            <TableCell>{comunidade.cidade}</TableCell>
                                            <TableCell>{comunidade.logradouro + ', ' + comunidade.numero}</TableCell>
                                            <TableCell>{comunidade.complemento}</TableCell>
                                            <TableCell>{comunidade.bairro}</TableCell>
                                            <TableCell>{comunidade.cep + '/' + comunidade.uf}</TableCell>
                                            <TableCell>{comunidade.pais}</TableCell>
                                        </TableRow> 
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Paper>

                <div className={Styles.buttonContainerVoltar}>
                    <button type="button" className={Styles.CriarTaxonomiaButton} variant="contained" color="default" onClick={handleBack}>Voltar</button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Comunidades;
