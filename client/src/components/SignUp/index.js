import React from 'react';

export default function SignUp(props){
  return(
    <div className="Login">
    
    <h1> <span onClick={()=>props.changeView('signup')}>Sign Up</span> <span>     </span>
    <span onClick={()=>props.changeView('login')}>Log In</span></h1>
    <form className='loginForm' onSubmit={props.onSubmit}>

      <div className='inputIcon'>
        <input type='text'
          value={props.email}
          placeholder='Email'
          name='email'
          onChange={props.handleProfileChange}

        />
        <ion-icon name="contact"/>
    </div>

      <div className='inputIcon'>
        <input type='password'
          value={props.password}
          placeholder='Password'
          name='password'
          onChange={props.handleProfileChange}

        />
        <ion-icon name="mail"/>
    </div>
    <button type='value'>Sign Up</button>
    </form>
    </div>
  )
}
