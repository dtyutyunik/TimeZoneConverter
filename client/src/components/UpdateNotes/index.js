import React, {Component} from 'react';
import ModalTextBox from '../modalTextBox';
import './index.css'

export default function UpdateNotes(props){

    return(
    <div className={props.modal?"modal":"modalOff"}>
    Update notes
    {props.modal?
    <form onSubmit={props.closeModal}>
    <textarea
      value={props.note}
      placeholder='Notes'
      name='note'
      onChange={props.rewriteNotes}

    />
    <button value='submit'>Submit</button>
    </form>:null}

    </div>
  )
}


// <ModalTextBox updateNotes={this.updateNotes} notes={this.state.notes} onSubmit={this.onSubmit}/>
