import type { Facility } from '../../types';
import { Edit2, Trash2 } from 'lucide-react';

interface FacilityListProps {
  facilities: Facility[];
  onEdit: (facility: Facility) => void;
  onDelete: (id: string) => void;
}

export default function FacilityList({ facilities, onEdit, onDelete }: FacilityListProps) {
  if (facilities.length === 0) {
    return <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">No facilities configured.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {facilities.map((facility) => (
        <div key={facility.id} className="bg-white rounded-lg shadow p-6 relative group">
          <div className="absolute top-4 right-4 hidden group-hover:flex space-x-2">
            <button onClick={() => onEdit(facility)} className="text-gray-400 hover:text-blue-500"><Edit2 className="w-4 h-4" /></button>
            <button onClick={() => facility.id && onDelete(facility.id)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{facility.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{facility.description}</p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Hours:</span>
              <span className="font-medium">{facility.operatingHours}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Deposit:</span>
              <span className="font-medium">${facility.depositRequired}</span>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-500 block mb-1">Rules:</span>
              <span className="text-xs text-gray-700 bg-gray-50 p-2 rounded block">{facility.bookingRules}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
