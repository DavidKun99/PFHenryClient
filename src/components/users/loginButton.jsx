import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link de React Router
import { connect } from 'react-redux'; // Importa connect para acceder al estado de autenticación
import { Button } from 'react-bootstrap';

const LoginButton = ({ user }) => {
  // Comprueba si el usuario está autenticado
  if (user) {
    return null; // Si el usuario está autenticado, no muestra nada
  } else {
    return (
     <Button as={Link} to="/login" variant="dark" size="sm">Iniciar sesión</Button>
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.user, // Suponiendo que tienes un estado 'user' que contiene los datos del usuario o es null
});

export default connect(mapStateToProps)(LoginButton);
