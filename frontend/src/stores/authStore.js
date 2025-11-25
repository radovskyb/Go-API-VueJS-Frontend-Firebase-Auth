import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const displayName = ref('');
    const isAuthenticated = ref(false);
    const authIsReady = ref(false);

    function logout() {
        return signOut(getAuth());
    }

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(getAuth(), provider);
    }

    onAuthStateChanged(getAuth(), async (firebaseUser) => {
        if (firebaseUser) {
            user.value = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
            };
            isAuthenticated.value = true;
        } else {
            user.value = null;
            isAuthenticated.value = false;
        }

        // Whether logged in or not, by this stage we can let the caller know auth is ready.
        authIsReady.value = true;
    });

    return {
        user, isAuthenticated, authIsReady, signInWithGoogle, logout,
    };
});
