import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth, hasFirebaseConfig } from '@/lib/firebase';
import { toast } from 'sonner';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string, displayName?: string) => {
    if (!hasFirebaseConfig || !auth) {
      toast.error('Authentication is not available in demo mode');
      return;
    }
    
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName && result.user) {
        await updateProfile(result.user, { displayName });
      }
      toast.success('Account created successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account';
      toast.error(errorMessage);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    if (!hasFirebaseConfig || !auth) {
      toast.error('Authentication is not available in demo mode');
      return;
    }
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to log in';
      toast.error(errorMessage);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    if (!hasFirebaseConfig || !auth) {
      toast.error('Authentication is not available in demo mode');
      return;
    }
    
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Logged in with Google successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to log in with Google';
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = async () => {
    if (!hasFirebaseConfig || !auth) {
      toast.error('Authentication is not available in demo mode');
      return;
    }
    
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to log out';
      toast.error(errorMessage);
      throw error;
    }
  };

  useEffect(() => {
    if (!hasFirebaseConfig || !auth) {
      // In demo mode without Firebase, just set loading to false
      setLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    login,
    signup,
    logout,
    loginWithGoogle,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
