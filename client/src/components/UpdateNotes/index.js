import React, {Component} from 'react';
import ModalTextBox from '../modalTextBox';
import './index.css'

export default class UpdateNotes extends Component{
  constructor(props){
    super(props);
    this.state=({
      modal: true,
      notes: this.props.notes
    })
  }

  onSubmit=(e)=>{
    e.preventDefault()
    this.setState({
      modal: !this.state.modal
    })
    console.log('clicked')
  }

  handleChange=(e)=>{
    this.setState({
      notes: e.target.value
    })
  }



  render(){

    return(
    <div className={this.state.modal?"modal":"modalOff"}>
    Update notes
    <ModalTextBox handleChange={this.handleChange} notes={this.state.notes} onSubmit={this.onSubmit}/>
    </div>
  )
}
}
