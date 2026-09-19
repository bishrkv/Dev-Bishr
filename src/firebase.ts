import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  orderBy,
  query
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { SiteData, Message } from './types';
import { INITIAL_SITE_DATA } from './utils';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with custom databaseId if configured
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

const SITE_DATA_DOC = 'current';
const SITE_DATA_COLLECTION = 'portfolio_config';
const MESSAGES_COLLECTION = 'contact_messages';

/**
 * Fetch portfolio site data from Firestore
 */
export async function getSiteDataFromFirestore(): Promise<SiteData | null> {
  try {
    const docRef = doc(db, SITE_DATA_COLLECTION, SITE_DATA_DOC);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Partial<SiteData>;
      if (data && Array.isArray(data.projects) && data.projects.length > 0) {
        return {
          about: data.about || INITIAL_SITE_DATA.about,
          skills: data.skills || INITIAL_SITE_DATA.skills,
          services: data.services || INITIAL_SITE_DATA.services,
          timeline: data.timeline || INITIAL_SITE_DATA.timeline,
          projects: data.projects || INITIAL_SITE_DATA.projects,
          testimonials: data.testimonials || INITIAL_SITE_DATA.testimonials,
        };
      }
    }
  } catch (err) {
    console.warn('Firestore load failed, falling back to local storage/defaults:', err);
  }
  return null;
}

/**
 * Save portfolio site data permanently to Firestore
 */
export async function saveSiteDataToFirestore(data: SiteData): Promise<void> {
  try {
    const docRef = doc(db, SITE_DATA_COLLECTION, SITE_DATA_DOC);
    await setDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    console.error('Failed to save site data to Firestore:', err);
    throw err;
  }
}

/**
 * Fetch contact messages from Firestore
 */
export async function getMessagesFromFirestore(): Promise<Message[]> {
  try {
    const collRef = collection(db, MESSAGES_COLLECTION);
    const q = query(collRef, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);

    const msgs: Message[] = [];
    snap.forEach((d) => {
      const item = d.data();
      msgs.push({
        id: d.id,
        name: item.name || '',
        email: item.email || '',
        subject: item.subject || '',
        message: item.message || '',
        date: item.date || new Date().toISOString().slice(0, 10),
        emailSent: item.emailSent,
        emailError: item.emailError,
      });
    });
    return msgs;
  } catch (err) {
    // If index isn't created yet or order fails, fallback to unordered query
    try {
      const collRef = collection(db, MESSAGES_COLLECTION);
      const snap = await getDocs(collRef);
      const msgs: Message[] = [];
      snap.forEach((d) => {
        const item = d.data();
        msgs.push({
          id: d.id,
          name: item.name || '',
          email: item.email || '',
          subject: item.subject || '',
          message: item.message || '',
          date: item.date || new Date().toISOString().slice(0, 10),
          emailSent: item.emailSent,
          emailError: item.emailError,
        });
      });
      return msgs.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    } catch (fallbackErr) {
      console.warn('Failed to load messages from Firestore:', fallbackErr);
      return [];
    }
  }
}

/**
 * Save new contact message permanently to Firestore
 */
export async function saveMessageToFirestore(message: Message): Promise<void> {
  try {
    const docRef = doc(db, MESSAGES_COLLECTION, message.id);
    await setDoc(docRef, {
      ...message,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Failed to save message to Firestore:', err);
    throw err;
  }
}

/**
 * Delete a message from Firestore
 */
export async function deleteMessageFromFirestore(id: string): Promise<void> {
  try {
    const docRef = doc(db, MESSAGES_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Failed to delete message from Firestore:', err);
    throw err;
  }
}

/**
 * Delete all messages from Firestore
 */
export async function clearAllMessagesFromFirestore(): Promise<void> {
  try {
    const collRef = collection(db, MESSAGES_COLLECTION);
    const snap = await getDocs(collRef);
    const deletePromises = snap.docs.map((d) => deleteDoc(d.ref));
    await Promise.all(deletePromises);
  } catch (err) {
    console.error('Failed to clear messages from Firestore:', err);
    throw err;
  }
}
