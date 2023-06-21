import { axiosInstance } from "@/code/api";
import type { Ticket } from "@/model/Ticket";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth";

export const useTicketsStore = defineStore("tickets", () => {
  const tickets = reactive<Ticket[]>([]);
  const isLoading = ref(false);
  const isAdding = ref(false);
  const error = ref<string | null>(null);
  const authStore = useAuthStore();

  const totalTickets = computed<number>(() => tickets.length);

  async function fetchMyTickets() {
    isLoading.value = true;
    error.value = null;

    try {
      // @ts-ignore - possible bug?
      const response = await axiosInstance.get("/ticket/user/" + authStore.user.id);
      tickets.splice(0, tickets.length);
      tickets.push(...response.data);
    } catch (e: any) {
      console.error(e);
      error.value = "Cannot download tickets. 😢";
    } finally {
      isLoading.value = false;
    }
  }

  async function addTicket(st_where: number, st_from: number, time: string ) {
    isAdding.value = true;
    error.value = null;
    const price = Math.floor(Math.random() * 901.0) + 100.0;
    // @ts-ignore
    const user_id = authStore.user.id;

    try {
      // @ts-ignore
      const response = await axiosInstance.post("/ticket", {st_where, st_from, user_id, price, time});
      tickets.push(response.data);
    } catch (e: any) {
      console.error(e.message, e.response?.data);
      error.value =
        "Cannot save the new ticket. 😢 " + (e.response?.data?.message ?? "");
    } finally {
      isAdding.value = false;
    }
  }


  return {
    tickets,
    isLoading,
    isAdding,
    error,
    totalTickets,
    fetchMyTickets,
    addTicket,
  };
});
