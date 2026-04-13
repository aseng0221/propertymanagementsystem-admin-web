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
