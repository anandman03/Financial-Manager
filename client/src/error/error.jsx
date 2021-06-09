import React from 'react';
import errorSVG from './404.svg';

import './error-style.css';

function ErrorComponent() {
  return (
    <div className="error">
      <img src={errorSVG} alt="Error 404" className="error-img"></img>
    </div>
  );
};

export default ErrorComponent;