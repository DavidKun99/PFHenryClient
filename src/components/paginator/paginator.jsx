import React, {useEffect} from "react";

function Paginator({ totalPages, currentPage, onPageChange }) {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  useEffect(() => {
    // Verificar si la página actual es válida en los nuevos resultados del filtro
    if (currentPage > totalPages) {
      onPageChange(1); // Establecer la página en 1 si no es válida
    }
  }, [currentPage, totalPages, onPageChange]);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link bg-dark text-white"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Anterior
          </button>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li
            key={index}
            className={`page-item ${
              index + 1 === currentPage ? "active" : ""
            }`}
          >
            <button
              className={`page-link ${
                index + 1 === currentPage
                  ? "bg-dark text-white"
                  : "bg-dark text-secondary"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link bg-dark text-white"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginator;
