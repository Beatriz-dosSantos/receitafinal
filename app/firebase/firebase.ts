import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDS7bdOQ1iAf6cXYoORBR6vh2pJQwpS5aY',
  authDomain: 'bdreceita-95e36.firebaseapp.com',
  projectId: 'bdreceita-95e36',
  storageBucket: 'bdreceita-95e36.firebasestorage.app',
  messagingSenderId: '147023056353',
  appId: '1:147023056353:web:af3c79902b20261bbdd6a0',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
