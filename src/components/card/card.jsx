import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { addToWishlist } from "../../redux/actions";
import { useSelector } from 'react-redux';
import "./card.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions";
import "../css/index.css";
import Swal from "sweetalert2";


const Cards = (props) => {
  const { sku, name, image, titulo, price } = props;
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    Swal.fire({
      icon: "success",
      title: "Agregado al carrito",
      text: `${name} se ha agregado al carrito.`,
      imageUrl: image,
      imageAlt: titulo,
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const handleAddToWishlist = (product) => {
    // Comprobar si el producto ya está en la wishlist
    const alreadyInWishlist = wishlist.some(item => item.sku === product.sku);
  
    if (!alreadyInWishlist) {
      dispatch(addToWishlist(product)); // enviar todo el producto
      Swal.fire({
        icon: "success",
        title: "Agregado a favoritos",
        text: `${name} se ha agregado a la wishlist.`,
        imageUrl: image,
        imageAlt: titulo,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1200,
      });
    } else {
      // Mostrar un mensaje si el producto ya está en la wishlist
      Swal.fire({
        icon: "info",
        title: "Producto ya en favoritos",
        text: `${name} ya se encuentra en tu wishlist.`,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };
  

  return (
    <Card className="custom-shadow custom-card">
      <div className="imgContainer">
        <Card.Img variant="top" src={image} alt={titulo} />
      </div>
      <Card.Body className="text-center d-flex flex-column">
        <Card.Text className="titleCard">{name}</Card.Text>
        <Card.Title className="mb-4">
          ${" "}
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "COP",
          }).format(price)}
        </Card.Title>
        <div className="mt-3 text-center d-flex justify-content-between">
          <div>
          <Button
            variant="dark"
            as={Link}
            to={`/detail/${sku}`}
            className="mt-2 btn me-2 hover-effect"
          >
            <i className="bi bi-eye-fill"></i>
          </Button>
          </div>
          <div>
          <Button
            variant="success"
            className="mt-2 btn me-2 hover-effect"
            onClick={() => handleAddToCart(props)}
          >
            <i className="bi bi-cart-plus"></i>
          </Button>
          </div>
          <div>
          <Button
            variant="danger"
            className="mt-2 btn me-2 hover-effect"
            onClick={() => handleAddToWishlist(props)}
          >
            <i className="bi bi-heart"></i>
          </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Cards;
