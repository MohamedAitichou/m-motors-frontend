import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Car, Gauge, Tag, CheckCircle, XCircle } from 'lucide-react';

const VehicleCard = ({ vehicle, index = 0 }) => {
  const navigate = useNavigate();

  const typeLabel = {
    ACHAT: 'Achat',
    LOCATION: 'Location',
    LES_DEUX: 'Achat & Location'
  };

  const typeColor = {
    ACHAT: 'from-blue-500 to-cyan-500',
    LOCATION: 'from-purple-500 to-pink-500',
    LES_DEUX: 'from-emerald-500 to-teal-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/vehicles/${vehicle.id}`)}
      className="card cursor-pointer group overflow-hidden"
    >
      <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center">
        {vehicle.photoUrl ? (
          <img src={vehicle.photoUrl} alt={vehicle.marque} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <Car className="w-24 h-24 text-white/30 group-hover:text-white/50 group-hover:scale-110 transition-all duration-500" />
        )}
        
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r ${typeColor[vehicle.type]} text-xs font-bold shadow-lg`}>
          {typeLabel[vehicle.type]}
        </div>

        <div className="absolute top-3 left-3">
          {vehicle.disponible ? (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span className="text-xs text-emerald-400">Disponible</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/30">
              <XCircle className="w-3 h-3 text-red-400" />
              <span className="text-xs text-red-400">Indisponible</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition">
            {vehicle.marque} {vehicle.modele}
          </h3>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-white/60">
            <Gauge className="w-4 h-4" />
            <span>{vehicle.kilometrage?.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-1 text-primary-400 font-bold text-lg">
            <Tag className="w-4 h-4" />
            <span>{vehicle.prix?.toLocaleString()} €</span>
          </div>
        </div>

        {vehicle.description && (
          <p className="text-sm text-white/50 line-clamp-2">
            {vehicle.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default VehicleCard;