import React from 'react';
import './Setting.css';

const Setting = props => {
  const {attribute, checkChangeHandler, checkDivClickHandler} = props;
  const {attributeID, prettyName, checked} = attribute;

  return (
  <div onClick={()=> checkDivClickHandler(attributeID)} className="setting">
    <label className="checkbox-label">{prettyName}</label>
    <input id={attributeID} onChange={checkChangeHandler} type="checkbox" checked={checked}></input>
  </div>
  )
}

export default Setting;