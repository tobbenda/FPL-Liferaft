import React, { useContext } from 'react';
import './DataBox.css';
import DataRow from '.././DataRow/DataRow';
import { myContext } from '../../App';



const DataBox = () => {
  const { playerData, checkValues } = useContext(myContext);
  
// BEGYNNER Å SETTE CLSS PÅ HDRROW
    const getHeaders = () => {
      const newObj = {}
      if (playerData.length !== 0) {
        checkValues.filter(val => val.checked === true ).forEach(val => {
          newObj[val.attributeID] = val.prettyName;
        })
        return newObj;
        // const checkedAttributes = [...checkValues.filter(el => el.checked === true).map(attr => attr.prettyName)];
        // return checkedAttributes
      }
    }
    
  return (
    <div className="data-box">
      {<DataRow id='hdr-row' header data={getHeaders() || []} i={getHeaders()?'Rank': null} />}
      {playerData.map((el, i) => <DataRow key={i} data={el} i={i+1} />)}
    </div>
  )
}

export default DataBox;