import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';


const PrivateRouteAdmin = () => {
  const token = localStorage.getItem('token');
  const user = useSelector(state => (state.user));
  const role = user?.user.role

  return  (
    token&&role==="Administrador" ? <Outlet/> : <Navigate to= "/home"/>
    )
};

export default PrivateRouteAdmin;