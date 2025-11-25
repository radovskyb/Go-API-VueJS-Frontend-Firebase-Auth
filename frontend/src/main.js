import { getAuth, connectAuthEmulator } from 'firebase/auth';
// Import firebase.
import { initializeApp } from 'firebase/app';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Set up config here.
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);

// If working with the firebase emulator during local dev.
const auth = getAuth();

if (typeof window !== 'undefined' && location.hostname === "localhost") {
    connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
}


app.use(createPinia())
app.use(router)

app.mount('#app')
