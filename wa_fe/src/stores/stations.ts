import { axiosInstance } from "@/code/api";
import type { Station } from "@/model/Station";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth"; //for Create and Update by Technic

export const useStationsStore = defineStore("stations", () => {
  const router = useRouter();
  const stations = reactive<Station[]>([]);
  const isLoading = ref(false);
  const isAdding = ref(false);
  const error = ref<string | null>(null);
  const authStore = useAuthStore();

  const totalStations = computed<number>(() => stations.length);

  async function fetchStations() {
    isLoading.value = true;
    error.value = null;

    try {
      // @ts-ignore - possible bug?
      const response = await axiosInstance.get("/stations");
      stations.splice(0, stations.length);
      stations.push(...response.data);
    } catch (e: any) {
      console.error(e);
      error.value = "Cannot download stations. 😢";
    } finally {
      isLoading.value = false;
    }
  }

  async function addStation(station: Station) {
    isAdding.value = true;
    error.value = null;

    try {
      const response = await axiosInstance.post("/station", station);
      stations.push(response.data);
    } catch (e: any) {
      console.error(e.message, e.response?.data);
      error.value =
        "Cannot save the new station. 😢 " + (e.response?.data?.message ?? "");
    } finally {
      isAdding.value = false;
    }
  }
  function getStationNameById(stationId: number) {
    const station = stations.find(p => p.id === stationId);
    return station ? station.name : undefined;
  }


  return {
    stations,
    isLoading,
    isAdding,
    error,
    totalStations,
    fetchStations,
    addStation,
    getStationNameById
  };
});
