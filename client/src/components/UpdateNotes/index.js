import React, {Component} from 'react';
import './index.css'

export default function UpdateNotes(props){

    return(

        <div className={props.modal?"modal":"modalOff"}>
        <div className='noteContainer'>
        {props.modal?
        <div><h1>Update notes</h1>
        <form onSubmit={props.closeModal}>
        <textarea className='updateNotesTextArea'
          value={props.note}
          placeholder='Notes'
          name='note'
          onChange={props.rewriteNotes}

        />
        <button className='updateNotesButton' value='submit'>Update</button>
        </form></div>:null}

        </div>
      </div>
  )
}
