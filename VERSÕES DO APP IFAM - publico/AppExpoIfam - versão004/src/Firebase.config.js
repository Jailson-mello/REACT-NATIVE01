import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { getReactNativePersistence } from 'firebase/auth';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAJ7fLm9Sw5i2RdwfB19gZmDhrtspTJqVk",
  authDomain: "login-projeto-ifam.firebaseapp.com",
  projectId: "login-projeto-ifam",
  storageBucket: "login-projeto-ifam.appspot.com",
  messagingSenderId: "720051361377",
  appId: "1:720051361377:web:1d28b3e8b49c7b9f4c3c20"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firebase Auth com persistência usando AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth };
