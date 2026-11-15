import { Api } from "./Api";

// В сгенерированных путях уже есть префикс /api, поэтому baseURL пустой.
// Запросы идут через прокси Vite.
export const api = new Api({
  baseURL: "",
  // Для методов с @secure подставляем JWT из localStorage
  securityWorker: () => {
    const token = localStorage.getItem("access_token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  },
});
