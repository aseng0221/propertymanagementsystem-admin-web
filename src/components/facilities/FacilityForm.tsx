import React, { useState } from 'react';
import type { Facility } from '../../types';

interface FacilityFormProps {
  initialData?: Facility | null;
  onSubmit: (data: Omit<Facility, 'id'>) => Promise<void>;
  onCancel: () => void;
}

export default function FacilityForm({ initialData, onSubmit, onCancel }: FacilityFormProps) {
  const [formData, setFormData] = useState<Omit<Facility, 'id'>>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    operatingHours: initialData?.operatingHours || '',
    depositRequired: initialData?.depositRequired || 0,
    bookingRules: initialData?.bookingRules || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'depositRequired' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-medium">{initialData ? 'Edit Facility' : 'Add Facility'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input required type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Operating Hours</label>
          <input required type="text" name="operatingHours" value={formData.operatingHours} onChange={handleChange} placeholder="e.g., 08:00 AM - 10:00 PM" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Deposit Required ($)</label>
          <input required type="number" name="depositRequired" value={formData.depositRequired} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" rows={2} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Booking Rules (Automated logic conditions)</label>
          <textarea required name="bookingRules" value={formData.bookingRules} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" rows={2} placeholder="e.g., Max 2 hours per booking" />
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
        <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">Save</button>
      </div>
    </form>
  );
}
