import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';


import './style.css';


export default function Dashboard({ history }){
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333',{
      query:{user_id}
    }),[user_id]);

  useEffect(() =>{
    socket.on('booking_request', data =>{           
      setRequests([...requests, data]);           
    })
  },[requests, socket])

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

  async function handleAccept(id){
    await api.post(`/bookings/${id}/approvals`);
    //removendo a exibição da requisição através do filtro 
    setRequests(requests.filter(request => request._id !== id));
  }

  async function handleReject(id){
    await api.post(`/bookings/${id}/rejections`);
    setRequests(requests.filter(request => request._id !== id));
  }

  async function handleLogout(){
    await localStorage.clear();
    history.push('/');
  }
  return (
    <>
    <button onClick={() => handleLogout()} className="user-logado">Olá, {localStorage.getItem('email') ? `${localStorage.getItem('email')}`:'Visitante'}</button>
      
      <ul className="notificacoes">
        {requests.map(request =>(
          <li key={request._id}>
            <p><strong>{request.user.email}</strong>, está solicitando uma 
            reserva em <strong>{request.spot.empresa}</strong> para a data <strong>{request.data}</strong>.</p>
            <button className="btn-aceitar"   onClick={() => handleAccept(request._id)} >Aceitar</button>
            <button className="btn-regeitar"  onClick={() => handleReject(request._id)} >Rejeitar</button>
          </li>
        ))}
        

      </ul>
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