import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRatings } from '../../redux/actions';

const ProductRating = ({ sku }) => {
  const dispatch = useDispatch();
  const ratings = useSelector((state) => state.ratings);

  useEffect(() => {
    // Cargar las calificaciones una vez que el componente se monte
    dispatch(getRatings());
  }, [dispatch]);

 
  // Función para calcular la mediana de calificaciones considerando un límite de 5
  const calculateMedianRating = (products) => {
    if (!products || products.length === 0) return 0;

    // Obtén todas las calificaciones en un array
    const allRatings = products.reduce((ratingsArray, product) => {
      return ratingsArray.concat(product.UserRatings.map((rating) => rating.rate));
    }, []);

    // Ordena las calificaciones de menor a mayor
    allRatings.sort((a, b) => a - b);

    // Calcula la mediana
    const middleIndex = Math.floor(allRatings.length / 2);

    if (allRatings.length % 2 === 0) {
      // Si la cantidad de calificaciones es par, promedia los dos valores en el medio
      const median = (allRatings[middleIndex - 1] + allRatings[middleIndex]) / 2;
      return Math.min(median, 5); // Limita la mediana a un máximo de 5
    } else {
      // Si la cantidad de calificaciones es impar, toma el valor en el medio
      return Math.min(allRatings[middleIndex], 5); // Limita la mediana a un máximo de 5
    }
  };

  const filteredProducts = ratings.filter((product) => product.sku === sku);

  const medianRating = calculateMedianRating(filteredProducts);

  // Función para renderizar las estrellas
  const renderStars = (rating) => {
    const stars = [];
    const starCount = Math.ceil(rating); // Redondear hacia arriba para mostrar la cantidad de estrellas

    if (starCount > 0) {
      for (let i = 1; i <= starCount; i++) {
        const starClass = 'star-colored';
        stars.push(<span key={i} className={`bi bi-star ${starClass}`}></span>);
      }
    }

    return stars;
  };

  // Mostrar un mensaje si la calificación es menor a 0.1
  const ratingMessage = medianRating < 0.1 ? 'No registra Calificaciones' : '';

  return (
    <div>
      <div>
        Calificación General: {ratingMessage ? null : renderStars(medianRating)}
      </div>
      <div>
        {ratingMessage}
      </div>
    </div>
  );
};

export default ProductRating;
