import React, { useState } from 'react';
import type { Facility, FacilityRequest } from '../../types';

interface BookingFormProps {
  facilities: Facility[];
  onSubmit: (data: Omit<FacilityRequest, 'id'>) => Promise<void>;
  onCancel: () => void;
}

export default function FacilityBookingForm({ facilities, onSubmit, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState({
    facilityId: '',
    residentName: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const facility = facilities.find(f => f.id === formData.facilityId);
    if (!facility) return;

    // Automated logic check mock (e.g. max hours)
    const [startH, startM] = formData.startTime.split(':').map(Number);
    const [endH, endM] = formData.endTime.split(':').map(Number);
    const duration = (endH + endM/60) - (startH + startM/60);

    let status: FacilityRequest['status'] = 'pending';
    let alertMsg = '';

    if (duration > 4) {
      status = 'rejected';
      alertMsg = 'Booking rejected: Duration exceeds 4 hours max limit.';
    } else if (facility.depositRequired === 0) {
      status = 'approved';
      alertMsg = 'Booking approved automatically (No deposit required).';
    } else {
      alertMsg = 'Booking pending: Awaiting deposit verification.';
    }

    if (alertMsg) alert(alertMsg);

    await onSubmit({
      facilityId: facility.id!,
      facilityName: facility.name,
      residentId: 'mock-resident-id', // Mock resident id
      residentName: formData.residentName,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      status: status
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-medium">Mock New Booking (Resident View)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Resident Name</label>
          <input required type="text" name="residentName" value={formData.residentName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Facility</label>
          <select required name="facilityId" value={formData.facilityId} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
            <option value="">Select Facility...</option>
            {facilities.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input required type="date" name="date" value={formData.date} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
        </div>
        <div className="flex space-x-2">
          <div className="flex-1">
             <label className="block text-sm font-medium text-gray-700">Start Time</label>
             <input required type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
          </div>
          <div className="flex-1">
             <label className="block text-sm font-medium text-gray-700">End Time</label>
             <input required type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
        <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">Request Booking</button>
      </div>
    </form>
  );
}
