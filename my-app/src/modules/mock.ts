import { type RenderServerUnitsResult } from "./renderServerUnitsApi";

export const RENDER_SERVER_UNITS_MOCK: RenderServerUnitsResult = {
  max: 128,
  min: 8,
  renderServerUnits: [
    {
      id: 1,
      processor: "processor",
      description: "some",
      status: "published",
      image: "",
      video: "",
      cores: 0,
      ram: 0,
      likes_number: 0,
      is_mine: false,
    },
  ],
};