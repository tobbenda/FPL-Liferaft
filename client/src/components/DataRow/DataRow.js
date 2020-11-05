import React from 'react';
import './DataRow.css';
import DataValue from '../DataValue/DataValue'

const DataRow = props => {
  const { data, i, header} = props; 

  return (
    <div className='data-row'>
      <DataValue header={i==='Rank'?true:false} value={i} attr="rank"/>
      {Object.keys(data).map((key) => <DataValue header={header? true:false} key={key} attr={key} value={data[key]} />)}
    </div>
  )
}

export default DataRow;