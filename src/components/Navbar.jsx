import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, LogOut, User, Shield, FileText, FileCheck, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 group-hover:scale-110 transition-transform">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">M-Motors</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-primary-400 transition">Accueil</Link>
            <Link to="/vehicles" className="hover:text-primary-400 transition">Véhicules</Link>
            
            {user ? (
              <>
                <Link to="/mes-dossiers" className="flex items-center gap-2 hover:text-primary-400 transition">
                  <FileText className="w-4 h-4" />
                  Mes dossiers
                </Link>
                    {isAdmin && (
                    <>
                        <Link to="/admin/vehicles" className="flex items-center gap-2 hover:text-primary-400 transition">
                        <Shield className="w-4 h-4" />
                        Véhicules
                        </Link>
                        <Link to="/admin/dossiers" className="flex items-center gap-2 hover:text-primary-400 transition">
                        <FileCheck className="w-4 h-4" />
                        Dossiers admin
                        </Link>
                    </>
                    )}
                <div className="flex items-center gap-3 px-4 py-2 glass rounded-xl">
                  <User className="w-4 h-4 text-primary-400" />
                  <span className="text-sm">{user.prenom}</span>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition">
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">Connexion</Link>
                <Link to="/register" className="btn-primary">Inscription</Link>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 space-y-3"
            >
              <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 hover:text-primary-400">Accueil</Link>
              <Link to="/vehicles" onClick={() => setIsOpen(false)} className="block py-2 hover:text-primary-400">Véhicules</Link>
              {user ? (
                <>
                  <Link to="/mes-dossiers" onClick={() => setIsOpen(false)} className="block py-2 hover:text-primary-400">Mes dossiers</Link>
                    {isAdmin && (
                    <>
                        <Link to="/admin/vehicles" onClick={() => setIsOpen(false)} className="block py-2 hover:text-primary-400">Admin Véhicules</Link>
                        <Link to="/admin/dossiers" onClick={() => setIsOpen(false)} className="block py-2 hover:text-primary-400">Admin Dossiers</Link>
                    </>
                    )}                  <button onClick={handleLogout} className="block py-2 text-red-400">Déconnexion</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2">Connexion</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="block py-2 text-primary-400">Inscription</Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;