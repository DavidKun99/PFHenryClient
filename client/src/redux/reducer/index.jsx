import { ERROR, GET_PODUCT_SUCCESS, GET_PRODUCT_DETAIL_SUCCESS, GET_PRODUCT_DETAIL_FAILURE } from "../actions/index";

const initialState = {
  products: [],
  productDetails:[],
  error: "", // Agrega un campo de error para manejar los errores.
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload, // Actualiza solo la lista de productos.
        error: "", // Reinicia el campo de error.
      };
    case GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetails: action.payload,
        error: null,
      };
    case GET_PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        productDetails: [],
        error: action.error,
      };

    default:
      return state;
  }
};

export default rootReducer;
