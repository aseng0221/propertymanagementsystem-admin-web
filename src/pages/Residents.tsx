import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import type { Resident } from '../types';
import { residentApi } from '../services/api';
import ResidentList from '../components/residents/ResidentList';
import ResidentForm from '../components/residents/ResidentForm';

export default function Residents() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResidents = async () => {
    try {
      setIsLoading(true);
      const data = await residentApi.getResidents();
      setResidents(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching residents:', err);
      setError('Failed to load residents.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  const handleAddResident = () => {
    setEditingResident(null);
    setIsFormOpen(true);
  };

  const handleEditResident = (resident: Resident) => {
    setEditingResident(resident);
    setIsFormOpen(true);
  };

  const handleDeleteResident = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this resident?')) {
      try {
        await residentApi.deleteResident(id);
        await fetchResidents();
      } catch (err) {
        console.error('Error deleting resident:', err);
        setError('Failed to delete resident.');
      }
    }
  };

  const handleSubmit = async (data: Omit<Resident, 'id'>) => {
    try {
      if (editingResident?.id) {
        await residentApi.updateResident(editingResident.id, data);
      } else {
        await residentApi.addResident(data);
      }
      await fetchResidents();
      setIsFormOpen(false);
    } catch (err) {
      console.error('Error saving resident:', err);
      setError('Failed to save resident.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resident & Unit Management</h2>
          <p className="mt-1 text-sm text-gray-500">Manage resident profiles, unit allocations, and move-in schedules.</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={handleAddResident}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add Resident
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700">
          {error}
        </div>
      )}

      {isFormOpen ? (
        <ResidentForm
          initialData={editingResident}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      ) : (
        <>
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading residents...</div>
          ) : (
            <ResidentList
              residents={residents}
              onEdit={handleEditResident}
              onDelete={handleDeleteResident}
            />
          )}
        </>
      )}
    </div>
  );
}
