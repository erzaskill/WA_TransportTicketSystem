<template>
    <div v-if="authStore.user != null">
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-avatar color="info" v-bind="props" style="cursor: pointer;">
                    <v-icon icon="mdi-account-circle"></v-icon>
                </v-avatar>
            </template>

            <v-list>
                <v-list-item>
                    <v-list-item-title>Logged in as <strong>{{ authStore.user.username }}</strong></v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-chip  :key="authStore.user.role" color="primary" class="mx-2">
                        {{ authStore.user.role }}
                    </v-chip>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item @click="handleLogout">
                    <v-list-item-title>
                        <v-icon icon="mdi-logout"></v-icon>
                        Logout
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
  <div v-else>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-avatar color="info" v-bind="props" style="cursor: pointer;">
          <v-icon icon="mdi-account-circle"></v-icon>
        </v-avatar>
      </template>

      <v-list>
        <v-list-item to="/login">
          <v-list-item-title>
            <v-icon icon="mdi-login"></v-icon>
            Login
          </v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item to="/register">
          <v-list-item-title>
            <v-icon icon="mdi-account-plus"></v-icon>
            Register
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">

import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
    authStore.logout();
    router.push({ name: 'homepage' });
};
</script>
