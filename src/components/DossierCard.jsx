import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, XCircle, Car, User } from 'lucide-react';

const DossierCard = ({ dossier, index = 0, showClient = false }) => {
  const statutConfig = {
    EN_ATTENTE: {
      icon: Clock,
      label: 'En attente',
      color: 'from-yellow-500 to-orange-500',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400'
    },
    VALIDE: {
      icon: CheckCircle,
      label: 'Validé',
      color: 'from-emerald-500 to-green-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400'
    },
    REFUSE: {
      icon: XCircle,
      label: 'Refusé',
      color: 'from-red-500 to-rose-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400'
    }
  };

  const config = statutConfig[dossier.statut];
  const StatutIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${config.color}`}>
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Dossier #{dossier.id}</h3>
            <p className="text-sm text-white/50">{dossier.typeDemande}</p>
          </div>
        </div>

        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bg} ${config.border} border`}>
          <StatutIcon className={`w-4 h-4 ${config.text}`} />
          <span className={`text-sm font-semibold ${config.text}`}>{config.label}</span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-white/70">
          <Car className="w-4 h-4 text-primary-400" />
          <span>{dossier.vehicleMarque} {dossier.vehicleModele}</span>
        </div>

        {showClient && (
          <div className="flex items-center gap-2 text-white/70">
            <User className="w-4 h-4 text-purple-400" />
            <span>{dossier.clientPrenom} {dossier.clientNom}</span>
          </div>
        )}

        {dossier.commentaire && (
          <div className="mt-3 p-3 glass rounded-xl">
            <p className="text-sm text-white/60 italic">"{dossier.commentaire}"</p>
          </div>
        )}

        <p className="text-xs text-white/40 mt-3">
          Créé le {new Date(dossier.dateCreation).toLocaleDateString('fr-FR')}
        </p>
      </div>
    </motion.div>
  );
};

export default DossierCard;