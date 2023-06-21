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
  <div class="title-container">
    <h2>Stations 🪐</h2>
    <v-btn color="primary"> <v-icon icon="mdi-plus"></v-icon> Add station</v-btn> <!-- later need to make this possible for Technic -->
  </div>
  <Error v-if="stationsStore.error" :message="stationsStore.error" />
  <Loading v-if="stationsStore.isLoading" />
  <div v-else id="ticket-list">

    <div class="stations">
      <div v-for="station in stationsStore.stations" :key="station.id" class="card-container">
            <v-card class=" d-flex align-center station"  >
              <v-card-title class="headline">{{ station.name }}</v-card-title>
              <v-card-text>
                <p class="text-body-2">
                  <v-icon icon="mdi-home"></v-icon>
                  <b>Previous Station: </b>
                  <span v-if="stationsStore.getStationNameById(station.station_before) === undefined">It's a start station</span>
                  <span v-else > {{ stationsStore.getStationNameById(station.station_before) }}</span>
                </p>

                <p class="text-body-2">
                  <v-icon icon="mdi-map-marker"></v-icon>
                  <b>Next Station:</b>
                  <span v-if="stationsStore.getStationNameById(station.station_after) === undefined">It's the last station</span>
                <span v-else >{{ stationsStore.getStationNameById(station.station_after) }}</span>
                </p>
                <p v-if="station.state === 1" class="text-body-2"><b >Problem:</b> <span class="green"><v-icon icon="mdi-check-circle"></v-icon>Everything OK!</span></p>
                <p v-else class="text-body-2 "><b>Problem:</b> <span class="red">
                  <v-icon icon="mdi-alert-circle"></v-icon>
                  {{ station.problem !=='' ? station.problem : 'There are troubles on the road'}}</span></p>
              </v-card-text>
              <div class="actions">
                <v-btn><v-icon icon="mdi-pencil" size="20"></v-icon></v-btn>
                <v-btn><v-icon icon="mdi-delete" size="20"></v-icon></v-btn>
              </div>
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
.stations {
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
.station {
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

.station .v-card-text{
    display: flex;
    align-items: center;
    padding: 0;
}
.station p{
  width: 30%;
  display: flex;
  align-items: center;
}
p i, p b {
  margin-right: 4px;
}

.headline{
  font-family: "Arial", sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
  width: 15%;
}

.green{
  color: rgb(30, 107, 30)
}
.red{
  color: rgb(209, 73, 73);
}
</style>
