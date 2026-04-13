import { useState, useEffect } from 'react';
import { BellPlus } from 'lucide-react';
import type { Announcement } from '../types';
import { announcementApi } from '../services/api';
import AnnouncementList from '../components/announcements/AnnouncementList';
import AnnouncementForm from '../components/announcements/AnnouncementForm';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      const data = await announcementApi.getAnnouncements();
      setAnnouncements(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (data: Omit<Announcement, 'id'>) => {
    await announcementApi.addAnnouncement(data);
    setIsFormOpen(false);
    fetchAnnouncements();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this announcement?')) {
      await announcementApi.deleteAnnouncement(id);
      fetchAnnouncements();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Announcement Engine</h2>
          <p className="mt-1 text-sm text-gray-500">Create and schedule community-wide or targeted notices.</p>
        </div>
        {!isFormOpen && (
          <button onClick={() => setIsFormOpen(true)} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <BellPlus className="-ml-1 mr-2 h-5 w-5" />
            New Notice
          </button>
        )}
      </div>

      {isFormOpen ? (
        <AnnouncementForm onSubmit={handleSubmit} onCancel={() => setIsFormOpen(false)} />
      ) : isLoading ? (
        <div className="text-center py-8">Loading announcements...</div>
      ) : (
        <AnnouncementList announcements={announcements} onDelete={handleDelete} />
      )}
    </div>
  );
}
