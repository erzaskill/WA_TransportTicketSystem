<template>
  <h2>Buy Ticket 🛒</h2>
  <v-form @submit.prevent="addTicket">
    <div class="flex">
      <div class="container">
        <label class="flex"><v-icon icon="mdi-home"></v-icon><b>FROM: </b></label>
        <v-select item-title="name" item-value="id" :items="stationStore.stations" v-model="state.station_dep"> </v-select>
      </div>
      <div class="container">
        <label class="flex" ><v-icon icon="mdi-map-marker"></v-icon><b>TO: </b></label>
        <v-select item-title="name" item-value="id" :items="stationStore.stations" v-model="state.station_des"> </v-select>
      </div>
    </div>
    <div class="container">
      <label class="flex" ><v-icon icon="mdi-calendar-clock"></v-icon><b>DATE: </b></label>
      <input type="date" id="dateInput" v-model="state.date" />
    </div>
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

//My try to make function, so I can't put in past date.
const today = new Date();
const dateInput = document.getElementById('dateInput') as HTMLInputElement;
if (dateInput !== null) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;

  dateInput.addEventListener('input', () => {
    const selectedDate = new Date(dateInput.value);
    const currentDate = new Date(today);
    if (selectedDate < currentDate) {
      dateInput.value = today;
    }
  });
}


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
.flex{
  display: flex;
  gap: 16px;
  align-items: center;
}
label.flex{
  gap:8px;
}
.container{
  width: 100%;
}
input{
  width: 100%;
    background-color: #f6f6f6;
    height: 56px;
    padding-left: 12px;
    border-radius: 4px;
    padding-right: 12px;
    margin-bottom: 1rem;
}
h2{
  margin-bottom: 1rem;
}
</style>
