
import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { loginGoogle, login, getFavorites, getCart } from '../../redux/actions/index';
import { Link } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import '../css/index.css';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const LoginForm = ({ login, user, error }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => (state.isLoggedIn))
  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        // console.log(user)
        const spliceName = user.displayName.split(' ')
        const newUser = {
          user_name: user.displayName,
          first_name: spliceName[0],
          last_name: spliceName[1],
          email: user.email
        }
        console.log(newUser);
        dispatch(loginGoogle(newUser));
        const userId = localStorage.getItem('id')
        dispatch(getFavorites(userId));
        dispatch(getCart(userId));
      }).catch((error) => {
        console.log(error)
      });
  }

  const [formData, setFormData] = useState({
    email: "",
    user_password: "",
  });

  const { email, user_password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
    const userId = localStorage.getItem('id')
    dispatch(getFavorites(userId))
    dispatch(getCart(userId));
  };

  return (

    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 100px)', marginTop: '70px', marginBottom: '30px' }}>
      {isLoggedIn ? (
        <div>
          <p>Inicio de sesión exitoso.</p>
          <Button as={Link} to="/home" variant="dark" size="sm">
            Volver a Home
          </Button>
        </div>
      ) : (
        <Card style={{ width: '30rem' }} className="custom-shadow">
          <Card.Body>
            <h2>Iniciar Sesión</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required

                />
                <Form.Text id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="user_password"
                  value={user_password}
                  onChange={handleChange}
                  required

                />
              </Form.Group>
              <Form.Group className="mb-3 form-check">
                <Form.Check type="checkbox" id="exampleCheck1" />
                <Form.Label className="form-check-label" htmlFor="exampleCheck1">
                  Check me out
                </Form.Label>
              </Form.Group>
              <div className="text-center"> {/* Agrega esta div y la clase text-center */}
                <Button type="submit" variant="dark" size="sm" >
                  Iniciar Sesión
                </Button>
                <br />
                <Button className="mt-2" variant="dark" size="sm" onClick={SignInWithGoogle}>
                  Iniciar Sesión con Google
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
  error: state.error,
});

export default connect(mapStateToProps, { login })(LoginForm);
