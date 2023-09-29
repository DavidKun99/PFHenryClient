  import React, { useState, useEffect } from "react";
  import { useSelector,  } from "react-redux";

  const SearchResultMessage = () => {
    const searchResults = useSelector((state) => state.searchResults);
    const showResults = useSelector((state) => state.showResults);
    const [searchQuery, setSearchQuery] = useState("");

    
    useEffect(() => {
      // Actualiza el estado de búsqueda cuando cambian los resultados de búsqueda
      setSearchQuery(searchResults);
    }, [searchResults]);

    // Verifica si el usuario ha realizado una búsqueda
    
    if (showResults === false) {
      return (
        
            <div>
              No se encontraron resultados de búsqueda para: <strong>{searchQuery}</strong>
            </div>
       
        
      );
    }
    
    else {
      return (
        
            <div>
            <strong>{searchQuery}</strong>
            </div>
       
      );
    }
  };

  export default SearchResultMessage;
