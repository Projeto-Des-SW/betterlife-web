import React, { useState, useEffect } from 'react';
import Styles from './RegisterPostForum.module.css';
import Header from '../Header/Header';
import dadosUserLogadoService from '../../Services/DadosUserLogado/DadosUserLogado-service';
import forumService from '../../Services/Forum/Forum-service';
import { useNavigate } from 'react-router-dom';

const RegisterPostForum = () => {
    const navigate = useNavigate();
    const [usuarioIdPergunta, setUsuarioIdPergunta] = useState('');
    const [pergunta, setPergunta] = useState('');
    const [categoriaForumId, setCategoriaForumId] = useState('1'); // Valor inicial pode ser o ID de uma categoria padrão

    useEffect(() => {
        const userId = dadosUserLogadoService.getUserInfo().id;
        setUsuarioIdPergunta(userId);
    }, []);

    const submeter = async (e) => {
        e.preventDefault();
        if(!pergunta || !categoriaForumId){
            alert('Todos os campos do post são obrigatórios.');
            return;
        }
        try{            
            const post = { 
                usuarioidpergunta: usuarioIdPergunta,
                pergunta: pergunta,
                categoriaforumid: categoriaForumId };
            const response = await forumService.registerPost(JSON.stringify(post));
            console.log(response.error)
            if (response.error === false) {
                alert('Post enviado');
                setTimeout(() => {
                    navigate('/telaPrincipal'); //Mudar a rota para a rota do post que acabou de ser enviado
                }, 2000); 
                setUsuarioIdPergunta('');
                setPergunta('');
                setCategoriaForumId('1'); 
            }

        } catch (error) {
            alert(error.message || 'Erro ao realizar post no forum');
        }    
    };

  return (
    <>
    <Header />
    <div className={Styles.ConteudoContainer}>
            <h1>Criar Post</h1>
            <form onSubmit={submeter}>                
                <div className={Styles.formGroup}>
                    <label htmlFor="pergunta">Pergunta:</label>
                    <textarea 
                        id="pergunta" 
                        rows="5" 
                        value={pergunta} 
                        onChange={(e) => setPergunta(e.target.value)} 
                        required 
                    />
                </div>
                
                <div className={Styles.formGroup}>
                    <label htmlFor="categoriaForumId">Categoria:</label>
                    <select 
                        id="categoriaForumId" 
                        value={categoriaForumId} 
                        onChange={(e) => setCategoriaForumId(e.target.value)} 
                        required
                    >
                        <option value="1">Discussão</option>
                        <option value="2">Dúvida</option>
                        <option value="3">Compartilhamento</option>
                    </select>
                </div>
                <button type="submit" className={Styles.PostButton}>Publicar</button>
            </form>
        </div>
    </>
  )
}

export default RegisterPostForum