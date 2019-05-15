import React from 'react';

export default function ModalTextBox(props){
  return(
    <div>
    <form onSubmit={props.onSubmit}>
    <textarea
      value={props.notes}
      placeholder='Notes'
      name='notes'
      onChange={props.handleChange}

    />
    <button value='submit'>Submit</button>
    </form>
    </div>
  )
}
