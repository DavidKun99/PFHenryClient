import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchResults } from "../../redux/actions/index";
import searchIcon from '../../../node_modules/bootstrap-icons/icons/search.svg';

const SearchBarHandler = () => {
  // Definición de estados y referencias
  const [searchQuery, setSearchQuery] = useState(""); // Estado para almacenar la consulta de búsqueda
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1); // Estado para el índice de sugerencia activa
  const dispatch = useDispatch(); // Acceso al dispatcher de Redux
  const products = useSelector((state) => state.products); // Selector de productos desde el estado de Redux
  const [suggestions, setSuggestions] = useState([]); // Estado para las sugerencias de búsqueda
  const [showSuggestions, setShowSuggestions] = useState(false); // Estado para mostrar/ocultar sugerencias
  const inputRef = useRef(null); // Referencia al elemento de entrada de búsqueda

  // Función para obtener sugerencias de búsqueda
  const getSuggestions = (value) => {
    // Filtra productos basados en el título
    const filteredProducts = products.filter((product) =>
      product.titulo.toLowerCase().includes(value.toLowerCase())
    );

    // Extrae los títulos de los productos filtrados
    const productTitles = filteredProducts.map((product) => product.titulo);

    return productTitles.slice(0, 5); // Limita a mostrar solo 5 sugerencias
  };

  // Manejador de cambios en el campo de búsqueda
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    // Obtiene las sugerencias y muestra/oculta según el valor y la disponibilidad de sugerencias
    const suggestions = getSuggestions(value);
    setSuggestions(suggestions);
    setShowSuggestions(value !== "" && suggestions.length > 0);
  };

  // Manejador de envío de búsqueda
  const handleSearchSubmit = () => {
    dispatch(updateSearchResults(searchQuery)); // Despacha la acción de actualización de resultados de búsqueda
    setSearchQuery(""); // Limpia el campo de búsqueda después de la búsqueda
  };

  // Manejador de teclas presionadas
  const handleKeyDown = (event) => {
    if (suggestions.length === 0) return;

    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
        setSearchQuery(suggestions[activeSuggestionIndex]);
        break;

      case "ArrowDown":
        event.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
        );
        setSearchQuery(suggestions[activeSuggestionIndex===-1? 0 : activeSuggestionIndex ]);
        break;

      case "Enter":
        dispatch(updateSearchResults(searchQuery));
        setSearchQuery("");
        if (activeSuggestionIndex >= 0) {
          setShowSuggestions(false);
          setSearchQuery("");
        }
        break;
        
      default:
        break;
    }
  };

  // Manejador de clic en una sugerencia
  // Manejador de clic en una sugerencia
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion); // Establece la sugerencia como consulta de búsqueda
    setShowSuggestions(false); // Oculta las sugerencias al hacer clic en una
  };


  // Manejador de desplazamiento del mouse sobre una sugerencia
  const handleSuggestionHover = (index) => {
    setActiveSuggestionIndex(index); // Establece el índice de sugerencia activa al desplazar el mouse
  };

  // Manejador de pérdida de enfoque del campo de búsqueda
  const handleInputBlur = () => {
    setShowSuggestions(false); // Oculta las sugerencias al perder el enfoque
  };

  // Renderiza el componente de búsqueda
  return (
    <div className="position-relative">
      <div className="input-group">
        <input style={{width: '350px'}}
          ref={inputRef}
          className="form-control"
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
        />
        <div className="input-group-append">
          <button
            className="btn btn-dark"
            onClick={handleSearchSubmit}
            disabled={!searchQuery}
          >
            <img
              src={searchIcon}
              alt="Buscar"
              style={{ filter: 'invert(1)', fill: 'white', width: '1.6rem' }}
            />
          </button>
        </div>
      </div>
      {showSuggestions && (
        <ul className="list-group position-absolute" style={{ width: '100%', zIndex: 1 }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`list-group-item ${index === activeSuggestionIndex ? 'active' : ''}`}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => handleSuggestionHover(index)}
              role="button"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBarHandler;
