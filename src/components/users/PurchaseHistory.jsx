import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import axios from 'axios';
import { baseURL } from "../../redux/actions";
const PurchaseHistory = () => {
    const orderColumns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "user_id", headerName: "ID de Usuario", width: 250 },
    { field: "totalprice", headerName: "Total Orden", width: 250 },
    {
      field: "order_status",
      headerName: "Estado",
      width: 250
    }
  ]

  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleRowClick = (order) => {
    setCurrentOrder(order);
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("id");
      if (userId) {
        try {
          const response = await axios.get(
            baseURL +`/order/user/${userId}`,
            
          );

          if (response.data) {
            setOrders(response.data);
            console.log(response.data);
            // Procesa la respuesta si es necesario
          } else {
            console.error("Error al enviar la solicitud GET");
          }
        } catch (error) {
          console.error("Error al realizar la solicitud GET:", error);
        }
      }
    };

    fetchData();
  }, []);
  return (
    
    <div
    style={{
        margin: "150px",
        border:  "gray solid 1px",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.5)",
        marginBottom: "50px",
      }}
    >
 <h2>Mis Compras</h2>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={orders}
          columns={orderColumns}
          pageSize={5}
          components={{ Toolbar: GridToolbar }}
          onRowClick={(params) => handleRowClick(params.row)}
        />
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
  <DialogTitle>Detalles de la Orden</DialogTitle>
  <DialogContent>
    {currentOrder && (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell>Imagen</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Cantidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentOrder.products.map((product) => (
            <TableRow key={product.sku}>
              <TableCell>{product.sku}</TableCell>
              <TableCell>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: 50, height: 50 }}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </DialogContent>
</Dialog>

    </div>
  );
};

export default PurchaseHistory;