import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import VehiclesPage from './pages/VehiclesPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyDossiersPage from './pages/MyDossiersPage';
import AdminVehiclesPage from './pages/AdminVehiclesPage';
import AdminDossiersPage from './pages/AdminDossiersPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/mes-dossiers" element={<ProtectedRoute><MyDossiersPage /></ProtectedRoute>} />
              <Route path="/admin/vehicles" element={<ProtectedRoute adminOnly><AdminVehiclesPage /></ProtectedRoute>} />
              <Route path="/admin/dossiers" element={<ProtectedRoute adminOnly><AdminDossiersPage /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;