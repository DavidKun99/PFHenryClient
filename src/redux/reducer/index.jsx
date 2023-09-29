import {
  ERROR,
  GET_PODUCT_SUCCESS,
  GET_PRODUCT_DETAIL,
  SORT_PRODUCTS_BY_PRICE,
  CREATE_PRODUCT,
  UPDATE_SEARCH_RESULTS,
  RESET_SELECTED_BRAND_CATEGORY,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CREATE_RATING,
  GET_RATINGS,
  SET_SHOW_RESULTS,
  LOGOUT,
  LOGIN,
  FETCH_USER_RATING_SUCCESS,
  FETCH_USER_RATING_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  GET_ORDERS,
  GET_USERS,
  UPDATE_PRODUCT,
  UPDATE_FAVORITES,
  UPDATE_CART,
  DELETE_CART,
} from "../actions/index";

const initialState = {
  product: null,
  products: [], // Mantén el estado original para todos los productos
  productDetails: {},
  error: "",
  orderByPrice: null, // Usar null para indicar que no hay ordenamiento por defecto
  searchResults: [],
  SelectedBrand: "",
  SelectedCategory: "",
  items: [],
  user: null,
  loadedUser: null,
  cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  ratings: [],
  isLoggedIn: localStorage.getItem("token") ? true : false,
  showResults: false,
  userDataRating: null,
  loading: false,
  success: false,
  wishlist: [],
  users: [],
  orders: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT:
      // Busca el índice del producto en el array de products
      const productIndex = state.products.findIndex(product => product.sku === action.payload.sku);

      if (productIndex !== -1) {
        // Clona el array de products y actualiza el producto en la posición correcta
        const updatedProducts = [...state.products];
        updatedProducts[productIndex] = { ...updatedProducts[productIndex], ...action.payload };

        return {
          ...state,
          products: updatedProducts,
        };
      }

      // Si el producto no se encontró en la lista, no se realiza ninguna actualización
      return state;
    case UPDATE_FAVORITES:
      return { ...state, wishlist: action.payload };
    case UPDATE_CART:
      return { ...state, cartItems: action.payload };
    case GET_USERS:
      return { ...state, users: action.payload };
    case GET_ORDERS:
      return { ...state, orders: action.payload };
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        loadedUser: action.payload
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
        error: "",
      };

    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          [action.payload.sku]: action.payload,
        },
        error: "",
      };

    case CREATE_PRODUCT:
      return {
        ...state,
        creatingProduct: false,
        creatinProductError: null,
      };

    case SORT_PRODUCTS_BY_PRICE:
      return {
        ...state,
        orderByPrice: action.payload,
      };

    case UPDATE_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload, // Actualiza los resultados de búsqueda
      };

    case RESET_SELECTED_BRAND_CATEGORY:
      return {
        ...state,
        SelectedBrand: "",
        SelectedCategory: "",
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case CREATE_USER_FAIL:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loadedUser: action.payload,
        error: null,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        loadedUser: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        loadedUser: null,
        isLoggedIn: false, // Establece 'user' en null al cerrar sesión
        cartItems: [],
        wishlist: [],
      };

    case ADD_TO_CART:
      const productToAdd = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.sku === productToAdd.sku
      );

      if (existingProduct) {
        // Si el producto ya está en el carrito, aumenta la cantidad
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.sku === existingProduct.sku
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Si el producto no está en el carrito, agrégalo
        return {
          ...state,
          cartItems: [...state.cartItems, { ...productToAdd, quantity: 1 }],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.sku !== action.payload
        ),
      };

      case DELETE_CART:
        return {
          ...state,
          cartItems: []
        };
  


    case INCREASE_QUANTITY:
      const skuToIncrease = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.sku === skuToIncrease
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.sku === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case CREATE_RATING:
      return {
        ...state,
        ratings: [action.payload, ...state.ratings],
      };
    case GET_RATINGS:
      return {
        ...state,
        ratings: action.payload,
      };
    case SET_SHOW_RESULTS:
      return { ...state, showResults: action.showResults };

    case FETCH_USER_RATING_SUCCESS:
      return {
        ...state,
        userDataRating: action.payload,
        error: null,
      };
    case FETCH_USER_RATING_FAILURE:
      return {
        ...state,
        userDataRating: null,
        error: action.error,
      };
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };


    case ADD_TO_WISHLIST:
      const newItem = action.product;

      return {
        ...state,

        wishlist: [...state.wishlist, newItem],
      };

    case REMOVE_FROM_WISHLIST:
      const updatedWishlist = state.wishlist.filter(
        (item) => item.sku !== action.product.sku
      );
      return {
        ...state,
        wishlist: updatedWishlist,
      };

    default:
      return state;
  }
};

export default rootReducer;
