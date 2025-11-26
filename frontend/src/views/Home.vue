<template>
    <h1>Home</h1>

    <p>Hi {{ authStore.user?.displayName ?? 'there!' }}</p>
    <div v-if="authStore.isAuthenticated">
        <button @click="signOut">
            Sign out
        </button>
    </div>

    <div v-else>
        <button @click="signinWithGoogle">
            Sign in with Google
        </button>
    </div>

    <button @click="sendRequestToAPI" style="margin-top:30px;">Call API</button>
    <div v-if="apiResp" style="margin-top:30px;">
        {{ apiResp }} <span v-if="apiRespUID">- {{ apiRespUID }}</span>
    </div>
</template>

<script setup>
import {useAuthStore} from '@/stores/authStore';
import {protectedRoute} from '@/services/apiService';
import {useRouter, useRoute} from 'vue-router';
import {watch, ref} from 'vue';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const apiResp = ref('');
const apiRespUID = ref('');

const sendRequestToAPI = async () => {
    try {
        const resp = await protectedRoute();
        apiResp.value = resp.status;
        apiRespUID.value = resp.uid;
    } catch (error) {
        apiResp.value = error.status;
    }
};

const signinWithGoogle = async () => {
    try {
        await authStore.signInWithGoogle();
        apiResp.value = '';
        apiRespUID.value = '';
    } catch (error) {
        console.error(error);
    }
};

const signOut = async () => {
    try {
        await authStore.logout();
        apiResp.value = '';
        apiRespUID.value = '';
    } catch (error) {
        console.error(error);
    }
};

watch(() => authStore.isAuthenticated, (isAuthenticated) => {
    // Watch for authentication changes here if needed.
    if (isAuthenticated) {
        console.log('Signed in');
    } else {
        console.log('Signed out');
    }
});
</script>
