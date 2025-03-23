import React from 'react';
import '../assets/styles/Loader.css';

const Loader = () => {
  return (
    <div className="custom-loader-container">

      <div className="custom-loader">

        <div className="circle-container">

          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="circle circle-4"></div>
        
        </div>
        
        <div className="loader-text">Loading</div>
      
      </div>
    
    </div>
  );
};

export default Loader;