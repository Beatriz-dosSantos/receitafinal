import { db } from '../firebase/firebase';
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

// 🔍 READ – buscar todas as receitas
export const getAllRecipes = async (): Promise<Recipe[]> => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  const recipes = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Recipe, 'id'>),
  }));

  console.log('Receitas carregadas:', recipes);
  return recipes;
};

// 🔍 READ – buscar receita por ID
export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.warn('Receita não encontrada com ID:', id);
    return null;
  }

  const recipe = { id: docSnap.id, ...(docSnap.data() as Omit<Recipe, 'id'>) };
  console.log('Receita carregada por ID:', recipe);
  return recipe;
};

// ➕ CREATE – adicionar nova receita
export const addRecipe = async (recipe: Omit<Recipe, 'id'>): Promise<void> => {
  console.log('Adicionando receita:', recipe);
  await addDoc(collection(db, COLLECTION_NAME), recipe);
};

// ✏️ UPDATE – atualizar dados da receita
export const updateRecipe = async (
  id: string,
  updated: Partial<Omit<Recipe, 'id'>>
): Promise<void> => {
  console.log('Atualizando receita ID:', id, 'com:', updated);
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, updated);
};

// 🗑 DELETE – deletar receita por ID
export const deleteRecipe = async (id: string): Promise<void> => {
  console.log('Deletando receita ID:', id);
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};
