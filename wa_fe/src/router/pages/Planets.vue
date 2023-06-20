<script setup lang="ts">
import Error from "@/components/Error.vue";
import Loading from "@/components/Loading.vue";
import PlanetForm from "@/components/PlanetForm.vue";
import type { Planet } from '@/model/Planet';
import { usePlanetsStore } from "@/stores/planets";
import { useCounterStore } from "@/stores/counter";
import { computed, onMounted, ref } from "vue";

enum FormState {
    Hidden,
    Adding,
}

const planetsStore = usePlanetsStore();
const counterStore = useCounterStore();
const formState = ref(FormState.Hidden)

const percentageOfHabitablePlanets = computed<number>(() => {
    if (planetsStore.planets.length === 0) {
        return 0;
    }
    const habitablePlanets = planetsStore.planets.filter(planet => planet.oxygenPercentage >= 19 && planet.oxygenPercentage <= 24);
    return (habitablePlanets.length / planetsStore.planets.length) * 100;
});

const handleAddPlanet = (planet: Planet) => {
    planetsStore.addPlanet(planet);
    formState.value = FormState.Hidden;
}

onMounted(() => {
    planetsStore.fetchPlanets();
});
</script>

<template>
    <h2>Planets 🚀</h2>
    <Error v-if="planetsStore.error" :message="planetsStore.error" />
    <Loading v-if="planetsStore.isLoading" />
    <div v-else id="planet-list">
        <p>
            <i v-if="planetsStore.totalPlanets === 0">
                We have discovered no planets yet.
            </i>
            <i v-else>
                We have discovered <strong>{{ planetsStore.totalPlanets }}</strong> planets so far.
            </i>
        </p>
        <p>
            <i v-if="percentageOfHabitablePlanets === 0">
                None of these planets are habitable.
            </i>
            <i v-else>
                Hooray! 🥳
                <strong>{{ percentageOfHabitablePlanets.toFixed(1) }}%</strong> of these planets are habitable. Let's hop
                into the rocket! 🚀
            </i>
        </p>
        <div class="planets">
            <div v-for="planet in planetsStore.planets" :key="planet.id" class="planet"
                :class="{ visited: counterStore.wasPlanetVisited(Number(planet.id)) }">
                <strong>{{ planet.name }}</strong>
                <router-link :to="{ name: 'planet', params: { id: planet.id } }">visit</router-link>
            </div>
        </div>

        <button v-if="formState === FormState.Hidden" @click="formState = FormState.Adding" id="add-planet">Add planet</button>
        <div v-else-if="formState === FormState.Adding">
            <h4>Add planet</h4>
            <PlanetForm @save="handleAddPlanet" :is-saving="planetsStore.isAdding" />
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
