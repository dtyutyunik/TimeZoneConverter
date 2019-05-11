import React from 'react';
import './index.css';

export default function Clients(props){

  return(
    <div className='clients'>

    clients
    {props.clients.map((index)=>{
  return (
    <div className='clientList'>
      <p>Name: {index.name}</p>
      <p>Country: {index.country}</p>
      <p>Notes: {index.notes}</p>
      <p>Email: {index.email}</p>
      <p>PhoneNumber: {index.phoneNumber}</p>
      <p>Time: {index.otherTime}</p>
    </div>)
  })}


  </div>)
}
