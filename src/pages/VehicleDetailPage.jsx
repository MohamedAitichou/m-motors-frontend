import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { Car, Gauge, Tag, ArrowLeft, FileText, CheckCircle, XCircle } from 'lucide-react';

const VehicleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [typeDemande, setTypeDemande] = useState('ACHAT');
  const [commentaire, setCommentaire] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      const response = await api.get(`/vehicles/${id}`);
      setVehicle(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    setSubmitting(true);
    setMessage(null);
    try {
      await api.post('/dossiers', {
        typeDemande,
        vehicleId: parseInt(id),
        commentaire
      });
      setMessage({ type: 'success', text: 'Votre dossier a été créé avec succès !' });
      setShowForm(false);
      setCommentaire('');
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Erreur lors de la création' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!vehicle) return <div className="text-center py-20 text-white/40">Véhicule introuvable</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/vehicles" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition">
        <ArrowLeft className="w-4 h-4" /> Retour au catalogue
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-8">
        <div className="card overflow-hidden">
          <div className="aspect-video -mx-6 -mt-6 mb-4 bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center">
            {vehicle.photoUrl ? (
              <img src={vehicle.photoUrl} alt={vehicle.marque} className="w-full h-full object-cover" />
            ) : (
              <Car className="w-32 h-32 text-white/30" />
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">{vehicle.marque} {vehicle.modele}</h1>
              <p className="text-white/60 mt-2">{vehicle.description || 'Aucune description disponible'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                  <Gauge className="w-4 h-4" /> Kilométrage
                </div>
                <div className="text-xl font-bold">{vehicle.kilometrage?.toLocaleString()} km</div>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                  <Tag className="w-4 h-4" /> Prix
                </div>
                <div className="text-xl font-bold text-primary-400">{vehicle.prix?.toLocaleString()} €</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {vehicle.disponible ? (
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle className="w-5 h-5" /> Disponible
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-400">
                  <XCircle className="w-5 h-5" /> Indisponible
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mb-4 p-4 rounded-xl ${message.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}
            >
              {message.text}
            </motion.div>
          )}

          {!showForm ? (
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Intéressé par ce véhicule ?</h2>
              <p className="text-white/60 mb-6">
                Déposez un dossier en quelques clics et notre équipe vous recontacte rapidement.
              </p>
              <button
                onClick={() => user ? setShowForm(true) : navigate('/login')}
                disabled={!vehicle.disponible}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <FileText className="w-5 h-5" />
                {vehicle.disponible ? 'Déposer un dossier' : 'Non disponible'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card">
              <h2 className="text-2xl font-bold mb-4">Nouveau dossier</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-white/80">Type de demande</label>
                <div className="grid grid-cols-2 gap-2">
                  {(vehicle.type === 'LES_DEUX' ? ['ACHAT', 'LOCATION'] : [vehicle.type]).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTypeDemande(t)}
                      className={`p-3 rounded-xl transition-all ${
                        typeDemande === t
                          ? 'bg-gradient-to-r from-primary-600 to-primary-500 shadow-lg shadow-primary-500/30'
                          : 'glass glass-hover'
                      }`}
                    >
                      {t === 'ACHAT' ? 'Achat' : 'Location'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-white/80">Commentaire (optionnel)</label>
                <textarea
                  value={commentaire}
                  onChange={(e) => setCommentaire(e.target.value)}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Précisez votre demande..."
                />
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">
                  Annuler
                </button>
                <button type="submit" disabled={submitting} className="btn-primary flex-1">
                  {submitting ? 'Envoi...' : 'Confirmer'}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VehicleDetailPage;