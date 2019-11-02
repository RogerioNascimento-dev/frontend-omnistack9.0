import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './style.css';
export default function Dashboard(){
  const [spots, setSpots] = useState([]);

  useEffect(() =>{
    async function carregarSpots(){
      const user_id = localStorage.getItem('user');
      const returno = await api.get('/dashboard',{
        headers: {user_id}
      });   
      
      setSpots(returno.data);
    }
    carregarSpots();
  },[]);

  return (
    <>
    <p className="user-logado">{localStorage.getItem('nome_user') ? `Olá, ${localStorage.getItem('nome_user')}`:''}</p>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{backgroundImage: `url(${spot.imagem_url})`}}/>
            <strong>{spot.empresa}</strong>
            <span>{spot.valor ? `R$${spot.valor}/dia`:'Gratuito'}</span>
          </li>
        ))}
      </ul>

      <Link to="/novo">
        <button className="btn">
        Cadastrar novo spot
        </button>
        </Link>
    </>
  )}