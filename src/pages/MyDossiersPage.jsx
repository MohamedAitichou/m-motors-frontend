import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import DossierCard from '../components/DossierCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FileText } from 'lucide-react';

const MyDossiersPage = () => {
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDossiers();
  }, []);

  const fetchDossiers = async () => {
    try {
      const response = await api.get('/dossiers/mes-dossiers');
      setDossiers(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Mes <span className="gradient-text">dossiers</span></h1>
        <p className="text-white/60">Suivez l'avancement de vos demandes</p>
      </motion.div>

      {loading ? (
        <LoadingSpinner />
      ) : dossiers.length === 0 ? (
        <div className="card text-center py-16">
          <FileText className="w-16 h-16 mx-auto mb-4 text-white/30" />
          <p className="text-white/60 mb-4">Vous n'avez pas encore de dossier</p>
          <a href="/vehicles" className="btn-primary inline-block">Voir les véhicules</a>
        </div>
      ) : (
        <div className="space-y-4">
          {dossiers.map((dossier, i) => (
            <DossierCard key={dossier.id} dossier={dossier} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDossiersPage;