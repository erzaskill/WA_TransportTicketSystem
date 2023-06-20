<script setup lang="ts">
import type {Planet} from "@/model/Planet";
import {reactive} from "vue";

const props = defineProps<{
    planet: Planet
}>()

const state = reactive({
    newInhabitant: "",
    showAddForm: false,
})

const addInhabitant = () => {
    props.planet.inhabitants.push(state.newInhabitant);
    state.newInhabitant = "";
    state.showAddForm = false;
}
</script>

<template>
    <div class="inhabitants-block">
        <span v-if="props.planet.inhabitants.length === 0">No inhabitants</span>
        <span v-else>{{ props.planet.inhabitants.join(', ') }}</span> |
        <a v-if="!state.showAddForm" href="#" @click="state.showAddForm = true">Add inhabitant</a>
        <div v-else>
            <input v-model="state.newInhabitant" placeholder="New inhabitant name..." />
            <button @click="addInhabitant()">Add</button>
        </div>
    </div>
</template>

<style scoped>
.inhabitants-block {
    padding: 1em 0 1.5em;
}
</style>
