import React from 'react';
import './index.css';
import TimeZoneList from '../timeZoneList';

export default function Profile(props){

    return(
      <div className='profile'>
      <h1 style={{textAlign:'center'}}>Add Contact</h1>
      <form onSubmit={props.onSubmit}>

        <div className='inputWithIcon'>
          <input type='text'
            value={props.name}
            placeholder='Name'
            name='name'
            onChange={props.handleProfileChange}
            required

          />
          <ion-icon name="contact"/>
      </div>

        <div className='inputWithIcon'>
          <input type='text'
            value={props.email}
            placeholder='Email'
            name='email'
            onChange={props.handleProfileChange}
            required

          />
          <ion-icon name="mail"/>
        </div>

      <div className='inputWithIcon'>
        <input type='text'
          value={props.phoneNumber}
          placeholder='PhoneNumber'
          name='phoneNumber'
          onChange={props.handleProfileChange}
          required

        />
        <ion-icon name="megaphone"/>
      </div>

      <div className='inputWithIcon'>
        <textarea
          value={props.notes}
          placeholder='Notes'
          name='notes'
          onChange={props.handleProfileChange}
          required

        />
        <ion-icon name="reorder"></ion-icon>
      </div>

      <br/>
      <TimeZoneList country={props.country} handleChange={props.handleChange}/>
      <br/>

      <button type='value'>Submitted</button>
      </form>

        <br/>
        <br/>

      </div>
    )
}
