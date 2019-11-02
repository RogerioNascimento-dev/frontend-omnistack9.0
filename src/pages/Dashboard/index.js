import React, { useEffect } from 'react';
import api from '../../services/api';

export default function Dashboard(){
  useEffect(() =>{
    async function carregarSpots(){
      const user_id = localStorage.getItem('user');
      const returno = await api.get('/dashboard',{
        headers: {user_id}
      });

      console.log(returno);
    }
    carregarSpots();
  },[]);

  return (
    <>
    <h1>Estou no dashboard</h1>
    </>
  )}