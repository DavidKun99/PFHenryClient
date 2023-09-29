import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserRating } from '../../redux/actions/index';

const UserRatingInfo = ({ sku }) => { 
  const dispatch = useDispatch();
  const userId = localStorage.getItem('id');
  const userDataRating = useSelector((state) => state.userDataRating);

  useEffect(() => {
    if (userId) {
      dispatch(getUserRating(userId));
    }
  }, [dispatch, userId]);

  // Obtener el estado global actual de userDataRating
  const userRatingData = userDataRating || {}; // Si es null, establecer un objeto vacío

  // Filtrar las calificaciones del usuario para el producto con 'sku' específico
  const userRatingForProduct = userRatingData.UserRatings
    ? userRatingData.UserRatings.find((rating) => rating.product_id === sku)
    : null;


   // Función para renderizar las estrellas
   const renderStars = (rating) => {
    const stars = [];
    const starCount = Math.ceil(rating); // Redondear hacia arriba para mostrar la cantidad de estrellas

    if (starCount > 0) {
      for (let i = 1; i <= starCount; i++) {
        const starClass = 'bi bi-star star-colored';
        stars.push(<span key={i} className={starClass}></span>);
      }
    }

    return stars;
  };
  if (userRatingForProduct) {
    return (
      <div>
        <p>Mi Calificacion: {renderStars(userRatingForProduct.rate)}</p>
        <p>Mi Comentario: {userRatingForProduct.review}</p>
      </div>
    );
  } else {
    // Si el usuario no ha calificado el producto, puedes mostrar un mensaje o null
    return null;
  }
};

export default UserRatingInfo;
