import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import './styles.css';
import camera from '../../assets/camera.svg';


export default function Novo({history}){
  const [empresa, setEmpresa] = useState('');
  const [valor, setValor] = useState('');
  const [tecnologias, setTecnologias] = useState('');
  const [imagem, setImagem] = useState(null);

  const preview = useMemo(() => {
    return imagem ? URL.createObjectURL(imagem): null;
  },[imagem])


  async function handleSubmit(event){
    event.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem('user');
    data.append('imagem',imagem);
    data.append('empresa',empresa);
    data.append('valor',valor);
    data.append('tecnologias',tecnologias);

    
    await api.post('/spots', data,{
      headers: {user_id}
    });

    history.push('/dashboard');
  }

  return (
    <>
    <p className="user-logado">{localStorage.getItem('nome_user') ? `Olá, ${localStorage.getItem('nome_user')}`:''}</p>
    <form onSubmit={handleSubmit}>
      <label 
      id="imagem"
      style={{backgroundImage: `url(${preview})`}}
      className={imagem ? 'has-imagem':''}
      >
        <input type="file" onChange={event => setImagem(event.target.files[0])}/>
        <img src={camera} alt="Selecione a imagem" />
      </label>
      <label htmlFor="empresa">Empresa *</label>
      <input
      id="empresa"
      placeholder="Nome da empresa"
      value={empresa}
      onChange={event => setEmpresa(event.target.value)}
      />

<label htmlFor="tecnologias">Tecnologias <span>(Separado por vírgula)</span></label>
      <input 
      type="text"
      id="tecnologias"
      placeholder="Quais tecnologias usam?"
      value={tecnologias}
      onChange={event => setTecnologias(event.target.value)}
      />

      <label htmlFor="valor">Valor <span>(Em branco se gratuito)</span></label>
      <input
      type="text"
      id="valor"
      placeholder="Nome da valor"
      value={valor}
      onChange={event => setValor(event.target.value)}
      />

      
  <button type="submit" className="btn">Cadastrar</button>
    </form>
    </>
  )}