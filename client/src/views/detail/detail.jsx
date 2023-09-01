import 'tailwindcss/tailwind.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Detail = ({ sku }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Realizar una solicitud GET al servidor para obtener los detalles del producto basado en el SKU
    axios.get(`/productos/${sku}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del producto:', error);
      });
  }, [sku]);

  // Renderizar los detalles del producto
  return (
    <div>
      {product ? (
        <div>
          <h2>{product.titulo}</h2>
          <p>Precio: ${product.price}</p>
          <p>Disponibilidad: {product.disponibility} unidades</p>
          <p>Descripción: {product.detail.pantalla}, {product.detail.procesador}, {product.detail.almacenamiento}, {product.detail.ram}</p>
          <img src={product.image} alt={product.titulo} />
        </div>
      ) : (
        <p>Cargando detalles del producto...</p>
      )}
    </div>
  );
};

export default Detail;
