import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, Car } from 'lucide-react';

const RegisterPage = () => {
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', motDePasse: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-500 mb-4">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Créer un compte</h1>
          <p className="text-white/60">Rejoignez M-Motors gratuitement</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2 text-white/80">Prénom</label>
              <input
                type="text"
                value={form.prenom}
                onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                required
                className="input-field"
                placeholder="Mohamed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/80">Nom</label>
              <input
                type="text"
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                required
                className="input-field"
                placeholder="Ait Ichou"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">Email</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="input-field pl-12"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">Mot de passe</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="password"
                value={form.motDePasse}
                onChange={(e) => setForm({ ...form, motDePasse: e.target.value })}
                required
                minLength={8}
                className="input-field pl-12"
                placeholder="Au moins 8 caractères"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Créer mon compte
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-white/60">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-primary-400 hover:text-primary-300 font-semibold">
            Connectez-vous
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;