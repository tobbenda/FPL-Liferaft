import React from 'react';
import './DataValue.css';

const DataValue = props => {
  const { value, attr, header } = props;


  return (
    <div className={`${attr}-col data-value ${header?'hdr':""}` }> {value} </div>
  )
}

export default DataValue;