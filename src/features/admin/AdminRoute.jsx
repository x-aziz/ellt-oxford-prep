import { Navigate } from 'react-router-dom';
import { useAdmin } from '../../hooks/useAdmin.js';

export default function AdminRoute({ children }) {
  const { isAdmin, loading } = useAdmin();
  if (loading) return <div className="app-loading">Loading…</div>;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}
