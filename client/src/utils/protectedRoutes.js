import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoutes = () => {
    const {user} = useAuth(); 
    return user ? <Outlet /> : <Navigate to="/login" replace />
 
}
export default ProtectedRoutes;

