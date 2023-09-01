import axios from "axios";

export const ERROR = "ERROR";
export const GET_PODUCT_SUCCESS = 'GET_PODUCT_SUCCESS';
export const GET_PRODUCT_DETAIL_SUCCESS = 'GET_PRODUCT_DETAIL_SUCCESS';
export const GET_PRODUCT_DETAIL_FAILURE = 'GET_PRODUCT_DETAIL_FAILURE';

export const getAllProducts = () => {
    return async function(dispatch) {
    let errorMessage = '';

    try {
      const response = await axios.get('http://localhost:3001/products');
      const products = response.data;
      dispatch({type: GET_PODUCT_SUCCESS, payload: products});
    } catch (error) {
      errorMessage = 'Producto no encontrado';
      dispatch({type: ERROR, payload: errorMessage})
    }
    return errorMessage;
    }
  };


  export const getProductDetailActions = () => {
    return (dispatch) => {
      // Realizar una solicitud GET a la API para obtener los productos
      axios.get('http://localhost:3001/products')
        .then((response) => {
          // Filtrar los productos para mantener solo título, precio e imagen
          const filteredProducts = response.data.map((product) => ({
            titulo: product.titulo,
            price: product.price,
            image: product.image,
          }));
  
          // Despachar la acción con los detalles de productos filtrados
          dispatch({
            type: GET_PRODUCT_DETAIL_SUCCESS,
            payload: filteredProducts,
          });
        })
        .catch((error) => {
          // Despachar una acción de error si la solicitud falla
          dispatch({
            type: GET_PRODUCT_DETAIL_FAILURE,
            error: error.message,
          });
      });
    };
  };
  