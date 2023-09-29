import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_PROYECTO_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
  measurementId: "TU_MEASUREMENT_ID",
};

const firebaseApp = initializeApp(firebaseConfig);

// Configura la persistencia de sesión como "NONE"
firebaseApp.auth().setPersistence(firebaseApp.auth.Auth.Persistence.NONE);

export default firebaseApp;
