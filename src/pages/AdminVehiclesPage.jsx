import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { Plus, Edit, Trash2, RefreshCw, X, Car } from 'lucide-react';

const AdminVehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    marque: '', modele: '', kilometrage: 0, prix: 0,
    type: 'ACHAT', description: '', photoUrl: '', disponible: true
  });

  useEffect(() => { fetchVehicles(); }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/vehicles');
      setVehicles(response.data);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/vehicles/${editingId}`, form);
      } else {
        await api.post('/admin/vehicles', form);
      }
      setShowModal(false);
      setEditingId(null);
      setForm({ marque: '', modele: '', kilometrage: 0, prix: 0, type: 'ACHAT', description: '', photoUrl: '', disponible: true });
      fetchVehicles();
    } catch (error) { alert('Erreur: ' + (error.response?.data?.message || 'Inconnue')); }
  };

  const handleEdit = (v) => {
    setForm(v);
    setEditingId(v.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce véhicule ?')) return;
    try {
      await api.delete(`/admin/vehicles/${id}`);
      fetchVehicles();
    } catch (error) { alert('Erreur'); }
  };

  const handleToggleType = async (id) => {
    try {
      await api.patch(`/admin/vehicles/${id}/toggle-type`);
      fetchVehicles();
    } catch (error) { alert('Erreur'); }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Gestion des <span className="gradient-text">véhicules</span></h1>
          <p className="text-white/60">{vehicles.length} véhicule(s) au catalogue</p>
        </div>
        <button onClick={() => { setEditingId(null); setForm({ marque: '', modele: '', kilometrage: 0, prix: 0, type: 'ACHAT', description: '', photoUrl: '', disponible: true }); setShowModal(true); }} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> Ajouter
        </button>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3">Marque / Modèle</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-left p-3">Km</th>
                  <th className="text-left p-3">Prix</th>
                  <th className="text-left p-3">Statut</th>
                  <th className="text-right p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="p-3 font-medium">{v.marque} {v.modele}</td>
                    <td className="p-3"><span className="px-2 py-1 rounded-full bg-primary-500/20 text-primary-400 text-xs">{v.type}</span></td>
                    <td className="p-3">{v.kilometrage?.toLocaleString()}</td>
                    <td className="p-3 font-bold text-primary-400">{v.prix?.toLocaleString()} €</td>
                    <td className="p-3">{v.disponible ? <span className="text-emerald-400">Disponible</span> : <span className="text-red-400">Indisponible</span>}</td>
                    <td className="p-3">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => handleToggleType(v.id)} className="p-2 rounded-lg hover:bg-white/10" title="Changer le type">
                          <RefreshCw className="w-4 h-4 text-blue-400" />
                        </button>
                        <button onClick={() => handleEdit(v)} className="p-2 rounded-lg hover:bg-white/10">
                          <Edit className="w-4 h-4 text-yellow-400" />
                        </button>
                        <button onClick={() => handleDelete(v.id)} className="p-2 rounded-lg hover:bg-white/10">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{editingId ? 'Modifier' : 'Ajouter'} un véhicule</h2>
                <button onClick={() => setShowModal(false)}><X className="w-6 h-6" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input value={form.marque} onChange={(e) => setForm({...form, marque: e.target.value})} placeholder="Marque" required className="input-field" />
                  <input value={form.modele} onChange={(e) => setForm({...form, modele: e.target.value})} placeholder="Modèle" required className="input-field" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" value={form.kilometrage} onChange={(e) => setForm({...form, kilometrage: parseInt(e.target.value)})} placeholder="Kilométrage" required className="input-field" />
                  <input type="number" step="0.01" value={form.prix} onChange={(e) => setForm({...form, prix: parseFloat(e.target.value)})} placeholder="Prix" required className="input-field" />
                </div>
                <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})} className="input-field">
                  <option value="ACHAT">Achat</option>
                  <option value="LOCATION">Location</option>
                  <option value="LES_DEUX">Les deux</option>
                </select>
                <input value={form.photoUrl} onChange={(e) => setForm({...form, photoUrl: e.target.value})} placeholder="URL de la photo (optionnel)" className="input-field" />
                <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Description" rows={3} className="input-field resize-none" />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.disponible} onChange={(e) => setForm({...form, disponible: e.target.checked})} className="w-4 h-4" />
                  <span>Disponible</span>
                </label>
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Annuler</button>
                  <button type="submit" className="btn-primary flex-1">{editingId ? 'Modifier' : 'Créer'}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminVehiclesPage;