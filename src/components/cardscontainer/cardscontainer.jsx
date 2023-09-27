import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../card/card";
import { sortProductsByPrice } from '../sortingUtils/sortingUtils';
import { getAllProducts , setShowResults} from "../../redux/actions/index";
import Paginator from "../paginator/paginator";

const CardsContainer = () => {
  const allProducts = useSelector((state) => state.products);
  const orderByPrice = useSelector((state) => state.orderByPrice);
  const searchResults = useSelector((state) => state.searchResults);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  let sortedProducts = [...allProducts];

  if (orderByPrice !== null) {
    sortedProducts = orderByPrice === 'asc'
      ? sortProductsByPrice(sortedProducts, 'asc')
      : sortProductsByPrice(sortedProducts, 'desc');
  }


  useEffect(() => {
    if (searchResults.length > 0) {
      dispatch(setShowResults(true));
    } else {
      dispatch(setShowResults(false));
    }
  }, [searchResults]);
  if (searchResults.length > 0) {
    sortedProducts = sortedProducts.filter((product) =>
      product.titulo.toLowerCase().includes(searchResults.toLowerCase())
    );
  };

  // Número de tarjetas por página
  const cardsPerPage = 12;


  // Estado para almacenar la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular el índice de inicio y final de las tarjetas en la página actual
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  // Filtrar las tarjetas que se mostrarán en la página actual
  const cardsToShow = sortedProducts.slice(startIndex, endIndex);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(sortedProducts.length / cardsPerPage);

  // Función para cambiar de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

   // Establecer la página actual en 1 cuando se realice una búsqueda o cambio en el orden
   useEffect(() => {
    setCurrentPage(1);
  }, [searchResults, orderByPrice]);

  if (sortedProducts.length > 0) {
    dispatch(setShowResults(true));
  } else {
    dispatch(setShowResults(false));
  }

  return (
    <div className="container">
      <div className="row">
        {cardsToShow.map((product) => (
          <div key={product.sku} className="col-md-4">
            <Card
              sku={product.sku}
              name={product.titulo}
              price={product.price}
              image={product.image}
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Paginator
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        </div>
    </div>
  );
};

export default CardsContainer;
