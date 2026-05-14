import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import DossierCard from '../components/DossierCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { CheckCircle, XCircle, FileText } from 'lucide-react';

const AdminDossiersPage = () => {
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [commentaire, setCommentaire] = useState('');

  useEffect(() => { fetchDossiers(); }, [filter]);

  const fetchDossiers = async () => {
    setLoading(true);
    try {
      const url = filter ? `/admin/dossiers?statut=${filter}` : '/admin/dossiers';
      const response = await api.get(url);
      setDossiers(response.data);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const updateStatut = async (statut) => {
    try {
      await api.patch(`/admin/dossiers/${selected.id}/statut`, { statut, commentaire });
      setSelected(null);
      setCommentaire('');
      fetchDossiers();
    } catch (error) { alert('Erreur'); }
  };

  const filters = [
    { value: '', label: 'Tous' },
    { value: 'EN_ATTENTE', label: 'En attente' },
    { value: 'VALIDE', label: 'Validés' },
    { value: 'REFUSE', label: 'Refusés' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Gestion des <span className="gradient-text">dossiers</span></h1>
        <p className="text-white/60">{dossiers.length} dossier(s)</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              filter === f.value
                ? 'bg-gradient-to-r from-primary-600 to-primary-500 shadow-lg shadow-primary-500/30'
                : 'glass glass-hover'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? <LoadingSpinner /> : dossiers.length === 0 ? (
        <div className="card text-center py-16">
          <FileText className="w-16 h-16 mx-auto mb-4 text-white/30" />
          <p className="text-white/60">Aucun dossier</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {dossiers.map((dossier, i) => (
            <div key={dossier.id} onClick={() => dossier.statut === 'EN_ATTENTE' && setSelected(dossier)} className={dossier.statut === 'EN_ATTENTE' ? 'cursor-pointer' : ''}>
              <DossierCard dossier={dossier} index={i} showClient />
            </div>
          ))}
        </div>
      )}

      {selected && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="card max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Traiter le dossier #{selected.id}</h2>
            <p className="text-white/60 mb-4">{selected.vehicleMarque} {selected.vehicleModele} - {selected.clientPrenom} {selected.clientNom}</p>

            <textarea
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              rows={3}
              className="input-field resize-none mb-4"
              placeholder="Commentaire (optionnel)"
            />

            <div className="flex gap-2">
              <button onClick={() => updateStatut('REFUSE')} className="btn-danger flex-1 flex items-center justify-center gap-2">
                <XCircle className="w-5 h-5" /> Refuser
              </button>
              <button onClick={() => updateStatut('VALIDE')} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" /> Valider
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDossiersPage;