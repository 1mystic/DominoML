import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, hasFirebaseConfig } from '@/lib/firebase';
import { SavedModel, MLNode, MLEdge } from '@/types/ml-types';

const MODELS_COLLECTION = 'savedModels';

export const saveModelToFirebase = async (
  userId: string,
  name: string,
  nodes: MLNode[],
  edges: MLEdge[],
  description?: string,
  tags?: string[]
): Promise<string> => {
  if (!hasFirebaseConfig || !db) {
    throw new Error('Database is not available in demo mode');
  }
  
  try {
    const modelData = {
      name,
      description: description || '',
      userId,
      nodes,
      edges,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isPublic: false,
      tags: tags || []
    };

    const docRef = await addDoc(collection(db, MODELS_COLLECTION), modelData);
    return docRef.id;
  } catch (error) {
    console.error('Error saving model to Firebase:', error);
    throw new Error('Failed to save model');
  }
};

export const updateModelInFirebase = async (
  modelId: string,
  name: string,
  nodes: MLNode[],
  edges: MLEdge[],
  description?: string,
  tags?: string[]
): Promise<void> => {
  if (!hasFirebaseConfig || !db) {
    throw new Error('Database is not available in demo mode');
  }
  
  try {
    const modelRef = doc(db, MODELS_COLLECTION, modelId);
    await updateDoc(modelRef, {
      name,
      description: description || '',
      nodes,
      edges,
      updatedAt: serverTimestamp(),
      tags: tags || []
    });
  } catch (error) {
    console.error('Error updating model in Firebase:', error);
    throw new Error('Failed to update model');
  }
};

export const deleteModelFromFirebase = async (modelId: string): Promise<void> => {
  if (!hasFirebaseConfig || !db) {
    throw new Error('Database is not available in demo mode');
  }
  
  try {
    const modelRef = doc(db, MODELS_COLLECTION, modelId);
    await deleteDoc(modelRef);
  } catch (error) {
    console.error('Error deleting model from Firebase:', error);
    throw new Error('Failed to delete model');
  }
};

export const getUserModelsFromFirebase = async (userId: string): Promise<SavedModel[]> => {
  if (!hasFirebaseConfig || !db) {
    // Return empty array in demo mode
    return [];
  }
  
  try {
    const q = query(
      collection(db, MODELS_COLLECTION),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const models: SavedModel[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      models.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as SavedModel);
    });
    
    return models;
  } catch (error) {
    console.error('Error fetching user models from Firebase:', error);
    throw new Error('Failed to fetch saved models');
  }
};

export const getPublicModelsFromFirebase = async (): Promise<SavedModel[]> => {
  if (!hasFirebaseConfig || !db) {
    // Return empty array in demo mode
    return [];
  }
  
  try {
    const q = query(
      collection(db, MODELS_COLLECTION),
      where('isPublic', '==', true),
      orderBy('updatedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const models: SavedModel[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      models.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as SavedModel);
    });
    
    return models;
  } catch (error) {
    console.error('Error fetching public models from Firebase:', error);
    throw new Error('Failed to fetch public models');
  }
};
