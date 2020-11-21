import './Main.css';
import SettingsBox from '../SettingsBox/SettingsBox';
import DataBox from '../DataBox/DataBox';
import React from 'react';
import cover from '../../utils/images/fpl-cover-foto-01.jpg';
import cover_cropped from '../../utils/images/fpl-cover-cropped.jpg';


function Main() {
   return (
      <div className="Main">
        <img className="cover-img-cropped" alt='football players' src={cover_cropped}></img>
        <img className="cover-img" alt='football players' src={cover}></img>
        <SettingsBox />
        <DataBox />
      </div>
  );
}

export default Main;
