import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/404.png";

const NotFound = () => {
  return (
    <div className="container text-center" style={{ marginTop: "170px" }}>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="d-flex flex-column align-items-center">
            <img src={img} alt="Error 404" />
            <h1 className="display-4" style={{ marginTop: "20px" }}>
              Página no encontrada
            </h1>
          </div>
          <p className="lead">
            ¡Ups! Parece que te has perdido. La página que buscas no existe.
          </p>
          <Link to="/home" className="btn btn-primary">
            Volver a la página de inicio
          </Link>
        </div>
      </div>
    </div>
  );
};


export default NotFound;
