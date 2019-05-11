import React, {Component} from 'react';
import Profile from './components/profile';
import Location from './components/Location';
import Clients from './components/Clients';
import TimeZoneList from './components/timeZoneList';

import './App.css';



var moment = require('moment-timezone');

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      yourTime: '',
      otherTime: '',
      profile:[],
      country: '',
      name: '',
      notes: '',
      email: '',
      phoneNumber: '',
      view: 'addcontact'
    }


  }





  handleChange=(e)=>{
    console.log(e.target.value);
    this.setState({
      country: e.target.value
    })
    this.showTimes(e.target.value);
  }

  handleProfileChange=(e)=>{
    const {name,value}=e.target;
    this.setState({
      [name]: value,
    })


    console.log('country is ', this.state.country)
    console.log(`name is ${name} and value is ${value}`)
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    console.log('submitted');
    this.state.profile.push({
      name: this.state.name,
      notes: this.state.notes,
      country: this.state.country,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      otherTime: this.state.otherTime
    })
  }


  showTimes=(country)=>{
    let time=moment().format('LTS');

    let d= moment().tz(`${country}`).format('LTS');


    var newYork   = moment.tz("2014-06-01 12:00", "America/New_York");
    var losAngeles = newYork.clone().tz("America/Dominica");

    this.setState({
      yourTime: time,
      otherTime: d
    })
  }

  changeView=(show)=>{

    console.log(show);

    this.setState({
      view: show
    })
  }



  render(){
  return (
    <div className="App">
    <nav>
    <a onClick={()=>this.changeView('addcontact')}>Add Contact</a>

    <a onClick={()=>this.changeView('contactList')}>Show ContactList</a>
    </nav>




    {this.state.view==='contactList'?
      <Clients clients={this.state.profile}/>:
      <Profile
      name={this.state.name}
      notes={this.state.notes}
      email={this.state.email}
      phoneNumber={this.state.phoneNumber}
      handleProfileChange={this.handleProfileChange}
      onSubmit={this.handleSubmit}
      country={this.state.country}
      handleChange={this.handleChange}
      />}






    <div>Your Country time is {this.state.yourTime}</div>
    <div>  Country selected {this.state.country}</div>
    <div>  Country time is {this.state.otherTime}</div>



    </div>
  );
}
}
  // <TimeZoneList country={this.state.country} handleChange={this.handleChange}/>


export default App;
