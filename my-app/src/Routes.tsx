export const ROUTES = {
  LIST: "/",
  DETAIL: "/detail",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
  LIST: "Список",
  DETAIL: "Подробнее",
};