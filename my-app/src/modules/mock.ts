import type { RenderServerUnitsResult } from "./renderServerUnitsApi";

export const RENDER_SERVER_UNITS_MOCK: RenderServerUnitsResult = {
  max: 128,
  min: 8,
  renderServerUnits: [
    {
      id: 1,
      processor: "RTX 4070 Ti",
      description:
        "Сбалансированный вариант для небольших студий. Быстро справляется с рендерингом интерьеров и анимации средней сложности, экономично расходует электроэнергию.",
      status: "published",
      image: "",
      video: "",
      cores: 12,
      ram: 12,
      likes_number: 9,
      is_mine: false,
    },
    {
      id: 2,
      processor: "RX 7900 XTX",
      description:
        "Мощная видеокарта с большим объёмом памяти. Подходит для тяжёлых сцен с большим количеством текстур и для рендеринга в высоком разрешении.",
      status: "published",
      image: "",
      video: "",
      cores: 16,
      ram: 48,
      likes_number: 2,
      is_mine: false,
    },
    {
      id: 3,
      processor: "NVIDIA A100",
      description:
        "Профессиональный ускоритель для рендер-ферм. Рассчитан на непрерывную нагрузку, обрабатывает самые крупные сцены и объёмные симуляции.",
      status: "published",
      image: "",
      video: "",
      cores: 32,
      ram: 96,
      likes_number: 5,
      is_mine: false,
    },
  ],
};
