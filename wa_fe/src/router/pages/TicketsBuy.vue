<template>

  <v-form @submit.prevent="addTicket">
    <input type="date" v-model="state.date" id="buy-date" />
    <v-select item-title="name" item-value="id" :items="stationStore.stations" v-model="state.station_dep"> </v-select>
    <v-select item-title="name" item-value="id" :items="stationStore.stations" v-model="state.station_des"> </v-select>
    <v-btn id="submit" type="submit" color="primary">Buy</v-btn>

    <v-snackbar v-model="state.snackbar" :timeout="5000" :color="state.error ? 'error' : 'success'">
      {{ state.error ? 'Error: ' + state.error : 'Buy successful' }}
    </v-snackbar>
  </v-form>
</template>

<script setup lang="ts">
import { useStationsStore } from "@/stores/stations";
import { useTicketsStore } from "@/stores/tickets";
import {onMounted, reactive, ref} from "vue";
import { useRouter } from 'vue-router';

const ticketsStore = useTicketsStore();
const stationStore = useStationsStore()
const router = useRouter();

onMounted(() => {
  stationStore.fetchStations();
});


const state = reactive({
  station_dep: 0,
  station_des: 0,
  date: '',
  error: null,
  snackbar: false,
});


const addTicket = async () => {
  await ticketsStore.addTicket(state.station_dep,state.station_des,state.date);
  await router.push({ name: 'tickets' });
};
</script>

<style scoped>

</style>
