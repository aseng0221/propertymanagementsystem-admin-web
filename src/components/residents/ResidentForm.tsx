import React, { useState, useEffect } from 'react';
import type { Resident } from '../../types';

interface ResidentFormProps {
  initialData?: Resident | null;
  onSubmit: (data: Omit<Resident, 'id'>) => Promise<void>;
  onCancel: () => void;
}

export default function ResidentForm({ initialData, onSubmit, onCancel }: ResidentFormProps) {
  const [formData, setFormData] = useState<Omit<Resident, 'id'>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    unitNumber: '',
    moveInDate: '',
    status: 'active',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        phone: initialData.phone,
        unitNumber: initialData.unitNumber,
        moveInDate: initialData.moveInDate,
        moveOutDate: initialData.moveOutDate || '',
        status: initialData.status,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium">{initialData ? 'Edit Resident' : 'Add New Resident'}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input required type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Unit Number</label>
          <input required type="text" name="unitNumber" value={formData.unitNumber} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Move-in Date</label>
          <input required type="date" name="moveInDate" value={formData.moveInDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Move-out Date</label>
          <input type="date" name="moveOutDate" value={formData.moveOutDate || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          {initialData ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  );
}
