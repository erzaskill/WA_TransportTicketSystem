
import LoggedUser from './components/LoggedUser.vue';

<template>
  <v-app>
    <AppBar />

    <v-main>
      <v-container class="py-10">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

onMounted(() => {
  authStore.reloadUser();
});
</script>
