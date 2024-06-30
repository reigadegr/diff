import { tokenKey,keyPrefix } from "../settings";
import { useStorage } from "@vueuse/core";

import Cookies from "js-cookie";

const tokenStorage = useStorage(tokenKey, null);

export const getToken = () => tokenStorage.value;

export const setToken = (access_token) => (tokenStorage.value = access_token);

export const removeToken = () => (tokenStorage.value = null);

export function getCookie(key) {
  return Cookies.get(`${keyPrefix}${key}`);
}

export function setCookie(key, value) {
  Cookies.set(`${keyPrefix}${key}`, value, { expires: 30 });
}

export function removeCookie(key) {
  return Cookies.remove(`${keyPrefix}${key}`);
}
