import React, { useState } from 'react';
import type { Announcement } from '../../types';

interface AnnouncementFormProps {
  onSubmit: (data: Omit<Announcement, 'id'>) => Promise<void>;
  onCancel: () => void;
}

export default function AnnouncementForm({ onSubmit, onCancel }: AnnouncementFormProps) {
  const [formData, setFormData] = useState<Omit<Announcement, 'id'>>({
    title: '',
    content: '',
    targetAudience: 'all',
    targetDetails: '',
    scheduledDate: '',
    status: 'scheduled',
  });
  const [sendNotification, setSendNotification] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendNotification) {
      alert(`Mock: Triggering Cloud Function to send ${formData.targetAudience === 'all' ? 'Community-wide' : 'Targeted'} Push Notification and Email for "${formData.title}".`);
    }
    await onSubmit({ ...formData, status: sendNotification && !formData.scheduledDate ? 'sent' : 'scheduled' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-medium">Create Notice</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input required type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea required name="content" value={formData.content} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Target Audience</label>
          <select name="targetAudience" value={formData.targetAudience} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
            <option value="all">Community-wide (All)</option>
            <option value="specific_block">Specific Block</option>
            <option value="specific_floor">Specific Floor</option>
          </select>
        </div>
        {formData.targetAudience !== 'all' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Details (e.g., Block A, Floor 3)</label>
            <input required type="text" name="targetDetails" value={formData.targetDetails} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Schedule Date</label>
          <input required type="date" name="scheduledDate" value={formData.scheduledDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
        <div className="md:col-span-2 pt-4 border-t border-gray-200">
          <label className="flex items-center space-x-3">
            <input type="checkbox" checked={sendNotification} onChange={(e) => setSendNotification(e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <span className="text-sm font-medium text-gray-700">Send Email & App Push Notification</span>
          </label>
          <p className="text-xs text-gray-500 mt-1 ml-7">This simulates triggering a Firebase Cloud Function.</p>
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
        <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">Schedule / Save</button>
      </div>
    </form>
  );
}
