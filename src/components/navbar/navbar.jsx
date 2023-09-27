import React from "react";
import { connect, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import SearchBar from "../searchbar/searchbar";
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from "../users/loginButton"
import WelcomeMessage from "../../components/users/WelcomeMessage"
import LogoutButton from "../users/LogoutButton";
import RegisterButton from "../users/RegisterButton";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import './navbar.css';


const Navbar1 = () => {
  const isLoggedIn = useSelector(state => (state.isLoggedIn))
  const cartProd = useSelector(state => (state.cartItems))
  const user = useSelector(state => (state.user))
  const role = user?.user.role
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="navbar-expand-sm d-flex justify-content-between rounded align-items-center fixed-top custom-navbar">
    <div className="d-flex align-items-center">
      <img src={logo} alt="Logo" className="logo custom-logo" />
      <Button as={Link} to="/home" variant="dark" size="sm" style={{ fontSize: '1.2rem' }}>Inicio</Button>
      {user?.user.role==="Administrador" ? (<Button as={Link} to="/createProduct" variant="dark" size="sm" style={{ fontSize: '1.2rem' }}>Crear producto</Button>):(<></>)}
      
    </div>
    <SearchBar />
      <Button as={Link} to="/cart" variant="dark" size="sm" className="me-3 mt-3 custom-button" style={{height:"100%", justifySelf:"center", alignSelf: "center"}}>
        <i className="bi bi-cart" style={{ fontSize: '2.3rem' }}> {cartProd.length > 0 && <span className="cartCount">{cartProd.length}</span>}</i>
      </Button>
      {isLoggedIn ? (
        <Dropdown>
          <Dropdown.Toggle variant="dark" size="sm" className="me-3 custom-button">
            <FontAwesomeIcon icon={faUser} style={{ fontSize: '2rem' }}/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <WelcomeMessage />
              {role==="Administrador"?(<><Dropdown.Item as={Link} to="/dashboard">Dashboard</Dropdown.Item></>):(<></>)}
              <Dropdown.Item as={Link} to="/account">Mi Perfil</Dropdown.Item>
              <Dropdown.Item as={Link} to="/purchases">Mis Compras</Dropdown.Item>
              <Dropdown.Item as={Link} to="/wishlist">Lista de Deseos</Dropdown.Item>
            </Dropdown.Item>
            <Dropdown.Item>
              <LogoutButton/>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Dropdown>
          <Dropdown.Toggle variant="dark" size="sm" className="me-3 custom-button">
            <FontAwesomeIcon icon={faUser} style={{ fontSize: '2rem' }}/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <LoginButton/> 
            </Dropdown.Item>
            <Dropdown.Item>
              <RegisterButton /> 
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      <Button as={Link} to="/" variant="dark" size="sm" className="me-3 custom-button">
        <i className="bi bi-power" style={{ fontSize: '2.3rem' }}></i>
      </Button>
    </Navbar>
  )
};


const mapStateToProps = (state) => ({
  user: state.user,
});


export default connect(mapStateToProps)(Navbar1);
