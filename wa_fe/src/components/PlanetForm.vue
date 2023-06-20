<script setup lang="ts">
import { reactive } from "vue";
import type { Planet } from "@/model/Planet";

export interface Props {
    planet?: Planet,
    isSaving?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    planet: undefined,
    isSaving: false
})

const emit = defineEmits({
    save: (planet: Planet) => true
})

const editedPlanet: Planet = reactive({
    name: "",
    oxygenPercentage: 0,
    inhabitants: [],
    discoveryDate: new Date()
})

// edit mode
if (props.planet) {
    editedPlanet.name = props.planet.name;
    editedPlanet.oxygenPercentage = props.planet.oxygenPercentage;
    editedPlanet.inhabitants = props.planet.inhabitants;
}

function save() {
    // send a copy (do not mutate the original because it is used in the form)
    const copy = {...editedPlanet}
    emit('save', copy)
}
</script>

<template>
    <label>
        Name:
        <input v-model="editedPlanet.name" id="name" />
    </label>
    <br>
    <label>
        Oxygen percentage:
        <input v-model.number="editedPlanet.oxygenPercentage" id="oxygen-percentage" />
    </label>
    <br>
    <label>
        Discovery date:
        <input type="date" v-model="editedPlanet.discoveryDate" id="discovery-date" />
    </label>
    <br>

    <button disabled v-if="props.isSaving">Saving...</button>
    <button @click="save()" v-else id="submit">Save</button>
</template>
