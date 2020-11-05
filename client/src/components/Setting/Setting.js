import React from 'react';
import './Setting.css';

const Setting = props => {
  const {attribute, checkChangeHandler} = props;
  const {attributeID, prettyName, checked} = attribute;

  return (
  <div className="setting">
    <label>{prettyName}</label>
    <input id={attributeID} onChange={checkChangeHandler} defaultChecked={checked} type="checkbox"></input>
  </div>
  )
}

export default Setting;