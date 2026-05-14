import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import VehicleCard from '../components/VehicleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Filter, Search } from 'lucide-react';

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, [filter]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const url = filter ? `/vehicles?type=${filter}` : '/vehicles';
      const response = await api.get(url);
      setVehicles(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVehicles = vehicles.filter(v =>
    `${v.marque} ${v.modele}`.toLowerCase().includes(search.toLowerCase())
  );

  const filters = [
    { value: '', label: 'Tous' },
    { value: 'ACHAT', label: 'Achat' },
    { value: 'LOCATION', label: 'Location' },
    { value: 'LES_DEUX', label: 'Les deux' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-5xl font-bold mb-4">
          Notre <span className="gradient-text">catalogue</span>
        </h1>
        <p className="text-white/60 text-lg">
          Découvrez tous nos véhicules disponibles
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une marque ou un modèle..."
            className="input-field pl-12"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                filter === f.value
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'glass glass-hover'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filteredVehicles.length === 0 ? (
        <div className="text-center py-20 text-white/40">
          <Filter className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Aucun véhicule trouvé</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle, i) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VehiclesPage;