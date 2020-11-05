import React from 'react';
import './Footer.css';

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const Footer = () => {
  return (
    <div className="footer">
      <p> some copyright text I dont know what means </p>
      <button className="to-top-btn" onClick={topFunction}>Top</button>
    </div>
  )
}

export default Footer;