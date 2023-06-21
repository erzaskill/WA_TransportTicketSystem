<template>
    <div class="text-h5 mb-8">Login to application</div>
    <v-form @submit.prevent="login">
        <v-text-field id="username" v-model="state.username" label="Username" :rules="usernameRules" class="mb-3"></v-text-field>
        <v-text-field id="password" v-model="state.password" label="Password" type="password" :rules="passwordRules"
            class="mb-3"></v-text-field>

        <v-btn id="submit" type="submit" color="primary">Login</v-btn>

        <v-snackbar v-model="state.snackbar" :timeout="5000" :color="state.error ? 'error' : 'success'">
            {{ state.error ? 'Error: ' + state.error : 'Login successful' }}
        </v-snackbar>
    </v-form>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const state = reactive({
    username: '',
    password: '',
    snackbar: false,
    error: null,
});

const usernameRules = computed(() => [
    (v: string) => !!v || 'Username is required',
]);

const passwordRules = computed(() => [
    (v: string) => !!v || 'Password is required',
]);

const login = async () => {
    const { error } = await authStore.login(state.username, state.password);

    if (error) {
        state.error = error;
        state.snackbar = true;
    } else {
        router.push({ name: 'homepage' });
    }
};

</script>
