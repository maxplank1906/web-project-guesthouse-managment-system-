import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { UserProfile, UserRole } from '../types';
import { handleFirestoreError, OperationType } from '../utils/error-handler';

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          
          const isAdminEmail = firebaseUser.email === 'abdulmoiz1914@gmail.com' || 
                             firebaseUser.email === 'i230722@isb.nu.edu.pk';
          
          if (docSnap.exists()) {
            const data = docSnap.data() as UserProfile;
            console.log("Current user profile:", data);
            
            // Force admin role if it's the primary developer email
            if (isAdminEmail && data.role !== 'admin') {
              console.log("Elevating user to admin...");
              await setDoc(docRef, { ...data, role: 'admin' }, { merge: true });
              setProfile({ ...data, role: 'admin' });
            } else {
              setProfile(data);
            }
          } else {
            console.log("Creating new user profile for:", firebaseUser.email);
            // New user registration via Google or email
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || 'Guest',
              email: firebaseUser.email || '',
              role: isAdminEmail ? 'admin' : 'user',
              status: 'active',
              createdAt: serverTimestamp(),
            };
            try {
              await setDoc(docRef, newProfile);
              console.log("Profile created successfully");
              setProfile(newProfile);
            } catch (err) {
              console.error("Failed to create profile document:", err);
              // Fallback to local profile state so app works even if DB sync fails
              setProfile(newProfile);
            }
          }
        } catch (error) {
          console.error("Auth context refresh error:", error);
        }
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await auth.signOut();
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
