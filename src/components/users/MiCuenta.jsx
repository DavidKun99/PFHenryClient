import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import UpdateButton from './UpdateButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MyAccount = () => {
  const user = useSelector(state => (state.user))


  // Renderizar el perfil del usuario si está cargado
  if (user?.user) {
    return (
      <div className="mx-auto" style={{ width: "40%", margin: "130px",borderRadius: "10px", padding:"30px",  boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.5)"}}>
      <Container>
        <Row>
          <Col>
            <div>
              <h1 style={{fontWeight:700}}>Perfil de Usuario</h1>
              <p>Nombre: {user?.user.first_name} {user?.user.last_name}</p>
              <p>Correo electrónico: {user?.user.email}</p>
              <p>Dirección de envíos: {user?.user.delivery_address}</p>
              <p>País: {user?.user.country}</p>
              <p>Teléfono de contacto: {user?.user.mobile}</p>
              <p>Actividad laboral: {user?.user.CustomElementRegistry}</p>
              <p>Tipo de cuenta: {user?.user.role}</p>
              <p>Historial de compras: {user?.user.purchase_history}</p>
            </div>
            <UpdateButton />
          </Col>
        </Row>
       
      </Container>
          <div className="text-center mt-4">
            <Button variant="dark" as={Link} to="/Home">
              Volver a inicio
            </Button>
          </div>
        </div>
    );
  }

  // El usuario todavía se está cargando, puedes mostrar un indicador de carga
  return <div className="mt-4">Cargando...</div>;
};

export default (MyAccount);
