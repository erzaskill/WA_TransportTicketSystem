<script setup lang="ts">
import Error from "@/components/Error.vue";
import Loading from "@/components/Loading.vue";
import type { Station } from '@/model/Station';
import { useStationsStore } from "@/stores/stations";
import { computed, onMounted, ref } from "vue";


const stationsStore = useStationsStore();

onMounted(() => {
  stationsStore.fetchStations();
});
</script>

<template>
  <h2>Stations 🚀</h2>
  <!-- <v-btn id="submit" type="submit" color="primary">Add Station</v-btn> For Technic-->
  <Error v-if="stationsStore.error" :message="stationsStore.error" />
  <Loading v-if="stationsStore.isLoading" />
  <div v-else id="ticket-list">

    <div class="stations">
      <div v-for="station in stationsStore.stations" :key="station.id" class="station">
        <v-row>
          <v-col cols="6" sm="11">
            <v-card class="ma-2 pa-4 d-flex align-center stations" color="primary" >
              <v-card-title class="headline white--text">{{ station.name }}</v-card-title>
              <v-card-text>
                <p v-if="stationsStore.getStationNameById(station.station_before) === undefined" class="text-body-2"><b>Previous Station: </b>It's a start station</p>
                <p v-else class="text-body-2"><b>Previous Station:</b> {{ stationsStore.getStationNameById(station.station_before) }}</p>
                <p v-if="stationsStore.getStationNameById(station.station_after) === undefined" class="text-body-2"><b>Next Station:</b>> It's the last station</p>
                <p v-else class="text-body-2"><b>Next Station:</b>> {{ stationsStore.getStationNameById(station.station_after) }}</p>
                <p v-if="station.state === 1" class="text-body-2 green--text"><b>Problem:</b> Everything OK!</p>
                <p v-else class="text-body-2 red--text"><b>Problem:</b>There are troubles on the road</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>


      </div>
    </div>

  </div>
</template>

<style scoped>
.stations {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 20px 0;
  background-color: rgba(0, 123, 255, 0.05);
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
