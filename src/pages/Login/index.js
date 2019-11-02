import React,{ useState } from 'react';
import api from '../../services/api';

export default function Login({ history }){
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');  

  async function handleSubmit(event){
    event.preventDefault();
    
    const response = await api.post('/sessions',{ nome, email });
    const { _id } = response.data;    
    const  nome_usuario = response.data.nome;

    
    localStorage.setItem('user', _id);
    localStorage.setItem('nome_user', nome_usuario);
    history.push('/dashboard');
  }
  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores 
        e encontre <strong>talentos</strong> para sua empresa.
      </p>
      <form onSubmit={handleSubmit}>
      <label htmlFor="nome">Nome</label>
      <input
      id="nome"
      type="text"
      placeholder="Como deseja ser chamado ?"
      value={nome}
      onChange={event => setNome(event.target.value)}
      />

        <label htmlFor="email">E-mail *</label>
        <input 
        id="email" 
        type="email"         
        placeholder="Seu melhor e-mail"
        value={email}
        onChange={event => setEmail(event.target.value)}
        />
        
        <button type="submit" className="btn">Cadastrar</button>
      </form>
      </>
  )}