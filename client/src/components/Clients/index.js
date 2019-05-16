import React from 'react';
import './index.css';

export default function Clients(props){

  return(
    <div className='clients'>

    <h1 style={{textAlign:'center'}}>Contact List</h1>
    {props.clients.map((item, index)=>{
  return (
    <div className='clientList'>
      <p>Name: {item.name}</p>
      <p>Country: {item.country}</p>
      <p>Notes: {item.notes}</p>
      <button onClick={()=>props.updateNotes(item,index)}>Update notes</button>
      <p>Email: {item.email}</p>
      <p>PhoneNumber: {item.phoneNumber}</p>
      <p>Time: {item.otherTime}</p>
      <button onClick={()=>props.removeClient(index)}className='removeClient'>Remove Client</button>
    </div>)
  })}


  </div>)
}
