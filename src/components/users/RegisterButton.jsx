import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

const RegisterButton = ({ user }) => {
  // Comprueba si el usuario está autenticado
  if (!user) {
    return (
      
        <Button as={Link} to="/registration" variant="dark" size="sm">Registrarse</Button>
        
    );
  } else {
    return null; // Si el usuario está autenticado, no muestra nada
  }
};

const mapStateToProps = (state) => ({
  user: state.user, // Suponiendo que tienes un estado 'user' que contiene los datos del usuario o es null
});

export default connect(mapStateToProps)(RegisterButton);
