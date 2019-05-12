import React, {Component} from 'react';
import Profile from './components/profile';
import Location from './components/Location';
import Clients from './components/Clients';
import LandingPage from './components/LandingPage';
import Fire from './firebase.js';

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
      view: 'addcontact',
      user: {}
    }
  }


    authListener=()=>{
      Fire.fire.auth().onAuthStateChanged((user)=>{
        if(user){
          this.setState({user});
          // console.log(user.uid);
        }else{
          this.setState({user:null})
        }

      });
    }
    componentDidMount=()=>{
      this.authListener();
    }

  handleChange=(e)=>{
    this.setState({
      country: e.target.value
    })
  }

  handleProfileChange=(e)=>{
    const {name,value}=e.target;
    this.setState({
      [name]: value,
    })
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    this.state.profile.push({
      name: this.state.name,
      notes: this.state.notes,
      country: this.state.country,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      otherTime: this.state.otherTime
    })
  }

  showTimes=(country,index)=>{
    let otherTime=moment().tz(`${country}`).format('LTS');
    return otherTime;


    // let time=moment().format('LTS');
    // let otherTime= moment().tz(`${country}`).format('LTS');


    // var newYork   = moment.tz("2014-06-01 12:00", "America/New_York");
    // var losAngeles = newYork.clone().tz("America/Dominica");
  }

  logOut=()=>{
    Fire.fire.auth().signOut();
    console.log('logged out')
    console.log(this.state.user)
  }

  changeView=(show)=>{
    console.log('view is ', show)

    if(show==='contactList'){
      setInterval(()=>{this.state.profile.map((item,index)=>{
            let result=this.showTimes(item.country, index);
            item.otherTime=result;
            this.setState({
              [item.otherTime]: item.otherTime,
            })
          })},1000)


    }



    this.setState({
      view: show
    })
  }



  render(){
  return (
    <div className="App">

    {this.state.user==={}||this.state.user===null?<LandingPage user={this.state.user}/>:<div><nav>
    <a onClick={()=>this.changeView('addcontact')}>Add Contact</a>
    <a onClick={()=>this.changeView('contactList')}>Show ContactList</a>
    <a onClick={()=>this.logOut()}>Log Out</a>
    </nav>

    <Clients clients={this.state.profile}/>
    <Profile
    name={this.state.name}
    notes={this.state.notes}
    email={this.state.email}
    phoneNumber={this.state.phoneNumber}
    handleProfileChange={this.handleProfileChange}
    onSubmit={this.handleSubmit}
    country={this.state.country}
    handleChange={this.handleChange}
    />
    </div>}



    </div>
  );
}
}


export default App;
// <nav>
// <a onClick={()=>this.changeView('addcontact')}>Add Contact</a>
// <a onClick={()=>this.changeView('contactList')}>Show ContactList</a>
// </nav>
// {this.state.view==='contactList'?
// <Clients clients={this.state.profile}/>:
// <Profile
// name={this.state.name}
// notes={this.state.notes}
// email={this.state.email}
// phoneNumber={this.state.phoneNumber}
// handleProfileChange={this.handleProfileChange}
// onSubmit={this.handleSubmit}
// country={this.state.country}
// handleChange={this.handleChange}
// />}
