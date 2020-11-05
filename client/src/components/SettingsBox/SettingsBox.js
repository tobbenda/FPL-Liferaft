import React, { useContext } from 'react';
import './SettingsBox.css';
import { myContext } from '../../App';
import Setting from '../Setting/Setting';

const SettingsBox = () => {
  const {checkValues, setCheckValues, setPosFilter, setSortBy, submitHandler} = useContext(myContext);

  const checkChangeHandler = (e) => {
    const newArr = checkValues.map( attr => {
      if (attr.attributeID === e.target.id) {
        return {
          attributeID: attr.attributeID,
          prettyName: attr.prettyName,
          checked: !attr.checked
        }
      } else {
        return attr;
      }
    })
    setCheckValues(newArr);
  }

  const posFilterChangeHandler = e => {
    setPosFilter(e.target.value);
  }

  const sortChangeHandler = e => {
    const attr = checkValues.find(el => el.prettyName === e.target.value);
    setSortBy(attr.attributeID);
  }

  return (
    <div className="settings-box">
      <h1 className="settings-hdr"> Pick your interests</h1>
      <div className="checkbox-container">
        {checkValues.map(attribute => <Setting key={attribute.attributeID} checkChangeHandler={checkChangeHandler} attribute={attribute}/>)}
      </div>
      <div className="filter-container">
        <h1> Filters: </h1>
        <label>Position:</label>
        <select onChange={posFilterChangeHandler} id="pos-filter" name="pos-filter">
          <option>All</option>
          <option>Goalkeeper</option>
          <option>Defence</option>
          <option>Midfielder</option>
          <option>Attacker</option>
        </select>
        
      </div>
      <div className="sort-container">
        <h1>Sort by:</h1>
        <label>Sort by:</label>
        <select onChange={sortChangeHandler} id="sort-value" name="sort-value">
          {checkValues.map(el => <option key= {el.attributeID} id={el.attributeID}>{el.prettyName}</option>)}
        </select>
      </div>
      <button className="go-btn" onClick={submitHandler}>Go!</button>
    </div>
  )
}

export default SettingsBox;