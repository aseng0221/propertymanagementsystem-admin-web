import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Resident, Invoice, Facility, Announcement, FacilityRequest } from '../types';

const RESIDENTS_COLLECTION = 'residents';
const INVOICES_COLLECTION = 'invoices';
const FACILITIES_COLLECTION = 'facilities';
const ANNOUNCEMENTS_COLLECTION = 'announcements';
const FACILITY_REQUESTS_COLLECTION = 'facilityRequests';

export const residentApi = {
  getResidents: async (): Promise<Resident[]> => {
    const querySnapshot = await getDocs(collection(db, RESIDENTS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Resident[];
  },

  addResident: async (resident: Omit<Resident, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, RESIDENTS_COLLECTION), resident);
    return docRef.id;
  },

  updateResident: async (id: string, resident: Partial<Resident>): Promise<void> => {
    const docRef = doc(db, RESIDENTS_COLLECTION, id);
    await updateDoc(docRef, resident);
  },

  deleteResident: async (id: string): Promise<void> => {
    const docRef = doc(db, RESIDENTS_COLLECTION, id);
    await deleteDoc(docRef);
  }
};

export const invoiceApi = {
  getInvoices: async (): Promise<Invoice[]> => {
    const querySnapshot = await getDocs(collection(db, INVOICES_COLLECTION));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Invoice[];
  },
  updateInvoiceStatus: async (id: string, status: Invoice['status']): Promise<void> => {
    const docRef = doc(db, INVOICES_COLLECTION, id);
    await updateDoc(docRef, { status });
  }
};

export const facilityApi = {
  getFacilities: async (): Promise<Facility[]> => {
    const querySnapshot = await getDocs(collection(db, FACILITIES_COLLECTION));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Facility[];
  },
  addFacility: async (facility: Omit<Facility, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, FACILITIES_COLLECTION), facility);
    return docRef.id;
  },
  updateFacility: async (id: string, facility: Partial<Facility>): Promise<void> => {
    const docRef = doc(db, FACILITIES_COLLECTION, id);
    await updateDoc(docRef, facility);
  },
  deleteFacility: async (id: string): Promise<void> => {
    const docRef = doc(db, FACILITIES_COLLECTION, id);
    await deleteDoc(docRef);
  }
};

export const facilityRequestApi = {
  getRequests: async (): Promise<FacilityRequest[]> => {
    const querySnapshot = await getDocs(collection(db, FACILITY_REQUESTS_COLLECTION));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FacilityRequest[];
  },
  addRequest: async (request: Omit<FacilityRequest, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, FACILITY_REQUESTS_COLLECTION), request);
    return docRef.id;
  },
  updateRequestStatus: async (id: string, status: FacilityRequest['status']): Promise<void> => {
    const docRef = doc(db, FACILITY_REQUESTS_COLLECTION, id);
    await updateDoc(docRef, { status });
  }
};

export const announcementApi = {
  getAnnouncements: async (): Promise<Announcement[]> => {
    const querySnapshot = await getDocs(collection(db, ANNOUNCEMENTS_COLLECTION));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Announcement[];
  },
  addAnnouncement: async (announcement: Omit<Announcement, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, ANNOUNCEMENTS_COLLECTION), announcement);
    return docRef.id;
  },
  deleteAnnouncement: async (id: string): Promise<void> => {
    const docRef = doc(db, ANNOUNCEMENTS_COLLECTION, id);
    await deleteDoc(docRef);
  }
};
