import React, {Component} from 'react';
import Profile from './components/profile';
import Location from './components/Location';
import Clients from './components/Clients';
import LandingPage from './components/LandingPage';
import UpdateNotes from './components/UpdateNotes';
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
      country: 'America/New_York',
      name: '',
      notes: '',
      email: '',
      phoneNumber: '',
      view: 'addcontact',
      user: {},
      passedNotes: '',
      newNote: '',
      modal: false,
      passedIndex:0
    }
  }


    authListener=()=>{
      Fire.fire.auth().onAuthStateChanged((user)=>{
        if(user){
          this.setState({user});
          // console.log(user);
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
      // console.log('created')
    }else{
      // console.log('false')
    }





  }

  showTimes=(country,index)=>{
    if(country!==''){
      let otherTime=moment().tz(`${country}`).format('LTS');
      return otherTime;
    }



    // let time=moment().format('LTS');
    // let otherTime= moment().tz(`${country}`).format('LTS');


    // var newYork   = moment.tz("2014-06-01 12:00", "America/New_York");
    // var losAngeles = newYork.clone().tz("America/Dominica");
  }

  logOut=()=>{
    Fire.fire.auth().signOut();
    // console.log('logged out')
    // console.log(this.state.user)
  }



  errData=(error)=>{
    console.log(error)
  }

  changeView=async(show)=>{
    let {uid}=this.state.user;
    let db=Fire.database.ref('Clients/'+uid);

    if(show==='contactList'){

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
    if(dataPull!==null){
      let valueOfKey=Object.values(dataPull);
      // console.log('looking for data')
      this.setState({
        profile: valueOfKey
      })

    }
    if(dataPull===null){
      this.setState({
        profile: []
      })
    }
  }


  removeClient=(index)=>{

    let {uid}=this.state.user;
    let db=Fire.database.ref('Clients/'+uid);
    let deleteThis='';
    db.once('value', function word(data){
      let dataPull=data.val();
          //gets the values of the pull of data
          if(dataPull!=={}&&dataPull!==null&&dataPull!==undefined){
            let valueOfKey=Object.values(dataPull);
            valueOfKey.find((item,indexKey)=>{
              if(indexKey===index){
                deleteThis=Object.keys(dataPull)[index];
                //deletes the specific child
                Fire.database.ref('Clients/'+uid).child(deleteThis).set(null);
              }
            })
          }
    },function error(){
      console.log('error')
    });

  }

  rewriteNotes=(e)=>{

    const {value}=e.target;
    // console.log(this.state.passedNotes);
    this.setState(prevState=>({
      passedNotes:{
        ...prevState.passedNotes,
        notes:value
      }
    }))
  }

  updateNotes=(notes,index)=>{
    console.log('notes are ', notes.notes);
    // console.log('index is ', index)

    this.setState({
      passedNotes: notes,
      modal: true,
      passedIndex: index
    })

    return this.rewriteNotes;
  }
  closeModal=(e)=>{
    e.preventDefault();
    this.setState({
      modal:false,
      view: 'contactList',

    })

    console.log('model closed')
    return this.updateClientDataInFirebase();

  }


    updateClientDataInFirebase=()=>{
      console.log('index is in updateclient ', this.state.passedIndex);
      let {uid}=this.state.user;
      // console.log(uid);
      let index=this.state.passedIndex;
      let notes=this.state.passedNotes;
      // console.log(notes)
      let db=Fire.database.ref('Clients/'+uid);


       db.once('value', function word(data){
         let dataPull=data.val();
         // console.log(dataPull)
         if(dataPull!=={}&&dataPull!==null&&dataPull!==undefined){
           let dbUniqueKey=Object.keys(dataPull)[index];
           let result=Fire.database.ref('Clients/'+uid).child(dbUniqueKey).update(notes);
         }

       },this.error);

    }



  render(){
    let {modal}=this.state;
  return (
    <div className="App">

    {this.state.user==={}||this.state.user===null?<LandingPage user={this.state.user}/>:<div className='nav'><nav>
    <a onClick={()=>this.changeView('addcontact')}>Add Contact</a>
    <a onClick={()=>this.changeView('contactList')}>Show ContactList</a>
    <a onClick={()=>this.logOut()}>Log Out</a>
    </nav>

    {this.state.view==='contactList'?<div><Clients
            removeClient={this.removeClient}
            updateNotes={this.updateNotes}
            clients={this.state.profile}/>
            <UpdateNotes
              rewriteNotes={this.rewriteNotes}
              note={this.state.passedNotes.notes}
              modal={modal}
              closeModal={this.closeModal}
              /></div>:
    <div><Profile
    name={this.state.name}
    notes={this.state.notes}
    email={this.state.email}
    phoneNumber={this.state.phoneNumber}
    handleProfileChange={this.handleProfileChange}
    onSubmit={this.handleSubmit}
    country={this.state.country}
    handleChange={this.handleChange}

    /></div>}
    </div>}




    </div>
  );
}
}


export default App;
