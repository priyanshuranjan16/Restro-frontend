import Invoicing from '../components/Invoicing';
import ProtectedRoute from '../components/ProtectedRoute';
import { UserRole } from '../contexts/AuthContext';

export default function InvoicingPage() {
  return (
    <ProtectedRoute allowedRoles={['cashier', 'admin']}>
      <Invoicing />
    </ProtectedRoute>
  );
}
