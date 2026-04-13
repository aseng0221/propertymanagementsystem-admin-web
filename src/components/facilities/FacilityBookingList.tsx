import type { FacilityRequest } from '../../types';
import { Check, X } from 'lucide-react';

interface FacilityBookingListProps {
  requests: FacilityRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function FacilityBookingList({ requests, onApprove, onReject }: FacilityBookingListProps) {
  if (requests.length === 0) {
    return <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">No facility requests found.</div>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facility</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resident</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.facilityName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.residentName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.date} ({request.startTime} - {request.endTime})</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  request.status === 'approved' ? 'bg-green-100 text-green-800' :
                  request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}>
                  {request.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {request.status === 'pending' && (
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => request.id && onApprove(request.id)} className="text-green-600 hover:text-green-900" title="Approve">
                      <Check className="w-5 h-5" />
                    </button>
                    <button onClick={() => request.id && onReject(request.id)} className="text-red-600 hover:text-red-900" title="Reject">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
