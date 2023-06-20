<template>
    <Loading v-if="planet === undefined || planetsStore.isLoading"/>
    <v-row v-else>
      <v-col cols="12" md="8">
        <div class="mars-background pa-16 d-flex justify-start align-center rounded-lg text-white">
          <h1>{{ planet?.name.toUpperCase() }}</h1>
        </div>
        <v-row class="my-4">
          <v-col cols="12" sm="1" class="d-flex align-center justify-center justify-sm-start">
            <v-icon icon="mdi-information" size="x-large" class="mr-4" color="blue-lighten-2"></v-icon>
          </v-col>
          <v-col cols="12" sm="11">
            <p>
              Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, larger only than Mercury. In the English language, Mars is named for the Roman god of war. Mars is a terrestrial planet with a thin atmosphere and has a crust primarily composed of elements similar to Earth's crust, as well as a core made of iron and nickel. Mars has surface features such as impact craters, valleys, dunes, and polar ice caps. Mars has two small, irregularly shaped moons, Phobos and Deimos.
            </p>
          </v-col>
        </v-row>
        <v-row class="my-4">
          <v-col cols="12" sm="1" class="d-flex align-center justify-center justify-sm-start">
            <v-icon icon="mdi-image-filter-hdr" size="x-large" class="mr-4" color="brown-lighten-2"></v-icon>
          </v-col>
          <v-col cols="12" sm="11">
            <p>
              Martian soil is the fine regolith (a blanket of unconsolidated, loose, heterogeneous superficial deposits covering solid rock) found on the surface of Mars. Its properties can differ significantly from those of terrestrial soil, including its toxicity due to the presence of perchlorates. The term Martian soil typically refers to the finer fraction of regolith. So far, no samples have been returned to Earth, the goal of a Mars sample-return mission, but the soil has been studied remotely with the use of Mars rovers and Mars orbiters.
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="mb-8">
          <v-card-title>Details</v-card-title>
          <v-card-text>
            <p>ID: {{ planet.id }}</p>
            <p>Total visits: {{ visits }}</p>
            <p>Oxygen percent: {{ planet.oxygenPercentage }} %</p>
            <p>Discovery date: {{ planet.discoveryDate }}</p>
            <p>Population: {{ planet.inhabitants.length }}</p>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>Inhabitants</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-icon>mdi-account</v-icon>
                Ivo Pisarovic
              </v-list-item>
              <v-list-item>
                <v-icon>mdi-account</v-icon>
                Tomas Jakubek
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <h2 class="mt-6 mb-2">Rovers</h2>
  
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="n in ['Curiosity', 'Opportunity', 'Spirit', 'Perseverance']" :key="n">
        <v-sheet color="grey-darken-4" class="d-flex flex-column align-center rounded-lg rover-card">
          <h4 class="pa-4 pb-3">{{ n }}</h4>
          <div class="w-100 flex-grow-1 rover-background" :style="{backgroundImage: `url(/src/assets/rovers/${n}.jpg)`}" />
          <v-btn color="orange text-white ma-4 mt-3">Details</v-btn>
        </v-sheet>
      </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { usePlanetsStore } from '@/stores/planets';
import { useCounterStore } from '@/stores/counter';
import { computed, onMounted } from 'vue';
import Loading from "@/components/Loading.vue";

const props = defineProps<{
    id: string
}>()

const planetsStore = usePlanetsStore()
const counterStore = useCounterStore()

onMounted(() => {
    const planetId = Number(props.id)
    planetsStore.fetchPlanet(planetId)
    counterStore.visitPlanet(planetId)
})

const planet = computed(() => planetsStore.getPlanetById(Number(props.id)))
const visits = computed(() => counterStore.getTotalPlanetVisits(Number(props.id)))
</script>

<style scoped>
.mars-background {
  background-image: url('@/assets/mars-surface.jpg');
  background-size: cover;
}

.rover-background {
  background-size: cover;
  background-position: center center;
}

.rover-card {
  height: 26em;
}
</style>
