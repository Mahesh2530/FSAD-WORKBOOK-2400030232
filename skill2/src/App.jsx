import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';

function ProtectedRoute({ role, expectedRole, children }) {
  if (!role) return <Navigate to="/" replace />;
  if (role !== expectedRole) return <Navigate to={`/${role}`} replace />;
  return children;
}

export default function App() {
  const role = localStorage.getItem('role');

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/student"
        element={
          <ProtectedRoute role={role} expectedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher"
        element={
          <ProtectedRoute role={role} expectedRole="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
