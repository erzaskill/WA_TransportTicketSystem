import { axiosInstance } from "@/code/api";
import type { Link } from "@/model/Link";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useLinksStore = defineStore("links", () => {
  const links = reactive<Link[]>([]);
  const isLoading = ref(false);
  const isAdding = ref(false);
  const error = ref<string | null>(null);

  const totalLinks = computed<number>(() => links.length);

  async function fetchLinks() {
    isLoading.value = true;
    error.value = null;

    try {
      // @ts-ignore - possible bug?
      const response = await axiosInstance.get("/links");
      links.splice(0, links.length);
      links.push(...response.data);
    } catch (e: any) {
      console.error(e);
      error.value = "Cannot download stations. 😢";
    } finally {
      isLoading.value = false;
    }
  }
  return {
    links,
    isLoading,
    isAdding,
    error,
    totalLinks,
    fetchLinks,
  };
});
