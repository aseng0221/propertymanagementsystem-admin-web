import { useState, useEffect } from 'react';
import { Plus, CalendarDays } from 'lucide-react';
import type { Facility, FacilityRequest } from '../types';
import { facilityApi, facilityRequestApi } from '../services/api';
import FacilityList from '../components/facilities/FacilityList';
import FacilityForm from '../components/facilities/FacilityForm';
import FacilityBookingList from '../components/facilities/FacilityBookingList';
import FacilityBookingForm from '../components/facilities/FacilityBookingForm';

export default function Facilities() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [requests, setRequests] = useState<FacilityRequest[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [facData, reqData] = await Promise.all([
        facilityApi.getFacilities(),
        facilityRequestApi.getRequests()
      ]);
      setFacilities(facData);
      setRequests(reqData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (data: Omit<Facility, 'id'>) => {
    if (editingFacility?.id) {
      await facilityApi.updateFacility(editingFacility.id, data);
    } else {
      await facilityApi.addFacility(data);
    }
    setIsFormOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this facility?')) {
      await facilityApi.deleteFacility(id);
      fetchData();
    }
  };

  const handleBookingSubmit = async (data: Omit<FacilityRequest, 'id'>) => {
    await facilityRequestApi.addRequest(data);
    setIsBookingFormOpen(false);
    fetchData();
  };

  const handleUpdateBookingStatus = async (id: string, status: FacilityRequest['status']) => {
    await facilityRequestApi.updateRequestStatus(id, status);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Facility Configuration & Bookings</h2>
          <p className="mt-1 text-sm text-gray-500">Manage facilities, view requests, and handle automated approvals.</p>
        </div>
        <div className="flex space-x-3">
          {!isBookingFormOpen && !isFormOpen && (
            <button onClick={() => setIsBookingFormOpen(true)} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <CalendarDays className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
              Mock Resident Booking
            </button>
          )}
          {!isFormOpen && !isBookingFormOpen && (
            <button onClick={() => { setEditingFacility(null); setIsFormOpen(true); }} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <Plus className="-ml-1 mr-2 h-5 w-5" />
              Add Facility
            </button>
          )}
        </div>
      </div>

      {isFormOpen ? (
        <FacilityForm initialData={editingFacility} onSubmit={handleSubmit} onCancel={() => setIsFormOpen(false)} />
      ) : isBookingFormOpen ? (
        <FacilityBookingForm facilities={facilities} onSubmit={handleBookingSubmit} onCancel={() => setIsBookingFormOpen(false)} />
      ) : isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="space-y-8">
          <FacilityList facilities={facilities} onEdit={(f) => { setEditingFacility(f); setIsFormOpen(true); }} onDelete={handleDelete} />

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Facility Booking Requests</h3>
            <FacilityBookingList
              requests={requests}
              onApprove={(id) => handleUpdateBookingStatus(id, 'approved')}
              onReject={(id) => handleUpdateBookingStatus(id, 'rejected')}
            />
          </div>
        </div>
      )}
    </div>
  );
}
