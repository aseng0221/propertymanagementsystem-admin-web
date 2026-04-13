import type { Resident } from '../../types';
import { Edit2, Trash2 } from 'lucide-react';

interface ResidentListProps {
  residents: Resident[];
  onEdit: (resident: Resident) => void;
  onDelete: (id: string) => void;
}

export default function ResidentList({ residents, onEdit, onDelete }: ResidentListProps) {
  if (residents.length === 0) {
    return <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">No residents found. Add one to get started.</div>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {residents.map((resident) => (
          <li key={resident.id}>
            <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-blue-600 truncate">
                    {resident.firstName} {resident.lastName}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${resident.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {resident.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-6">
                    <p className="flex items-center text-sm text-gray-500">
                      Unit: {resident.unitNumber}
                    </p>
                    <p className="flex items-center text-sm text-gray-500">
                      {resident.email}
                    </p>
                    <p className="flex items-center text-sm text-gray-500">
                      {resident.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="ml-6 flex items-center space-x-3">
                <button onClick={() => onEdit(resident)} className="text-gray-400 hover:text-blue-500 transition-colors">
                  <Edit2 className="w-5 h-5" />
                </button>
                <button onClick={() => resident.id && onDelete(resident.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
