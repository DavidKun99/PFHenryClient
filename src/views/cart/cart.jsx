import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
 } from "../../redux/actions/index";
import "../../components/css/index.css";
import "./cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
    const handleIncreaseQuantity = (sku) => {
    dispatch(increaseQuantity(sku));
  };

  const handleDecreaseQuantity = (sku) => {
    // Find the item in the cartItems array
    const item = cartItems.find((item) => item.sku === sku);

    // Make sure the item exists and the quantity is greater than 1
    if (item && item.quantity > 1) {
      dispatch(decreaseQuantity(sku));
    }
  };

  const calculateTotalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );


  return (
    <div>
      <Container
            md={8}
            className="mx-auto"
            style={{
              margin: "150px",
              border: "gray solid 1px",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.5)",
              marginBottom: "20px",
            }}
        >
          <div div className="d-flex justify-content-center cart-container">
            <h1> Carrito de Compras</h1>
            </div>
        <Row className="mt-5 g-0">
        <Col md={12}>
            {cartItems.length === 0 ? (
              <p className="text-center">El carrito está vacío.</p>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <Card key={item.id} className="mb-3 h-100 cart-card mx-auto">
                    <Row className="align-items-center">
                      <Col md={4}>
                        <img
                          src={item.image}
                          alt={item.titulo}
                          className="card-img-top cart-img"
                        />
                      </Col>
                      <Col md={8}>
                        <Card.Body>
                          <div>
                          <h5 className="card-title">Nombre: {item.name}</h5>
                          </div>
                          <div>
                          <p className="card-text">Precio: ${item.price}</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-secondary me-2"
                              onClick={() => handleDecreaseQuantity(item.sku)}
                            >
                              -
                            </button>
                            <p className="me-2">{item.quantity}</p>
                            <button
                              className="btn btn-secondary me-2"
                              onClick={() => handleIncreaseQuantity(item.sku)}
                            >
                              +
                            </button>
                            <button
                              className="btn btn-danger hover-effect"
                              onClick={() => handleRemoveFromCart(item.sku)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
            )}
            <h3
              className="d-flex justify-content-end mt-4"
              style={{ margin: "30px" }}
            >
              Total: ${calculateTotalPrice}
            </h3>
            {cartItems.length > 0 && (
              <div className="d-flex justify-content-end mt-3">
                <Button variant="success" as={Link} to="/buyPage">
                  Terminar compra
                </Button>
              </div>
            )}
          </Col>
        </Row>
        </Container>
        {cartItems.length > 0 && (
          <div className="text-center m-4">
            <Button variant="dark" as={Link} to="/Home">
              Volver a inicio
            </Button>
          </div>
        )}
      </div>
  );
};

export default Cart;