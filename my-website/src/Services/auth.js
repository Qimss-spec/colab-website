// src/services/auth.js
const TOKEN_KEY = "token";
const ROLE_KEY = "role";

export function login({ token, role = "user" }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthed() {
  return Boolean(getToken());
}

export function getRole() {
  return localStorage.getItem(ROLE_KEY) || "user";
}

export function isAdmin() {
  return getRole() === "admin";
}
