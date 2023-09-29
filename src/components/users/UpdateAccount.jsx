import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../redux/actions/index';
import { useNavigate } from 'react-router-dom';

const UpdateAccount = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();
  const [user_password, setuser_password] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta

  const isLoading = useSelector((state) => state.user.loading);

  const handleUpdate = async () => {
    try {
      await dispatch(updatePassword(userId, user_password));
      setSuccess('Contraseña actualizada correctamente.');
      setError(null);

      // Mostrar la alerta y esperar 3 segundos antes de redirigir
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/account');
      }, 3000); // 3 segundos
    } catch (err) {
      setError('Error al actualizar la contraseña. Por favor, inténtelo de nuevo.');
      setSuccess(null);
    }
  };

  // Verificar si se muestra el formulario o el mensaje de éxito
  const showForm = success === null; // Mostrar el formulario si no hay éxito

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)', marginTop: '70px', marginBottom: '30px' }}>
      <Row>
        <Col>
          <h3 className="text-center">Ingresa tu nueva contraseña</h3>
          {error && <div className="text-danger text-center mb-3">{error}</div>}
          {showForm && (
            <Form>
              <Form.Group>
                <Form.Label>Nueva Contraseña:</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    value={user_password}
                    onChange={(e) => setuser_password(e.target.value)}
                  />
                  <div className="input-group-append">
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </Button>
                  </div>
                </div>
              </Form.Group>
              <div className="text-center">
                <Button
                  onClick={handleUpdate}
                  variant="dark"
                  size="sm"
                  disabled={isLoading}
                >
                  {isLoading ? 'Actualizando...' : 'Actualizar'}
                </Button>
              </div>
            </Form>
          )}
          {/* Alerta de éxito */}
          {showAlert && (
            <Alert variant="success" className="mt-3">
              {success}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateAccount;
