import { axiosInstance, setBearerAuthToken } from "@/code/api";
import { User } from "@/model/User";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { defineStore } from "pinia";
import { ref } from "vue";

const TOKEN_COOKIE_NAME = "auth_token";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User>();

  function reloadUser() {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    if (token) {
      user.value = jwt_decode(token);
      setBearerAuthToken(token);
    }
  }

  async function login(username: string, password: string) {
    try {
      const response = await axiosInstance.post("/user/login", {
        username,
        password,
      });

      const { token } = response.data;

      setBearerAuthToken(token);
      Cookies.set(TOKEN_COOKIE_NAME, token);

      user.value = jwt_decode(token);

      return { error: null };
    } catch (error: any) {
      return {
        error: error.response?.data?.message ?? "Unknown error",
      };
    }
  }

  async function register(username: string, password: string, email: string, name: string, surname: string, role: string) {
    try {
      const response = await axiosInstance.post("/user/register", {
        username, password, email, name, surname, role
      });

      const { token } = response.data;

      setBearerAuthToken(token);
      Cookies.set(TOKEN_COOKIE_NAME, token);

      user.value = jwt_decode(token);

      return { error: null };
    } catch (error: any) {
      return {
        error: error.response?.data?.message ?? "Unknown error",
      };
    }
  }

  function logout() {
    Cookies.remove(TOKEN_COOKIE_NAME);
    user.value = undefined;
    setBearerAuthToken(undefined);
  }

  return { login, register, logout, reloadUser, user };
});
