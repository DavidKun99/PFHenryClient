import { useSelector } from "react-redux";

export const useLocalStorage = () => {
  const cartItems = useSelector((state) => state.cartItems);

  const saveLocal = () => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  return saveLocal;
};

