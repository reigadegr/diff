import { keyPrefix } from "../settings";
import Cookies from "js-cookie";

export function setLocalStorage(key, value) {
  return localStorage.setItem(`${keyPrefix}${key}`, value);
}

export function getLocalStorage(key) {
  return localStorage.getItem(`${keyPrefix}${key}`);
}

export function removeLocalStorage(key) {
  return localStorage.removeItem(`${keyPrefix}${key}`);
}

export function getCookie(key) {
  return Cookies.get(`${keyPrefix}${key}`);
}

export function setCookie(key, value) {
  Cookies.set(`${keyPrefix}${key}`, value);
}

export function removeCookie(key) {
  return Cookies.remove(`${keyPrefix}${key}`);
}
