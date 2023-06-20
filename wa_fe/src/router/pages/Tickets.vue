<script setup lang="ts">
import Error from "@/components/Error.vue";
import Loading from "@/components/Loading.vue";
import type { Ticket } from '@/model/Ticket';
import { useTicketsStore } from "@/stores/tickets";
import { computed, onMounted, ref } from "vue";


const ticketsStore = useTicketsStore();

onMounted(() => {
  ticketsStore.fetchMyTickets();
});
</script>

<template>
  <h2>My tickets 🚀</h2>
  <v-btn id="submit" type="submit" color="primary">Buy ticket</v-btn>
  <Error v-if="ticketsStore.error" :message="ticketsStore.error" />
  <Loading v-if="ticketsStore.isLoading" />
  <div v-else id="ticket-list">

    <div class="tickets">
      <div v-for="ticket in ticketsStore.tickets" :key="ticket.id" class="ticket">
        <strong>{{ ticket.id }}</strong>
      </div>
    </div>

  </div>
</template>

<style scoped>
.planets {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 20px 0;
}

.planet {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  background-color: #eee;
}

.planet.visited {
  background-color: #91ff91;
}
</style>
