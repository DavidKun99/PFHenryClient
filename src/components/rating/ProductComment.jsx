import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRatings } from '../../redux/actions';
import { Card } from 'react-bootstrap';

const ProductComment = ({ productId }) => {
  const dispatch = useDispatch();
  
  const ratings = useSelector((state) => state.ratings);

  useEffect(() => {
    // Cargar las calificaciones una vez que el componente se monte
    dispatch(getRatings());
  }, [dispatch]);

  // Función para obtener todos los comentarios para un producto específico
  const getAllCommentsForProduct = (productId) => {
    return ratings
      .filter((product) => product.sku === productId)
      .flatMap((product) => product.UserRatings);
  };

  const allComments = getAllCommentsForProduct(productId);

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

  return (
    <div>
    <Card className="mx-auto mt-3 float-right" style={{ maxWidth: '400px' }}>
      <Card.Body className="text-left">
        <Card.Title className="text-center">Comentarios:</Card.Title>
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          <ul className="list-group">
            {allComments.map((comment, index) => (
              <li key={index} className="list-group-item list-group-item-action">
                
                 <span className="ml-2"> 
                {renderStars(comment.rate)} : 
                </span>
                ! {comment.review} ! 
               
              </li>
            ))}
          </ul>
        </div>
      </Card.Body>
    </Card>
  </div>
  );
};

export default ProductComment;