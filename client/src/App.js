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
          console.log(user);
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

    let {uid,email}=this.state.user;
    console.log(uid,email)


    if(!!uid){

        //Merchants is the name of the table, with everything after + is further into the table
        Fire.database.ref('Clients/' + `${uid}`).push({
        name: this.state.name,
        notes: this.state.notes,
        country: this.state.country,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        otherTime: this.state.otherTime
      });
    }else{
      console.log('false')
    }





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



  errData=(error)=>{
    console.log('error data called');
    console.log(error)
  }

  changeView=async(show)=>{
    console.log('view is ', show)

    if(show==='contactList'){


      let {uid}=this.state.user;
      let db=Fire.database.ref('Clients/'+uid);
      db.on('value', this.gotData,this.errData);


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

  gotData=(data)=>{
    //datapull is the database returning the data from firebase
    let dataPull=data.val();
    //pulls out values of the object into an array of objects
    let valueOfKey=Object.values(dataPull);

    this.setState({
      profile: valueOfKey
    })


  }

  remove=(data,item)=>{
    console.log('index is', item)
    let dataPull=data.val();
    let valueOfKey=Object.values(dataPull);
    console.log(valueOfKey)
    // valueOfKey.filter((item,index)=>{
    //
    // }))

    console.log('removed')
  }

  removeClient=(index)=>{
    console.log(index);
    console.log('client clicked to be removed')
    let {uid}=this.state.user;
    let db=Fire.database.ref('Clients/'+uid);
    db.on('value', function word(data){
      let dataPull=data.val();
      let dataKey=data.key;
      let valueOfKey=Object.values(dataPull);
      valueOfKey.filter((item,indexKey)=>{
        if(indexKey===index){

          let deleteThis=Object.keys(dataPull)[index];
          console.log(deleteThis)
          console.log(uid)
          let x=Fire.database.ref('Clients/'+uid+'/'+deleteThis)
          x.remove();

          // let userRef = this.database.ref('users/' + userId);
          // userRef.remove()

                // .setValue(null)
          // console.log(r)
        }
      })
    },this.errData);

  }



  render(){
  return (
    <div className="App">

    {this.state.user==={}||this.state.user===null?<LandingPage user={this.state.user}/>:<div><nav>
    <a onClick={()=>this.changeView('addcontact')}>Add Contact</a>
    <a onClick={()=>this.changeView('contactList')}>Show ContactList</a>
    <a onClick={()=>this.logOut()}>Log Out</a>
    </nav>

    {this.state.view==='contactList'?<Clients removeClient={this.removeClient} clients={this.state.profile}/>:
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
    </div>}



    </div>
  );
}
}


export default App;
