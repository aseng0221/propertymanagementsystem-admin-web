export interface Resident {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  unitNumber: string;
  moveInDate: string;
  moveOutDate?: string;
  status: 'active' | 'inactive';
}

export interface Unit {
  id?: string;
  unitNumber: string;
  floor: string;
  block: string;
  type: string;
}

export interface Invoice {
  id?: string;
  residentId: string;
  residentName: string;
  unitNumber: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
}

export interface Facility {
  id?: string;
  name: string;
  description: string;
  operatingHours: string;
  depositRequired: number;
  bookingRules: string;
}

export interface FacilityRequest {
  id?: string;
  facilityId: string;
  facilityName: string;
  residentId: string;
  residentName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Announcement {
  id?: string;
  title: string;
  content: string;
  targetAudience: 'all' | 'specific_block' | 'specific_floor';
  targetDetails?: string;
  scheduledDate: string;
  status: 'draft' | 'scheduled' | 'sent';
}
