<template>
  <div class="text-h5 mb-8">Register to application</div>
  <v-form @submit.prevent="register">
    <v-text-field id="username" v-model="state.username" label="Username" :rules="usernameRules" class="mb-3"></v-text-field>
    <v-text-field id="password" v-model="state.password" label="Password" type="password" :rules="passwordRules"
                  class="mb-3"></v-text-field>
    <v-text-field id="email" v-model="state.email" label="Email" :rules="emailRules" class="mb-3"></v-text-field>
    <v-text-field id="name" v-model="state.name" label="Name" :rules="nameRules" class="mb-3"></v-text-field>
    <v-text-field id="surname" v-model="state.surname" label="Surname" :rules="surnameRules" class="mb-3"></v-text-field>
    <v-select v-model="state.role"
      label="Roles"
      :items="['user', 'technic', 'admin']"
    ></v-select>
    <v-btn id="submit" type="submit" color="primary">Register Now!</v-btn>

    <v-snackbar v-model="state.snackbar" :timeout="5000" :color="state.error ? 'error' : 'success'">
      {{ state.error ? 'Error: ' + state.error : 'Register successful' }}
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
  email: '',
  name: '',
  surname: '',
  role: '',
  snackbar: false,
  error: null,
});

const usernameRules = computed(() => [
  (v: string) => !!v || 'Username is required',
]);

const passwordRules = computed(() => [
  (v: string) => !!v || 'Password is required',
  // doesn't make sense to check password length during login. it is just an example
  (v: string) => v.length >= 6 || 'Password must be at least 6 characters',
]);

const emailRules = computed(() => [
  (v: string) => !!v || 'Email is required',
]);

const nameRules = computed(() => [
  (v: string) => !!v || 'Name is required',
]);

const surnameRules = computed(() => [
  (v: string) => !!v || 'Surname is required',
]);

const register = async () => {

  const { error } = await authStore.register(state.username, state.password, state.email, state.name, state.surname, state.role);

  if (error) {
    state.error = error;
    state.snackbar = true;
  } else {
    router.push({ name: 'homepage' });
  }
};

</script>
