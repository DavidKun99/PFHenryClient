// sortingUtils.js
  export const sortProductsByPrice = (products, order) => {
    return order === 'asc'
      ? [...products].sort((a, b) => a.price - b.price)
      : [...products].sort((a, b) => b.price - a.price);
  };
  