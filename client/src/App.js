import React, {Component} from 'react';
import Profile from './components/profile';
import Africa from './components/timeZones';
import './App.css';
var moment = require('moment-timezone');

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      yourTime: '',
      otherTime: ''

    }


  }
  componentDidMount(){
    let time=moment().format('LTS');
    let d= moment().tz("America/Lima").format('LTS');

    var newYork    = moment.tz("2014-06-01 12:00", "America/New_York");
    var losAngeles = newYork.clone().tz("America/Dominica");



    // console.log('la time' , d);
    this.setState({
      time: time
    })
  }
  render(){
  return (
    <div className="App">
    <div className='appinside'>
    App

    </div>

    <label for="timezone">Timezone</label>

	   <select name="timezone" id="timezone">
				<optgroup label="Africa">
        {Africa.map((i, index)=>{
          return (<option value={Africa[index].split('/')[1]} label={Africa[index].split('/')[1]}></option>)
        })}
		      </optgroup>
  </select>
    <Profile/>

    </div>
  );
}
}

export default App;

// <select name="timezone" id="timezone">
// 				<optgroup label="Africa">
// 			<option value="Africa/Abidjan" label="Abidjan">Abidjan</option>
// <option value="Africa/Accra" label="Accra">Accra</option>
// </optgroup>
