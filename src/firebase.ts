// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Estos datos los obtienes de la configuración de tu proyecto en Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAQEm-YyVD4IR_KSc4_zV4Y7K3vAohf1wo",
  authDomain: "rutas-sv-e437b.firebaseapp.com",
  projectId: "rutas-sv-e437b",
  storageBucket: "rutas-sv-e437b.firebasestorage.app",
  messagingSenderId: "72417207079",
  appId: "1:72417207079:web:c29c9a0651b7316aafbf02"
};

// Inicializamos Firebase

export const app = initializeApp(firebaseConfig);
// Exportamos las herramientas que usaremos
export const db = getFirestore(app);
export const auth = getAuth(app);