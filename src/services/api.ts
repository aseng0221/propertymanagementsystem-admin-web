import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Resident } from '../types';

const RESIDENTS_COLLECTION = 'residents';

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
