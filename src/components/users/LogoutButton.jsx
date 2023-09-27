import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/index';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const LogoutButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => (state.isLoggedIn))
  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  };

  // Verifica si el usuario está autenticado antes de mostrar el botón
  if (isLoggedIn) {
    return (
      <Button onClick={handleLogout} variant="dark" size="sm">Cerrar Sesión</Button>
      
    );
  } else {
    // Si el usuario es null, no muestra nada
    return null;
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout })(LogoutButton);
