import React, {Component} from 'react';
import './index.css';
import TimeZoneList from '../timeZoneList';

export default function Profile(props){
// constructor(props){
//   super(props);
//   this.state=({
//     country: props.country
//   })
// }
//
//   handleChange=(e)=>{
//     console.log(e.target.value);
//     console.log('profile country', this.state.country)
//     this.setState({
//       country: e.target.value
//     })
//     // this.showTimes(e.target.value);
//   }




    return(
      <div className='profile'>

      <form onSubmit={props.onSubmit}>

        <div className='inputWithIcon'>
          <input type='text'
            value={props.name}
            placeholder='Name'
            name='name'
            onChange={props.handleProfileChange}

          />
          <ion-icon name="contact"/>
      </div>

        <div className='inputWithIcon'>
          <input type='text'
            value={props.email}
            placeholder='Email'
            name='email'
            onChange={props.handleProfileChange}

          />
          <ion-icon name="mail"/>
        </div>

      <div className='inputWithIcon'>
        <input type='text'
          value={props.phoneNumber}
          placeholder='PhoneNumber'
          name='phoneNumber'
          onChange={props.handleProfileChange}

        />
        <ion-icon name="megaphone"/>
      </div>

      <div className='inputWithIcon'>
        <textarea
          value={props.notes}
          placeholder='Notes'
          name='notes'
          onChange={props.handleProfileChange}

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

  // <TimeZoneList country={props.country} handleChange={props.handleChange}/>
