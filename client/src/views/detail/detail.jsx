import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductDetailActions } from '../../redux/actions/index'; // Asegúrate de importar la acción correctamente

const Detail = () => {

  const productDetails = useSelector((state) => state.productDetails);
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(getProductDetailActions());
    }, [dispatch]);
    
    return (
      <div>
      <Link to="/home">Volver a Inicio</Link>
      <ul>
        {productDetails.map((product, index) => (
          <li key={index}>
            <p>Título: {product.titulo}</p>
            <p>Precio: {product.price}</p>
            <img src={product.image} alt={product.titulo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  productDetails: state.products.productDetails,
});

export default connect(mapStateToProps, { getProductDetailActions })(Detail);