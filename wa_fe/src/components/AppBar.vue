<template>
    <v-app-bar flat>
        <v-container class="fill-height d-flex align-center">
            <router-link :to="{ name: 'homepage' }">
                <v-img src=" https://cdn-icons-png.flaticon.com/512/3336/3336008.png" height="40" width="40"
                    class="mr-5"></v-img>
            </router-link>
            <v-btn variant="flat" :to="{ name: 'stations' }">Stations</v-btn>
            <v-btn variant="flat" :to="{ name: 'tickets' }">My Tickets</v-btn>

            <v-spacer></v-spacer>

            <LoggedUser />
        </v-container>
    </v-app-bar>
</template>

<script setup lang="ts">
import LoggedUser from "@/components/LoggedUser.vue";
</script>
