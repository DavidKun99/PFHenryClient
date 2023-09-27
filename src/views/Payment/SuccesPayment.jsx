import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { baseURL } from "../../redux/actions";

const SuccessPurchase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const collection_id = searchParams.get("collection_id")
    ? searchParams.get("collection_id")
    : null;
  const collection_status = searchParams.get("collection_status")
    ? searchParams.get("collection_status")
    : null;
  const payment_id = searchParams.get("payment_id")
    ? searchParams.get("payment_id")
    : null;
  const status = searchParams.get("status") ? searchParams.get("status") : null;
  const payment_type = searchParams.get("payment_type")
    ? searchParams.get("payment_type")
    : null;
  const merchant_order_id = searchParams.get("merchant_order_id")
    ? searchParams.get("merchant_order_id")
    : null;

  useEffect(() => {
    const fetchData = async () => {
      if (
        collection_id &&
        payment_id &&
        status &&
        payment_type &&
        merchant_order_id
      ) {
        try {
          const response = await fetch(baseURL +"/payments/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              collection_id: collection_id,
              order_id:localStorage.getItem('orderId'),
              payment_id: payment_id,
              status: status,
              payment_type: payment_type,
              merchant_order_id: merchant_order_id,
            }),
          });

          if (response.ok) {
            // Procesa la respuesta si es necesario
            const data = await response.json();
            console.log("Datos de la respuesta:", data);
          } else {
            console.error("Error al enviar la solicitud POST");
          }
        } catch (error) {
          console.error("Error al realizar la solicitud POST:", error);
        }
      }
    };

    fetchData();
  }, [collection_id, payment_id, status, payment_type, merchant_order_id]);

  return (
    <div
      style={{
        margin: "150px",
        border: status === "approved" ? "green solid 3px" : "red solid 1px",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.5)",
        marginBottom: "50px",
      }}
    >
      <div>
        <h2 className="text-center" style={{ fontWeight: 700 }}>
          ¡Compra realizada correctamente!
        </h2>
        <p>
          Tu compra con ID <strong>{merchant_order_id}</strong> se ha realizado
          correctamente.
        </p>
        <p>
          ID <strong>{collection_id}</strong> de referencia de MercadoPago.
        </p>
        <p>
          ID de pago<strong>{payment_id}</strong>.
        </p>
        <p>
          Estado de pago <strong>{status}</strong>.
        </p>
        <p>
          Metodo de pago <strong>{payment_type}</strong>.
        </p>
      </div>
      <Button variant="primary" onClick={() => navigate("/purchases")}>
        Ir a mis compras
      </Button>
    </div>
  );
};

export default SuccessPurchase;
