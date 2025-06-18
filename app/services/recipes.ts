import 'react-native-get-random-values'; // necessário para uuid no Expo
import { v4 as uuid } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/firebase';
import * as FileSystem from 'expo-file-system';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { Recipe } from '../types/recipe';

const COLLECTION_NAME = 'receitas';

export const getAllRecipes = async (): Promise<Recipe[]> => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  const recipes = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Recipe, 'id'>),
  }));
  return recipes;
};

export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return { id: docSnap.id, ...(docSnap.data() as Omit<Recipe, 'id'>) };
};

export const addRecipe = async (recipe: Omit<Recipe, 'id'>): Promise<void> => {
  await addDoc(collection(db, COLLECTION_NAME), recipe);
};

export const updateRecipe = async (
  id: string,
  updated: Partial<Omit<Recipe, 'id'>>
): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, updated);
};

export const deleteRecipe = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

export async function uploadImageAsync(uri: string): Promise<string> {
  try {
    console.log("Fazendo upload da imagem:", uri);

    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      throw new Error('Arquivo não encontrado: ' + uri);
    }

    const response = await fetch(uri);
    const blob = await response.blob();

    const imageRef = ref(storage, `images/${uuid()}`);
    const snapshot = await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("Imagem salva em:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw error;
  }
}

