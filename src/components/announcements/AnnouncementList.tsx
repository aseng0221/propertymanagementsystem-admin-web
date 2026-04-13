import type { Announcement } from '../../types';
import { Trash2 } from 'lucide-react';

interface AnnouncementListProps {
  announcements: Announcement[];
  onDelete: (id: string) => void;
}

export default function AnnouncementList({ announcements, onDelete }: AnnouncementListProps) {
  if (announcements.length === 0) {
    return <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">No announcements found.</div>;
  }

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div key={announcement.id} className="bg-white rounded-lg shadow p-6 relative group">
           <div className="absolute top-4 right-4 hidden group-hover:flex">
             <button onClick={() => announcement.id && onDelete(announcement.id)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
           </div>
           <div className="flex items-center justify-between mb-2">
             <h3 className="text-lg font-bold text-gray-900">{announcement.title}</h3>
             <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
               announcement.status === 'sent' ? 'bg-green-100 text-green-800' :
               announcement.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
             }`}>
               {announcement.status}
             </span>
           </div>
           <p className="text-sm text-gray-500 mb-4 whitespace-pre-line">{announcement.content}</p>
           <div className="flex items-center text-xs text-gray-500 space-x-4">
             <span><strong>Target:</strong> {announcement.targetAudience === 'all' ? 'Community-wide' : `${announcement.targetAudience.replace('_', ' ')} (${announcement.targetDetails})`}</span>
             <span><strong>Scheduled:</strong> {announcement.scheduledDate}</span>
           </div>
        </div>
      ))}
    </div>
  );
}
