<script setup lang="ts">
import Error from "@/components/Error.vue";
import Loading from "@/components/Loading.vue";
import type { Ticket } from '@/model/Ticket';
import { useTicketsStore } from "@/stores/tickets";
import { useStationsStore } from "@/stores/stations";
import { computed, onMounted, ref } from "vue";

const ticketsStore = useTicketsStore();
const stationsStore = useStationsStore();

onMounted(() => {
  ticketsStore.fetchMyTickets();
  stationsStore.fetchStations();
});
</script>

<template>
  <div class="title-container">
    <h2>Tickets 📄</h2>
    <v-btn :to="{ name: 'TicketsBuy' }" color="primary"> <v-icon icon="mdi-plus"></v-icon> Buy Ticket</v-btn>
  </div>
  <Error v-if="ticketsStore.error" :message="ticketsStore.error" />
  <Loading v-if="ticketsStore.isLoading" />
  <div v-else id="ticket-list">

    <div class="tickets">
      <div v-for="ticket in ticketsStore.tickets" :key="ticket.id" class="card-container">
        <v-card class=" d-flex align-center ticket"  >
          <v-card-title class="headline">Ticket: #{{ ticket.id }}</v-card-title>
          <v-card-text>


            <p class="text-body-2">
              <v-icon icon="mdi-home"></v-icon>
              <b>FROM: </b>
              <span> {{ stationsStore.getStationNameById(ticket.st_from) }}</span>
            </p>

            <p class="text-body-2">
              <v-icon icon="mdi-map-marker"></v-icon>
              <b>WHERE:</b>
              <span>{{ stationsStore.getStationNameById(ticket.st_where) }}</span>
            </p>

            <p class="text-body-2">
              <v-icon icon="mdi-cash-multiple"></v-icon>
              <b>Price: </b>
              <span> {{ ticket.price }}</span>
            </p>

            <p class="text-body-2">
              <v-icon icon="mdi-calendar-clock-outline"></v-icon>
              <b>Date: </b>
              <span> {{ ticket.time}}</span>
            </p>
          </v-card-text>
        </v-card>


      </div>
    </div>

  </div>
</template>

<style scoped>
.title-container{
  display: flex;
  justify-content: space-between;
}
.tickets {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
  background-color: rgba(0, 123, 255, 0.05);
  border-radius: 10px;
  margin-top: 1rem;
  padding-bottom: 3rem;
}
.card-container{
  width: 100%;
}
.ticket {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5.45px 5.45px 10.9px rgba(174,174,192,.25), -2.63px -2.63px 10.9px #dfecff;
  padding: 8px !important;
}
.actions i:last-child{
  margin-left: 5px;
}

.ticket .v-card-text{
  display: flex;
  align-items: center;
  padding: 0;
}
.ticket p{
  width: 30%;
  display: flex;
  align-items: center;
}
p i, p b {
  margin-right: 4px;
}

.headline{
  font-family: "Arial", sans-serif;
  font-size: 16px;
 font-style: italic;
  color: #777;
  width: 15%;
}

.green{
  color: rgb(30, 107, 30)
}
.red{
  color: rgb(209, 73, 73);
}
</style>
