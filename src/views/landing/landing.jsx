import React from 'react';
import { Link } from 'react-router-dom';
import imglandp from '../../assets/landing.png';

const landingStyle = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const paddingTop = {
  paddingTop: '20vh',
};

function Landing() {
  return (
    <div style={landingStyle} className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 text-center" style={paddingTop}>
            <img src={imglandp} alt="landing" className="img-fluid" />
          </div>
          <div className="col-lg-6" style={paddingTop}>
            <h1 className="display-4">Mejora tu espacio de trabajo</h1>
            <h1 className="display-4">Las mejores PCs y notebooks del 2023</h1>
            <Link to="/home">
              <button className="btn btn-primary btn-lg mt-3">Compra Ahora</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
