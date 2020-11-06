import React, { useContext } from 'react';
import './SettingsBox.css';
import { myContext } from '../../App';
import Setting from '../Setting/Setting';

const SettingsBox = () => {
  const {checkValues, setCheckValues, setPosFilter, setSortBy, submitHandler, setMaxPrice, setMinPrice} = useContext(myContext);

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

  const checkDivClickHandler = (id) => {
    const newArr = checkValues.map( attr => {
      if (attr.attributeID === id) {
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

  const getPriceOptions = () => {
    let priceArr = [];
    for (let i=38; i < 130; i ++){
      priceArr.push(i);
    }
    return priceArr;
  }

  const minPriceHandler = e => {
    console.log(e.target.value);
    setMinPrice(parseInt(e.target.value));
  } 
  const maxPriceHandler = e => {
    setMaxPrice(parseInt(e.target.value));
  } 

  return (
    <div className="settings-box">
      <h1 className="settings-hdr"> Pick your statistics:</h1>
      <div className="checkbox-container">
        {checkValues.map(attribute => <Setting key={attribute.attributeID} checkDivClickHandler={checkDivClickHandler} checkChangeHandler={checkChangeHandler} attribute={attribute}/>)}
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
        <div className="price-filter-container">
          <label>Min. Price:</label>
          <select onChange={minPriceHandler} id="low-price-filter" name="price-filter">
    {getPriceOptions().map((price) => <option key={price}>{price}</option>)}
          </select>
          
          <label>Max. Price:</label>
          <select onChange={maxPriceHandler} id="high-price-filter" name="price-filter">
    {getPriceOptions().map((price) => <option selected key={price}>{price}</option>)}
          </select>
        </div>
        


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