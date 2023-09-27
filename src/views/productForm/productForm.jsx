import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/actions/index";
import CloudImage from "../../components/cloudimage/cloudimage";
import "../../components/css/index.css";
import Button from "react-bootstrap/Button";

const ProductForm = () => {
  const dispatch = useDispatch();
  const [sku, setSku] = useState("");
  const [skuError, setSkuError] = useState("");
  const [numberPart, setNumberPart] = useState("");
  const [numberPartError, setNumberPartError] = useState(""); 
  const [titulo, setTitulo] = useState("");
  const [idBrand, setIdBrand] = useState(1);
  const [idCategory, setIdCategory] = useState(84);
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [disponibility, setDisponibility] = useState("");
  const [ram, setRam] = useState("");
  const [ramError, setRamError] = useState("");
  const [pantalla, setPantalla] = useState("");
  const [pantallaError, setPantallaError] = useState("");
  const [procesador, setProcesador] = useState("");
  const [procesadorError, setProcesadorError] = useState("");
  const [almacenamiento, setAlmacenamiento] = useState("");
  const [almacenamientoError, setAlmacenamientoError] = useState("");
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (imageUrl) => {
    setImageUrl(imageUrl); // Actualiza el estado de la URL de la imagen
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar que el stock sea al menos 1
    if (disponibility < 1 || isNaN(parseInt(idCategory))) {
      // Validar que el stock sea al menos 1 y que idCategory sea un número válido
      return;
    }

    const parsedSku = parseInt(sku);
    const parsedIdBrand = parseInt(idBrand);

    if (isNaN(parsedSku) || isNaN(parsedIdBrand)) {
      return;
    }


    const productData = {
      sku: parsedSku,
      number_part: numberPart,
      titulo: titulo,
      id_brand: parsedIdBrand,
      id_category: parseInt(idCategory),
      price: parseFloat(price),
      image: imageUrl,
      disponibility: disponibility,
    };

    // Agregar campos opcionales solo si se han completado
    if (ram) {
      productData.detail = { ...productData.detail, ram };
    }
    if (pantalla) {
      productData.detail = { ...productData.detail, pantalla };
    }
    if (procesador) {
      productData.detail = { ...productData.detail, procesador };
    }
    if (almacenamiento) {
      productData.detail = { ...productData.detail, almacenamiento };
    }

    try {
      // Enviar los datos del producto al servidor y esperar la respuesta
      await dispatch(createProduct(productData));
      // Marcar el producto como creado con éxito
      setIsProductCreated(true);

      // Limpia el formulario después de enviar
      setSku("");
      setNumberPart("");
      setIdBrand(1);
      setIdCategory(84);
      setPrice("");
      setDisponibility(1); // Reinicia a 1
      setRam("");
      setPantalla("");
      setProcesador("");
      setAlmacenamiento("");
      setImageUrl(""); // Reinicia el estado de imageUrl
    } catch (error) {
      // Manejar errores, mostrar un mensaje de error si es necesario
      console.error("Error al crear el producto:", error);
      // Otra lógica de manejo de errores si es necesario
    }
  };


  return (
    <div
      style={{
        minHeight: "calc(100vh - 100px)",
        marginTop: "140px",
        marginBottom: "30px",
      }}
    >
      <h2 className="text-center">Crear Producto</h2>
      {isProductCreated ? (
        <div className="alert alert-success">Producto creado con éxito</div>
      ) : (
        <div className="card mx-auto col-12 col-md-8 col-lg-6 custom-shadow">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-8">
                <div className="mb-3">
                      <label htmlFor="sku" className="form-label">
                        <span>SKU:</span>
                        <input
                          type="text"
                          id="sku"
                          value={sku}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            setSku(newValue);

                            if (newValue === "") {
                              setSkuError("");
                            } else if (!/^[0-9]{1,8}$/.test(newValue)) {
                              setSkuError("Número de caracteres o formato no válido");
                            } else {
                              setSkuError(""); 
                            }
                          }}
                          required
                          className={`form-control ${skuError ? 'is-invalid' : ''}`}
                        />
                        {skuError && (
                          <div className="invalid-feedback">{skuError}</div>
                        )}
                      </label>
                    </div>
                  <div className="mb-3">
                          <label htmlFor="numberPart" className="form-label">
                            <span>Number Part:</span>
                            <input
                              type="text"
                              id="numberPart"
                              value={numberPart}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                setNumberPart(newValue);

                                if (newValue === "") {
                                  setNumberPartError(""); 
                                } else if (!/^[a-zA-Z0-9]{1,10}$/.test(newValue)) {
                                  setNumberPartError("Número de caracteres o formato no válido");
                                } else {
                                  setNumberPartError("");
                                }
                              }}
                              required
                              className={`form-control ${numberPartError ? "is-invalid" : ""}`}
                            />
                            {numberPartError && (
                              <div className="invalid-feedback">{numberPartError}</div>
                            )}
                          </label>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="titulo" className="form-label">
                            <span>Título:</span>
                            <input
                              type="text"
                              id="titulo"
                              value={titulo}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (inputValue.length <= 25) {
                                  setTitulo(inputValue);
                                }
                              }}
                              required
                              className="form-control"
                            />
                          </label>
                        </div>
                  <div className="mb-3">
                    <label htmlFor="idBrand" className="form-label">
                      <span>Marca:</span>
                      <select
                        id="idBrand"
                        value={idBrand}
                        onChange={(e) => setIdBrand(e.target.value)}
                        required
                        className="form-select"
                      >
                        <option value="1">Apple</option>
                        <option value="12">HP</option>
                        <option value="20">Samsung Electronics</option>
                        <option value="27">Viewsonic</option>
                        <option value="30">Lenovo</option>
                      </select>
                    </label>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="idCategory" className="form-label">
                      <span>Categoría:</span>
                      <select
                        id="idCategory"
                        value={idCategory}
                        onChange={(e) => setIdCategory(e.target.value)}
                        required
                        className="form-select"
                      >
                        <option value="84">Portátiles</option>
                        <option value="32">Monitores</option>
                        <option value="82">CPU</option>
                      </select>
                    </label>
                  </div>
                  <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                          <span>Precio:</span>
                          <input
                            type="text"
                            id="price"
                            value={price}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              if (inputValue.length > 30) {
                                setPriceError("El precio no debe tener más de 30 caracteres.");
                                return;
                              } else {
                                setPriceError("");
                              }

                              if (/^\d+(\.\d*)?$/.test(inputValue) || inputValue === "") {
                                setPrice(inputValue);
                              } else {
                                setPriceError("Precio no válido. Use números y un punto decimal.");
                              }
                            }}
                            required
                            className={`form-control ${priceError ? "is-invalid" : ""}`}
                          />
                          {priceError && <div className="invalid-feedback">{priceError}</div>}
                        </label>
                      </div>
                     <div className="mb-3">
                          <label htmlFor="stock" className="form-label">
                            <span>Stock:</span>
                            <input
                              type="number"
                              id="stock"
                              value={disponibility}
                              onChange={(e) =>
                                setDisponibility(
                                  Math.max(1, parseInt(e.target.value))
                                )
                              }
                              required
                              className="form-control"
                            />
                          </label>
                        </div>
                      </div>
                     <div className="col-md-4">
                        <div className={`mb-3 ${ramError ? 'has-error' : ''}`}>
                          <label htmlFor="ram" className="form-label">
                            <span>Ram:</span>
                            <input
                              type="text"
                              id="ram"
                              value={ram}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                setRam(newValue);

                                if (newValue === "") {
                                  setRamError(""); 
                                } else if (!/^[a-zA-Z0-9]{1,10}$/.test(newValue)) {
                                  setRamError("Número de caracteres o formato no válido");
                                } else {
                                  setRamError("");
                                }
                              }}
                              className={`form-control ${ramError ? 'is-invalid' : ''}`}
                            />
                            {ramError && (
                              <div className="invalid-feedback">{ramError}</div>
                            )}
                          </label>
                        </div>
                       <div className="mb-3">
                        <label htmlFor="pantalla" className="form-label">
                          <span>Pantalla:</span>
                          <input
                            type="text"
                            id="pantalla"
                            value={pantalla}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              setPantalla(newValue); 

                              if (newValue === "") {
                                setPantallaError("");
                              } else if (!/^[0-9]{1,5}$/.test(newValue)) {
                                setPantallaError("Número de caracteres o formato no válido");
                              } else {
                                setPantallaError(""); 
                              }
                            }}
                            required
                            className={`form-control ${pantallaError ? 'is-invalid' : ''}`}
                          />
                          {pantallaError && (
                            <div className="invalid-feedback">{pantallaError}</div>
                          )}
                        </label>
                      </div>
                      <div className="mb-3">
                            <label htmlFor="procesador" className="form-label">
                              <span>Procesador:</span>
                              <input
                                type="text"
                                id="procesador"
                                value={procesador}
                                onChange={(e) => {
                                  const newValue = e.target.value;
                                  setProcesador(newValue);

                                  if (newValue === "") {
                                    setProcesadorError("");
                                  } else if (!/^(?! )[a-zA-Z0-9][a-zA-Z0-9 -]*[a-zA-Z0-9]$/.test(newValue)) {
                                    setProcesadorError("Número de caracteres o formato no válido");
                                  } else {
                                    setProcesadorError("");
                                  }
                                }}
                                className={`form-control ${procesadorError ? 'is-invalid' : ''}`}
                              />
                              {procesadorError && (
                                <div className="invalid-feedback">{procesadorError}</div>
                              )}
                            </label>
                          </div>
                    <div className="mb-3">
                      <label htmlFor="almacenamiento" className="form-label">
                        <span>Almacenamiento:</span>
                        <input
                          type="text"
                          id="almacenamiento"
                          value={almacenamiento}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            setAlmacenamiento(newValue); 

                            if (newValue === "") {
                              setAlmacenamientoError("");
                            } else if (!/^[a-zA-Z0-9]{1,5}$/.test(newValue)) {
                              setAlmacenamientoError("Número de caracteres o formato no válido");
                            } else {
                              setAlmacenamientoError("");
                            }
                          }}
                          className={`form-control ${almacenamientoError ? 'is-invalid' : ''}`}
                        />
                        {almacenamientoError && (
                          <div className="invalid-feedback">{almacenamientoError}</div>
                        )}
                      </label>
                    </div>
                </div>
              </div>
                <div className="card-body d-flex align-items-center justify-content-center">
                  <CloudImage onImageUpload={handleImageUpload} />
                </div>
              <div className="text-center mt-4">
                <Button type="submit" variant="dark">
                  Crear Producto
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;