import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import "./wishlist.css";
import { addToCart, removeFromWishlist } from "../../redux/actions";
import Swal from "sweetalert2";

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    Swal.fire({
      icon: "success",
      title: "Agregado al carrito",
      text: `${product.name} se ha agregado al carrito.`,
      imageUrl: product.image,
      imageAlt: product.name,
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const handleRemoveFromWishlist = (product) => {
    dispatch(removeFromWishlist(product)); 
  };

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
      <div className="d-flex justify-content-center wishlist-container ">
        <h1>Favoritos</h1>
      </div>
      <Row className="mt-5 g-0">
        <Col md={12}>
          {wishlist.length === 0 ? ( 
            <div className="text-center">No hay items en tu lista de favoritos</div>
          ) : (
            wishlist.map((product, index) => (
              <div key={product.sku}>
                <Card className="mb-3 h-100 wishlist-card mx-auto">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.titulo}
                        className="card-img-top wishlist-img"
                      />
                    </Col>
                    <Col md={4}>
                      <Card.Title>{product.name}</Card.Title>
                    </Col>
                    <Col md={3} className="text-end">
                      <Card.Text className="fw-bold">${product.price}</Card.Text>
                    </Col>
                    <Col md={2} className="mt-1">
                      <Button
                        variant="success"
                        className="btn me-2"
                        onClick={() => handleAddToCart(product)}
                      >
                        <i className="bi bi-cart-plus"></i>
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveFromWishlist(product)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </Card>
           {/* index < wishlist.length - 1 && <hr className="wishlist-separator" /> */}
              </div>
            ))
          )}
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

export default Wishlist;
