
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createUser } from '../../redux/actions/index';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import '../css/index.css';
import Swal from 'sweetalert2';

const RegistrationForm = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    delivery_address: "",
    country: "",
    CustomElementRegistry: "",
    mobile: "",
    role: "Cliente",
    user_password: "",
  });

  const [formErrors, setFormErrors] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
  });

  const {
    user_name,
    first_name,
    last_name,
    gender,
    email,
    delivery_address,
    country,
    CustomElementRegistry,
    mobile,
    role,
    user_password,
  } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación para el nombre y apellido (solo letras y espacios)
    if (name === "first_name" || name === "last_name") {
      if (!/^[A-Za-z\s]+$/.test(value)) {
        setFormErrors({
          ...formErrors,
          [name]: "Solo se permiten letras y espacios.",
        });
      } else {
        setFormErrors({ ...formErrors, [name]: "" });
      }
    }

    // Validación para el número de teléfono (solo números)
    if (name === "mobile") {
      if (!/^[0-9]+$/.test(value)) {
        setFormErrors({
          ...formErrors,
          [name]: "Solo se permiten números.",
        });
      } else {
        setFormErrors({ ...formErrors, [name]: "" });
      }
    }

    // Resto del código para actualizar el estado con los cambios
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for missing fields
    const requiredFields = ['user_name', 'first_name', 'last_name', 'gender', 'email', 'delivery_address', 'country', 'CustomElementRegistry', 'mobile', 'user_password'];
  
    const missingFields = requiredFields.filter((fieldName) => !formData[fieldName]);
  
    if (missingFields.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: `Please fill in the following fields: ${missingFields.join(', ')}`,
      });
    } else {
      const result = await dispatch(createUser(formData));
      if (result === 'Success') {
        Swal.fire({
          icon: 'success',
          title: 'Registered Successfully, Please Login',
        });
        navigate('/login');
      }
    }
  };  

  const formIsValid = !Object.values(formErrors).some((error) => error);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)', marginTop: '130px', marginBottom: '50px' }}>
      {user ? (
        <div>
          <p>Registro exitoso.</p>
          <Button as={Link} to="/home" variant="dark" size="sm">
            Volver a Home
          </Button>
        </div>
      ) : (
        <Card style={{ width: '30rem' }} className="custom-shadow">
          <Card.Body>
            <h2>Registro de Usuario</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Nombre de Usuario:</Form.Label>
                <Form.Control
                  type="text"
                  name="user_name"
                  value={user_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={first_name}
                  onChange={handleChange}
                  required
                />
                {formErrors.first_name && (
                  <Form.Text className="text-danger">{formErrors.first_name}</Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Apellido:</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={last_name}
                  onChange={handleChange}
                  required
                />
                {formErrors.last_name && (
                  <Form.Text className="text-danger">{formErrors.last_name}</Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Genero:</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione su género</option>
                  <option value="M">M</option>
                  <option value="F">F</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
                {formErrors.email && (
                  <Form.Text className="text-danger">{formErrors.email}</Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Direccion de envio:</Form.Label>
                <Form.Control
                  type="text"
                  name="delivery_address"
                  value={delivery_address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Pais:</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={country}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Actividad laboral:</Form.Label>
                <Form.Control
                  type="text"
                  name="CustomElementRegistry"
                  value={CustomElementRegistry}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Numero de contacto:</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={mobile}
                  onChange={handleChange}
                  required
                />
                {formErrors.mobile && (
                  <Form.Text className="text-danger">{formErrors.mobile}</Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Rol:</Form.Label>
                <Form.Control
                  type="text"
                  name="role"
                  value={role}
                  readOnly // Esto evita que el usuario modifique el campo "Rol"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  type="password"
                  name="user_password"
                  value={user_password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={!formIsValid}
                  variant="dark"
                  size="sm"
                  className='mt-4'
                >
                  Registrarse
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { createUser })(RegistrationForm);
