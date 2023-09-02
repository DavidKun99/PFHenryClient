import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  {getAllProducts} from "../../redux/actions/index";


export default function Home() {
    const products = useSelector((state) => state.products);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllProducts());
      }, [dispatch]);

    return (
        <div>
          <Link to="/">Salir</Link>
          <Link to="/detail">Detalles</Link>
        <h1>Esta es la vista de HOME</h1>
        <ul>
          {products.length > 0 ? (
            products.map((product) => (
              <li key={product.sku}>{product.titulo}</li>
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </ul>
      </div>
    );

};