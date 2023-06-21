<script setup lang="ts">
import Error from "@/components/Error.vue";
import Loading from "@/components/Loading.vue";
import { useLinksStore } from "@/stores/links";
import { useStationsStore} from "@/stores/stations";
import {useAuthStore} from "@/stores/auth";
import { computed, onMounted, ref } from "vue";


const linksStore = useLinksStore();
const authStore = useAuthStore();
const stationsStore = useStationsStore();

onMounted(() => {
  linksStore.fetchLinks();
  stationsStore.fetchStations();
});
</script>

<template>
  <div class="title-container">
    <h2>Links 🔗</h2>
    <v-btn v-if="authStore.user?.role === 'technic'" color="primary"> <v-icon icon="mdi-plus"></v-icon> Add Link</v-btn> <!-- later need to make this possible for Technic -->
  </div>
  <Error v-if="linksStore.error" :message="linksStore.error" />
  <Loading v-if="linksStore.isLoading" />
  <div v-else id="link-list">

    <div class="links">
      <div v-for="link in linksStore.links" :key="link.id" class="card-container">
        <v-card class=" d-flex align-center link"  >
          <v-card-title class="headline">{{ link.title }}</v-card-title>
          <v-card-text>
            <p class="text-body-2">
              <v-icon icon="mdi-home"></v-icon>
              <b>FROM: </b>
              <span> {{ stationsStore.getStationNameById(link.st_from) }}</span>
            </p>

            <p class="text-body-2">
              <v-icon icon="mdi-map-marker"></v-icon>
              <b>WHERE:</b>
              <span>{{ stationsStore.getStationNameById(link.st_where) }}</span>
            </p>

            <p class="text-body-2">
              <v-icon icon="mdi-bus-clock"></v-icon>
              <b>Departure: </b>
              <span> {{ link.departure_time}}</span>
            </p>

            <p class="text-body-2">
              <v-icon icon="mdi-timer-check"></v-icon>
              <b>Arrival: </b>
              <span> {{ link.arrival_time}}</span>
            </p>

            <p class="text-body-2">
              <v-icon icon="mdi-skip-previous"></v-icon>
              <b>Previous station: </b>
              <span> {{ stationsStore.getStationNameById(link.previous_station) }}</span>
            </p>
          </v-card-text>
          <div class="actions">
            <v-btn v-if="authStore.user?.role === 'technic'"><v-icon icon="mdi-pencil" size="20"></v-icon></v-btn>
            <v-btn v-if="authStore.user?.role === 'technic'"><v-icon icon="mdi-delete" size="20"></v-icon></v-btn>
          </div>
        </v-card>
      </div>
    </div>
    <div class="title-container">
      <h2 class="troubles">Stations with troubles ⚠️</h2>
    </div>
    <Error v-if="stationsStore.error" :message="stationsStore.error" />
    <Loading v-if="stationsStore.isLoading" />
    <div v-else id="station-list">
      <div class="stations">
        <div v-for="station in stationsStore.stations" :key="station.id" class="card-container">
          <v-card class=" d-flex align-center station" v-if="station.state !== 1">
            <v-card-title class="headline">{{ station.name }}</v-card-title>
            <v-card-text>
              <p class="text-body-2 "><span class="red">
                  <v-icon icon="mdi-alert-circle"></v-icon>
                  {{ station.problem !=='' ? station.problem : 'There are troubles on the road'}}</span>
              </p>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-container{
  display: flex;
  justify-content: space-between;
}
.links {
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
.link {
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

.link .v-card-text{
  display: flex;
  align-items: center;
  padding: 0;
}
.link p{
  width: 30%;
  display: flex;
  align-items: center;
}
p i, p b {
  margin-right: 4px;
}

.headline{
  font-family: "Arial", sans-serif;
  font-size: 12px;
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

.station {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5.45px 5.45px 10.9px rgba(174,174,192,.25), -2.63px -2.63px 10.9px #dfecff;
  padding: 8px !important;
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

.troubles{
  padding: 20px 0px 0px 0px;
}
</style>
