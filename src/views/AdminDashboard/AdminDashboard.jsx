import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  getUsers,
  getAllProducts,
  updateProduct,
  baseURL,
} from "../../redux/actions";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TopTen from "../../components/graficas/toptenChart";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import SalesChart from "../../components/graficas/salesChart";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const products = useSelector((state) => state.products);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newOrderStatus, setNewOrderStatus] = useState("");
  const users = useSelector((state) => state.users);
  const orders = useSelector((state) => state.orders);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getOrders());
    dispatch(getAllProducts());
  }, [dispatch, selectedUser, selectedOrder, selectedProduct]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    const role = user.role === "Administrador" ? "Cliente" : "Administrador";
    const adminEmail = user.email === "admin@ecommerce.com" ? false : true;
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Acciones de usuario",
      showCancelButton: true,
      confirmButtonText: `Cambiar Rol a ${role}`,
      showDenyButton: adminEmail,
      denyButtonText: "Borrar Usuario",
      cancelButtonText: "Cancelar",
      focusDeny: true,
      icon: "info",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const userId = user.id;
          const role = user.role;

          if (role === "Cliente") {
            await axios.put(baseURL +`/user/id/${userId}`, {
              role: "Administrador",
            });
          }
          if (role === "Administrador") {
            await axios.put(baseURL +`/user/id/${userId}`, {
              role: "Cliente",
            });
          }
          setSelectedUser(null);
        } catch (error) {
          console.error("Error al actualizar el rol del usuario", error);
        }
      } else if (result.isDenied) {
        const email = user.email;
        await axios.delete(baseURL +`/user/id/${email}`);
        setSelectedUser(null);
      }
    });
  };

  const handleOrderClick = (order, event) => {
    setSelectedOrder(order);
    event.stopPropagation();

    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Editar Estado de la Orden",
      html: (
        <div className="status-buttons-container">
          <Button
            onClick={() => handleChangeOrderStatus(order.id, "Completa")}
            variant={"light"}
            style={{ margin: "2px" }}
            className="status-button"
          >
            Completa
          </Button>
          <Button
            onClick={() => handleChangeOrderStatus(order.id, "Fallida")}
            variant={"light"}
            style={{ margin: "2px" }}
            className="status-button"
          >
            Fallida
          </Button>
          <Button
            onClick={() => handleChangeOrderStatus(order.id, "En Proceso")}
            variant={"light"}
            style={{ margin: "2px" }}
            className="status-button"
          >
            En Proceso
          </Button>
          <Button
            onClick={() =>
              handleChangeOrderStatus(order.id, "Pendiente de Pago")
            }
            variant={"light"}
            style={{ margin: "2px" }}
            className="status-button"
          >
            Pendiente de Pago
          </Button>
          <Button
            onClick={() => handleChangeOrderStatus(order.id, "Por Facturar")}
            variant={"light"}
            style={{ margin: "2px" }}
            className="status-button"
          >
            Por Facturar
          </Button>
        </div>
      ),
      showCancelButton: true,
      showConfirmButton: true,
      allowOutsideClick: false,
      icon: "info",
    }).then(() => {
      setSelectedOrder(null);
    });
  };

  const handleChangeOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(baseURL +`/order/update/${orderId}`, {
        order_status: newStatus,
      });
      dispatch(getOrders());
      setNewOrderStatus(newStatus); // Actualizar el estado local
    } catch (error) {
      console.error("Error al actualizar el estado de la orden", error);
    }
  };

  const handleChangeDisponibility = async (product) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Cambiar Disponibilidad",
      input: "text",
      inputValue: product.disponibility.toString(), // Mostrar el valor actual
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar una disponibilidad";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const productId = product.sku;
          const updatedFields = { disponibility: result.value }; // Cambia 'result' a 'result.value'
          dispatch(updateProduct(productId, updatedFields));
          dispatch(getAllProducts());
        } catch (error) {
          console.error(
            "Error al actualizar la disponibilidad del producto",
            error
          );
        }
      }
    });
  };

  const handleChangePrice = async (product) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Cambiar Precio",
      input: "text",
      inputValue: product.price.toString(), // Mostrar el valor actual
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar un precio";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const productId = product.sku;
          const updatedFields = { price: result.value }; // Cambia 'result' a 'result.value'
          dispatch(updateProduct(productId, updatedFields));
        } catch (error) {
          console.error(
            "Error al actualizar la disponibilidad del producto",
            error
          );
        }
      }
    });
  };

  const handleChangeTitulo = async (product) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Cambiar Titulo",
      input: "text",
      inputValue: product.titulo.toString(), // Mostrar el valor actual
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar un titulo";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const productId = product.sku;
          const updatedFields = { titulo: result.value }; // Cambia 'result' a 'result.value'
          dispatch(updateProduct(productId, updatedFields));
        } catch (error) {
          console.error(
            "Error al actualizar la disponibilidad del producto",
            error
          );
        }
      }
    });
  };

  const productColumns = [
    { field: "sku", headerName: "SKU", width: 150 },
    { field: "number_part", headerName: "Número de Parte", width: 200 },
    {
      field: "titulo",
      headerName: "Título",
      width: 750,
      renderCell: (params) => {
        return (
          <div>
            <Button onClick={() => handleChangeTitulo(params.row)}>
              Actualizar
            </Button>
            &nbsp;
            {params.row.titulo}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Precio",
      width: 250,
      renderCell: (params) => {
        return (
          <div>
            <Button onClick={() => handleChangePrice(params.row)}>
              Actualizar
            </Button>
            &nbsp;
            {params.row.price}
          </div>
        );
      },
    },
    {
      field: "disponibility",
      headerName: "Disponibilidad",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Button onClick={() => handleChangeDisponibility(params.row)}>
              Actualizar
            </Button>
            &nbsp;
            {params.row.disponibility}
          </div>
        );
      },
    },
  ];

  const orderColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      onCellClick: (params) => {
        setSelectedOrderDetails(params.row);
        setIsModalOpen(true);
      },
    },
    { field: "user_id", headerName: "ID de Usuario", width: 250 },
    { field: "totalprice", headerName: "Total Orden", width: 250 },
    {
      field: "order_status",
      headerName: "Estado",
      width: 250,
      renderCell: (params) => {
        return (
          <Button
            onClick={(event) => {
              event.stopPropagation();
              handleOrderClick(params.row, event);
               
            }}
          >
            {params.row.order_status}
          </Button>
        );
      },
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "user_name", headerName: "Nombre de Usuario", width: 150 },
    { field: "first_name", headerName: "Nombre", width: 150 },
    { field: "last_name", headerName: "Apellido", width: 150 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "role", headerName: "Rol", width: 150 },
    {
      field: "action",
      headerName: "Acciones",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <Button onClick={() => handleUserClick(params.row)}>Editar</Button>
          </div>
        );
      },
    },
  ];

  return (
    <div
      style={{
        margin: "150px",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "5px 5px 10px 2px rgba(0, 0, 0, 0.5)",
        marginBottom: "20px",
      }}
    >
      <div className="row">
        <div className="col-md-9">
          <h1>Panel de Administración</h1>
        </div>
        <div className="col-md-2">
          <Button
            style={{ width: "100%", height: "100%" }}
            onClick={() => navigate("/createProduct")}
          >
            Crear Producto
          </Button>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <SalesChart />
        </div>
        <div className="col-md-6">
          <TopTen />
        </div>
      </div>
      <hr />
      <h2>Usuarios</h2>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          components={{ Toolbar: GridToolbar }}
        />
      </div>
      <hr />
      <h2>Órdenes</h2>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={orders}
          columns={orderColumns}
          pageSize={5}
          components={{ Toolbar: GridToolbar }}
          onRowClick={(params) => {
            setSelectedOrderDetails(params.row);
            setIsModalOpen(true);
          }}
        />
      </div>
      <div>
        <hr />
        <h2>Inventario:</h2>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={products}
            columns={productColumns}
            pageSize={5}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row.sku}
          />
        </div>
      </div>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Detalles de la Orden</DialogTitle>
        <DialogContent>
          {selectedOrderDetails && (
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
                {selectedOrderDetails.products.map((product) => (
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
}
