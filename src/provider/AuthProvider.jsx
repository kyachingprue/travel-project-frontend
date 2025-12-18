import React, { useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  }

  const profileUpdate = (profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profile)
  }

  const authInfo = {
    user,
    loading,
    createUser,
    userLogin,
    logout,
    profileUpdate
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      console.log("user data-->", currentUser);
      setLoading(false);
    })
    return () => {
      unsubscribe();
    }
  }, [])
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;