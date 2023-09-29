import axios from "axios";
import Swal from "sweetalert2";
export const UPDATE_SEARCH_RESULTS = "UPDATE_SEARCH_RESULTS";
export const ERROR = "ERROR";
export const GET_PODUCT_SUCCESS = "GET_PODUCT_SUCCESS";
export const GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL";
export const SORT_PRODUCTS_BY_PRICE = "SORT_PRODUCTS_BY_PRICE";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const RESET_SELECTED_BRAND_CATEGORY = "RESET_SELECTED_BRAND_CATEGORY";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAIL = "CREATE_USER_FAIL";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAIL = "LOAD_USER_FAIL";
export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const CREATE_RATING = "CREATE_RATING";
export const GET_RATINGS = "GET_RATINGS";
export const SET_SHOW_RESULTS = "SET_SHOW_RESULTS";
export const FETCH_USER_RATING_SUCCESS = 'FETCH_USER_RATING_SUCCESS';
export const FETCH_USER_RATING_FAILURE = 'FETCH_USER_RATING_FAILURE';
export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
export const GET_USERS = "GET_USERS";
export const GET_ORDERS = "GET_ORDERS";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const UPDATE_FAVORITES = "UPDATE_FAVORITES";
export const UPDATE_CART = "UPDATE_CART";
export const DELETE_CART = "DELETE_CART";

export const baseURL = "http://localhost:3001"

export const updateProduct = (productId, updatedFields) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(baseURL + `/products/${productId}`, {
        updatedFields: updatedFields, // Envía el objeto anidado como updatedFields
      });

      dispatch({
        type: UPDATE_PRODUCT,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error al actualizar el producto', error);
    }
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    const apiData = await axios.get(baseURL +"/user");
    const users = apiData.data;
    dispatch({ type: GET_USERS, payload: users });
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    const apiData = await axios.get(baseURL +"/order");
    const orders = apiData.data;
    dispatch({ type: GET_ORDERS, payload: orders });
  };
};


export const getCart = (id) => {
  return async (dispatch) => {
    try{
    const apiData = await axios.get(baseURL +`/cart/${id}`);
    const cart = apiData.data;
    dispatch({ type: UPDATE_CART, payload: cart });
    } catch(error){
      console.log(error)
    }
  };
};

export const pushCart = (id, products) => {
  return async (dispatch) => {
    try{
    await axios.post(baseURL +`/cart`, {userId: id, products: products});
    } catch(error){
      console.log(error)
    }
  };
};

export const getFavorites = (id) => {
  return async (dispatch) => {
    try{
    const apiData = await axios.get(baseURL +`/favorite/${id}`);
    const favorites = apiData.data;
    dispatch({ type: UPDATE_FAVORITES, payload: favorites });
    } catch(error){
      console.log(error)
    }
  };
};

export const pushFavorites = (id, products) => {
  return async (dispatch) => {
    try{
    await axios.post(baseURL +`/favorite`, {userId: id, products: products});
    } catch(error){
      console.log(error)
    }
  };
};

export const removeFromWishlist = (product) => {
  return {
    type: REMOVE_FROM_WISHLIST,
    product,
  };
};
export const deleteCart = () => {
  return async (dispatch)=> {
    dispatch({ type: DELETE_CART});
  //  localStorage.removeItem('cart')
  //  const id = localStorage.getItem('id')
  //  await axios.post(baseURL + '/cart', {userId: id, products:[]})
  };
};
export const addToWishlist = (product) => {
  return {
    type: ADD_TO_WISHLIST,
    product, 
  };
};

export const increaseQuantity = (sku) => {
  return {
    type: INCREASE_QUANTITY,
    payload: sku,
  };
};

export const decreaseQuantity = (sku) => {
  return {
    type: DECREASE_QUANTITY,
    payload: sku,
  };
};

export const addToCart = (product) => {
  localStorage.setItem('cart', product)
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};
export const removeFromCart = (product) => {
  return {
    type: REMOVE_FROM_CART,
    payload: product,
  };
};

export const getAllProducts = () => {
  return async function (dispatch) {
    let errorMessage = "";

    try {
      const response = await axios.get(baseURL +"/products");
      dispatch({ type: GET_PODUCT_SUCCESS, payload: response.data });
    } catch (error) {
      errorMessage = "Producto no encontrado";
      dispatch({ type: ERROR, payload: errorMessage });
    }
    return errorMessage;
  };
};

export const getProductDetail = (sku) => {
  return async function (dispatch, getState) {
    const { products } = getState(); // Obtener la lista de productos del estado
    let errorMessage = "";

    // Verificar si el producto ya está en la lista
    if (!products[sku]) {
      // Si el producto no está en la lista, obtener todos los productos primero
      const errorMessage = await dispatch(getAllProducts());
      if (errorMessage) {
        // Manejar el error si falla la obtención de la lista de productos
        return errorMessage;
      }
    }

    // Ahora puedes buscar los detalles del producto
    try {
      const response = await axios.get(baseURL +`/products/sku/${sku}`);
      dispatch({ type: GET_PRODUCT_DETAIL, payload: response.data });
    } catch (error) {
      error = "Producto no encontrado";
      dispatch({ type: ERROR, payload: error });
    }

    return errorMessage;
  };
};

export const createProduct = (payload) => {
  return async (dispatch) => {
    try {
      await axios.post(baseURL +"/products", payload);
      dispatch({ type: CREATE_PRODUCT });
    } catch (error) {
      const errorMessage = "Error al crear el producto";
      dispatch({ type: ERROR, payload: errorMessage });
    }
  };
};

export const sortProductsByPrice = (orderBy) => {
  return {
    type: SORT_PRODUCTS_BY_PRICE,
    payload: orderBy,
  };
};

export const filterByBrand = (brandId) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        baseURL +`/products/brands/${brandId}`
      );
      dispatch({ type: GET_PODUCT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR, payload: "Error al filtrar por marca" });
    }
  };
};

export const filterByCategory = (categoryId) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        baseURL +`/products/categories/${categoryId}`
      );
      dispatch({ type: GET_PODUCT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR, payload: "Error al filtrar por categoría" });
    }
  };
};

export const getCategories = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        baseURL +`/products/categories/`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const getBrands = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        baseURL +`/products/brands/`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
};
export const getProductFilter = (id_brand, id_category) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        baseURL +`/products/filter/`,
        { id_brand: id_brand, id_category: id_category }
      );
      console.log(response);

      dispatch({ type: GET_PODUCT_SUCCESS, payload: response.data });
      return "si";
    } catch (error) {
      dispatch({ type: ERROR, payload: "Error al filtrar" });
    }
  };
};
export const resetFilters = () => {
  return async function (dispatch) {
    dispatch(getAllProducts());
    dispatch({
      type: UPDATE_SEARCH_RESULTS,
      payload: [], // Reinicia los resultados de búsqueda a un array vacío
    });
    dispatch({
      type: SORT_PRODUCTS_BY_PRICE,
      payload: null, // Reinicia el ordenamiento de productos a null
    });
    dispatch({
      type: RESET_SELECTED_BRAND_CATEGORY, // Define un nuevo tipo de acción para reiniciar las selecciones de marca y categoría
    });
  };
};

export const updateSearchResults = (results) => {
  return {
    type: UPDATE_SEARCH_RESULTS,
    payload: results,
  };
};

//login

export const login = (formData) => async (dispatch) => {
  try{
    const res = await axios.post(baseURL +"/user/login", formData);
    const token = res.data.token
    const user = res.data.user
    localStorage.setItem("token", token)
    localStorage.setItem("id", user.id);
    dispatch({ type: LOGIN, payload:{user: user} });
  } catch(error){
    Swal.fire({
    icon: "error",
    title: "Login Failed! Please Check Your Data",
  })}
};

export const loginGoogle = (formData) => {
  return async (dispatch)=>{
    const res = await axios.post(baseURL +"/user/google", formData);
    const token = res.data.token
    const user = res.data.user
    localStorage.setItem("token", token)
    localStorage.setItem("id", user.id);
    dispatch({ type: LOGIN, payload:{user: user} });
    // window.location.reload();
  }
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("cart");
    dispatch({ type: LOGOUT });
    Swal.fire({
      icon: "success",
      title: "Logged Out Successfully",
    })
  };
};

export const createUser = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(baseURL +"/user", formData);
    // Disparar una acción de éxito con los datos del nuevo usuario
    dispatch({ type: CREATE_USER_SUCCESS, payload: res.data });
    return "Success"
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "The email has already been registered use a new one",
    })
    dispatch({ type: CREATE_USER_FAIL, payload: error.response.data });
    return "Error"
  }
};

export const loadUserById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(baseURL +`/user/id/${userId}`);
    dispatch({ type: LOAD_USER_SUCCESS, payload:{ user:res.data } });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.message });
  }
};


export const updatePassword = (userId, user_password) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    try {
      // Obtener el token de autenticación desde el almacenamiento local
      const token = localStorage.getItem('token');

      if (!token) {
        // Manejar el caso en el que el token no esté presente
        throw new Error('Token de autenticación no encontrado');
      }

      // Configurar las cabeceras de la solicitud para incluir el token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Realizar la solicitud PUT al backend con la contraseña en el cuerpo de la solicitud
      const response = await axios.put(baseURL +`/user/id/${userId}`, {
        user_password: user_password,
      }, config);

      // Si la solicitud se completa con éxito, despacha la acción de éxito
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: response.data });
    } catch (error) {
      // Si hay un error en la solicitud, despacha la acción de fallo
      dispatch({ type: UPDATE_PASSWORD_FAILURE, error: error.message });
    }
  };
};


export const createRating = (userId,product_id, rate, review) => async (dispatch) => {
  try {


    const response = await axios.post(baseURL +'/rating', {
      userId,
      product_id,
      rate,
      review,
    });

    dispatch({
      type: CREATE_RATING,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error al crear la calificación:", error);
  }
};

// Acción para obtener todas las calificaciones
export const getRatings = () => async (dispatch) => {
  try {
    const response = await axios.get(baseURL +"/rating");
    dispatch({
      type: GET_RATINGS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error al obtener las calificaciones:", error);
  }
};

export const getUserRating = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(baseURL +`/rating/id/${userId}`);
    dispatch({
      type: FETCH_USER_RATING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_RATING_FAILURE,
      error: error.message,
    });
  }
};
export const setShowResults = (showResults) => ({
  type: 'SET_SHOW_RESULTS',
  showResults,
});