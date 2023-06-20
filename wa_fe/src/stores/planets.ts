import { axiosInstance } from "@/code/api";
import type { Planet } from "@/model/Planet";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export const usePlanetsStore = defineStore("planets", () => {
  const router = useRouter();
  const planets = reactive<Planet[]>([]);
  const isLoading = ref(false);
  const isAdding = ref(false);
  const error = ref<string | null>(null);

  const totalPlanets = computed<number>(() => planets.length);

  async function fetchPlanets() {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await axiosInstance.get("/planets");
      planets.splice(0, planets.length);
      planets.push(...response.data);
    } catch (e: any) {
      console.error(e);
      error.value = "Cannot download planets. 😢";
    } finally {
      isLoading.value = false;
    }
  }

  async function addPlanet(planet: Planet) {
    isAdding.value = true;
    error.value = null;

    try {
      const response = await axiosInstance.post("/planets", planet);
      planets.push(response.data); // add the planet returned by the server (it has an id)
      router.push({ name: "planet", params: { id: response.data.id } });
    } catch (e: any) {
      console.error(e.message, e.response?.data);
      error.value =
        "Cannot save the new planet. 😢 " + (e.response?.data?.message ?? "");
    } finally {
      isAdding.value = false;
    }
  }

  async function fetchPlanet(planetId: number) {
    try {
      isLoading.value = true;
      const response = await axiosInstance.get("/planets/" + planetId);
      const planet = response.data;
      const existingIndex = planets.findIndex((p) => p.id === planetId);
      if (existingIndex != -1) {
        planets[existingIndex] = planet;
      } else {
        planets.push(planet);
      }
    } catch (e: any) {
      console.error(e.message, e.response?.data);
      router.replace({ name: "notfound" });
    } finally {
      isLoading.value = false;
    }
  }

  function getPlanetById(planetId: number): Planet | undefined {
    return planets.find((p) => p.id === planetId);
  }

  return {
    planets,
    isLoading,
    isAdding,
    error,
    totalPlanets,
    fetchPlanets,
    addPlanet,
    fetchPlanet,
    getPlanetById,
  };
});
