import { axiosInstance } from "@/code/api";
import type { Ticket } from "@/model/Ticket";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export const useTicketsStore = defineStore("tickets", () => {
  const router = useRouter();
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

  async function addTicket(ticket: Ticket) {
    isAdding.value = true;
    error.value = null;

    try {
      const response = await axiosInstance.post("/ticket", ticket);
      tickets.push(response.data); // add the ticket returned by the server (it has an id)
    } catch (e: any) {
      console.error(e.message, e.response?.data);
      error.value =
        "Cannot save the new planet. 😢 " + (e.response?.data?.message ?? "");
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
