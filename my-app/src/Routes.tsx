export const ROUTES = {
  LIST: "/",
  DETAIL: "/detail",
  LOGIN: "/login",
  ADD: "/add",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
  LIST: "Список",
  DETAIL: "Подробнее",
  LOGIN: "Вход",
  ADD: "Добавление",
};