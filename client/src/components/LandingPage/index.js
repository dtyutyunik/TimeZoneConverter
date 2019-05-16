import React, {Component} from 'react';
import './index.css';
import Login from '../Login';
import SignUp from '../SignUp';

import Fire from '../../firebase';


export default class LandingPage extends Component{
  constructor(props){
    super(props);

    this.state=({
      view: 'signup',
      email: '',
      password: '',
      name: '',
    })

  }

  handleProfileChange=(e)=>{
    const {name,value}= e.target;
    this.setState({
      [name]:value
    })
  }

  changeView=(view)=>{
    this.setState({
      view: view
    })
  }

  onSubmit=(e)=>{
    e.preventDefault();
    switch(this.state.view){
      case 'signup':
              Fire.fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then({
              }).catch(function(error) {
                console.log(error)
              });
              break;
      case 'login':
              Fire.fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then({

              }).catch(function(error) {
                console.log(error)
              });
              break;
    }
  }


  render(){
    return(
      <div className='landingPage'>
      <h1>TIMEZONE CONTACTS</h1>
      {this.state.view==='signup'?
      <SignUp
       changeView={this.changeView}
       handleProfileChange={this.handleProfileChange}
       onSubmit={this.onSubmit}/>:
      <Login
        changeView={this.changeView}
        handleProfileChange={this.handleProfileChange}
        onSubmit={this.onSubmit}/>}
      </div>
    )
  }
}
