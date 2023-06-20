import { defineStore } from "pinia"
import { ref } from "vue"

export const useCounterStore = defineStore('counter', () => {
    const visitedPlanetIds = ref<number[]>([])

    function visitPlanet(id: number) {
        visitedPlanetIds.value.push(id)
    }

    function wasPlanetVisited(id: number) {
        return visitedPlanetIds.value.includes(id)
    }

    function getTotalPlanetVisits(id: number) {
        return visitedPlanetIds.value.filter(planetId => planetId === id).length
    }

    return { visitPlanet, wasPlanetVisited, getTotalPlanetVisits }
})