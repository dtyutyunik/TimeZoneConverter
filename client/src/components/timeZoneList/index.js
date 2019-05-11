import React, {Component} from 'react';
import {Africa,America,Antarctica,Arctic,Asia,Atlantic,Australia,Pacific,Indian,Europe} from '../timeZones.js';
import './index.css';

export default function TimeZoneList(props){

  return(
    <div className='inputWithIcons'>
     <select className="timezoneSelect"value={props.country} onChange={props.handleChange}>
        <optgroup label="Africa">
            {Africa.map((i, index)=>{
              return ( <option key={index} value={Africa[index]} label={Africa[index].slice(America[index].indexOf('/'))}></option>)
            })}
        </optgroup>

        <optgroup label="America">
            {America.map((i, index)=>{
              return (<option key={index} value={America[index]} label={America[index].slice(America[index].indexOf('/')+1)}></option>)
            })}
        </optgroup>

        <optgroup label="Antarctica">
              {Antarctica.map((i, index)=>{
                return (<option key={index} value={Antarctica[index]} label={Antarctica[index].slice(Antarctica[index].indexOf('/')+1)}></option>)
              })}
        </optgroup>

        <optgroup label="Arctic">
              {Arctic.map((i, index)=>{
                return (<option key={index} value={Arctic[index]} label={Arctic[index].slice(Arctic[index].indexOf('/')+1)}></option>)
              })}
        </optgroup>

        <optgroup label="Asia">
              {Asia.map((i, index)=>{
                return (<option key={index} value={Asia[index]} label={Asia[index].slice(Asia[index].indexOf('/')+1)}></option>)
              })}
        </optgroup>

        <optgroup label="Atlantic">
                  {Atlantic.map((i, index)=>{
                    return (<option key={index} value={Atlantic[index]} label={Atlantic[index].slice(Atlantic[index].indexOf('/')+1)}></option>)
                  })}
        </optgroup>

        <optgroup label="Australia">
                    {Australia.map((i, index)=>{
                      return (<option key={index} value={Australia[index]} label={Australia[index].slice(Australia[index].indexOf('/')+1)}></option>)
                    })}
        </optgroup>

        <optgroup label="Pacific">
                      {Pacific.map((i, index)=>{
                        return (<option key={index} value={Pacific[index]} label={Pacific[index].slice(Pacific[index].indexOf('/')+1)}></option>)
                      })}
        </optgroup>

        <optgroup label="Indian">
                    {Indian.map((i, index)=>{
                        return (<option key={index} value={Indian[index]} label={Indian[index].slice(Indian[index].indexOf('/')+1)}></option>)
                      })}
        </optgroup>

        <optgroup label="Europe">
                    {Europe.map((i, index)=>{
                        return (<option key={index} value={Europe[index]} label={Europe[index].slice(Europe[index].indexOf('/')+1)}></option>)
                      })}
        </optgroup>
      </select>

      <ion-icon name="airplane"/>
            </div>
          )
        }
