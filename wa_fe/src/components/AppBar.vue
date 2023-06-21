<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import LoggedUser from "@/components/LoggedUser.vue";

const authStore = useAuthStore();
</script>

<template>
    <v-app-bar flat>
        <v-container class="fill-height d-flex align-center">
            <router-link :to="{ name: 'homepage' }">
                <v-img src=" https://cdn-icons-png.flaticon.com/512/3336/3336008.png" height="40" width="40"
                    class="mr-5"></v-img>
            </router-link>
          <v-btn v-if="authStore.user?.role === 'technic'" variant="flat" :to="{ name: 'stations' }">Stations</v-btn>
          <v-btn variant="flat" :to="{ name: 'InfoTable' }">Information table</v-btn>
          <v-btn variant="flat" :to="{ name: 'tickets' }">My Tickets</v-btn>

            <v-spacer></v-spacer>

            <LoggedUser />
        </v-container>
    </v-app-bar>
</template>

