import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import "../../components/css/index.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { baseURL } from "../../redux/actions";


const apiUrl = "TEST-77c820a7-513b-44a4-8b2d-01ea41494588";
const POST_NEW_ORDER = baseURL +"/order/create";
const POST_PAYMENT = baseURL + "/payments/generate";

initMercadoPago(apiUrl);

const BuyPage = () => {
  const cartItems = useSelector((state) => state.cartItems);
  console.log(cartItems)

  const calculateTotal = () => {
    let total = 0;

    // Recorre los elementos en el carrito y suma el precio de cada producto
    for (const item of cartItems) {
      
        total += item.quantity * item.price;
    }
    return total;
  };

  const userId = localStorage.getItem('id');

  const handlePayment = async () => {
    const total = calculateTotal(); 
    const response = await axios.post(POST_NEW_ORDER, {
      userId: userId,
      products: cartItems,
      totalprice: total,
    });
    console.log(response );
  localStorage.setItem('orderId', response.data.order.id)
  
    window.location.href = response.data.init_point;
    
  };
  

  return (
    <div>
      <Row className="mt-3">
        <Col
          md={8}
          className="mx-auto"
          style={{
            margin: "150px",
            border: "gray solid 1px",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.5)",
            marginBottom: "50px",
          }}
        >
          <div>
            <h2 className="text-center" style={{ fontWeight: 700 }}>
              Resumen de Compra
            </h2>
            <div>
              <div className="card-body">
                {cartItems.map((item) => {
                  return (
                    <Card key={item.sku} className="mb-3">
                      <Row className="no-gutters">
                        <Col md={4}>
                          <img
                            src={item?.image ? item.image : "https://media.istockphoto.com/id/1396814518/es/vector/imagen-pr%C3%B3ximamente-sin-foto-sin-imagen-en-miniatura-disponible-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=aA0kj2K7ir8xAey-SaPc44r5f-MATKGN0X0ybu_A774="}
                            alt={item?.title}
                            className="img-detail img-fluid"
                          />
                        </Col>
                        <Col md={8}>
                          <div className="card-body">
                            <h5 className="card-title">
                              Nombre: {item?.name}
                            </h5>
                            <p className="card-text">
                              Precio: ${item?.price}
                            </p>
                            <p className="card-text">
                            Cantidad: {item?.quantity}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  );
                })}
              </div>
            </div>
            <h3 
              className="d-flex justify-content-end mt-4"
              style={{ margin: "30px" }}
            >
              Total: ${calculateTotal()}
            </h3>

            <Button
              variant="primary"
              onClick={handlePayment}
              style={{ width: "30%" }}
              className="float-end"
            >                            
              Pagar
            </Button>
          </div>
        </Col>
      </Row>
      <div className="text-center m-4">
        <Button variant="dark" as={Link} to="/cart">
          Volver al carrito
        </Button>
      </div>
    </div>
  );
};

export default BuyPage;
