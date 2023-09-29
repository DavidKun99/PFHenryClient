import React, { useEffect } from "react";
import "../../components/css/index.css";
import { Link } from "react-router-dom";
import { useGetProductDetailHandler } from "../../components/handlers/handlersdetail";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getUserRating,
  getRatings,
  addToWishlist,
} from "../../redux/actions";
import ProductRating from "../../components/rating/ProductRating";
import ProductComment from "../../components/rating/ProductComment";
import UserRatingInfo from "../../components/rating/UserRatingInfo";
import Swal from "sweetalert2";

const Detail = () => {
  const productDetail = useGetProductDetailHandler();
  const dispatch = useDispatch();
  const product_id = productDetail ? productDetail.sku : null;
  const userId = localStorage.getItem("id");
  const wishlist = useSelector(state => state.wishlist);

  useEffect(() => {
    dispatch(getUserRating(userId));
    getRatings();
    // eslint-disable-next-line
  }, [dispatch]);

  if (!productDetail) {
    return <p>No se encontró información para el producto seleccionado.</p>;
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    Swal.fire({
      icon: "success",
      title: "Agregado al carrito",
      text: `${productDetail.titulo} se ha agregado al carrito.`,
      imageUrl: productDetail.image,
      imageAlt: productDetail.titulo,
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const handleAddToWishlist = (product) => {
    // Comprobar si el producto ya está en la wishlist
    const alreadyInWishlist = wishlist.some(item => item.sku === product.sku);
  
    if (!alreadyInWishlist) {
      dispatch(addToWishlist({
        ...product,
        name: productDetail.titulo, // Agregar el nombre del producto
      }));
  
      Swal.fire({
        icon: "success",
        title: "Agregado a favoritos",
        text: `${productDetail.titulo} se ha agregado a la wishlist.`,
        imageUrl: productDetail.image,
        imageAlt: productDetail.titulo,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1200,
      });
    } else {
      // Mostrar un mensaje si el producto ya está en la wishlist
      Swal.fire({
        icon: "info",
        title: "Producto ya en favoritos",
        text: `${productDetail.titulo} ya se encuentra en tu wishlist.`,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };
  

  return (
    <div style={{marginBottom:"20px"}}>
    <div className="container-detail" style={{ marginTop: "140px" }}>
      <h1 className="text-center" style={{ marginTop: "20px", marginBottom:"25px" }}>
        Detalle del producto
      </h1>
      <div 
          className="card custom-shadow  mx-auto"
          style={{ maxWidth: "1200px", marginTop: "10px", alignItems:"center"}}
            >
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div>
            <div className="card-body">
              <p className="card-text">N/P: {productDetail.number_part}</p>
              <h5 className="card-title">Nombre: {productDetail.titulo}</h5>
              <p className="card-text">Precio: {productDetail.price}</p>
              <p className="card-text">
                En stock: {productDetail.disponibility}
              </p>
              <p className="card-text">Detalle:</p>
              <ul>
                <li>Ram: {productDetail.detail.ram}</li>
                <li>Pantalla: {productDetail.detail.pantalla}</li>
                <li>Procesador: {productDetail.detail.procesador}</li>
                <li>Almacenamiento: {productDetail.detail.almacenamiento}</li>
              </ul>
              <ProductRating sku={product_id} />
              <UserRatingInfo sku={product_id} />
              <div className="text-center">
                <Button
                  variant="success"
                  className="mt-2 btn me-3 hover-effect"
                  onClick={() => handleAddToCart(productDetail)}
                >
                  <i className="bi bi-cart-plus"></i>
                </Button>
                <Button
                  variant="danger"
                  className="mt-2 btn me-3 hover-effect"
                  onClick={() => handleAddToWishlist(productDetail)}
                >
                  <i className="bi bi-heart"></i>
                </Button>
              </div>
              </div>              
          </div>
        </div>
        <div className="col-md-5">
          <div className="d-flex flex-column align-items-center">
            <img
              src={productDetail.image}
              alt={productDetail.titulo}
              className="img-detail"
            />
            <ProductComment productId={product_id} />
          </div>
        </div>
      </div>
      </div>

      </div>
      <div className="text-center mt-4">
        <Button variant="dark" as={Link} to="/Home">
          Volver a inicio
        </Button>
      </div>
    </div>
  );
};

export default Detail;
