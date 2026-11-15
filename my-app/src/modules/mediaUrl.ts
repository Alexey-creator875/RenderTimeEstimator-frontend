// Бэкенд возвращает абсолютные адреса файлов из MinIO (http://localhost:9000/render-assets/...).
// Переписываем их в относительные (/render-assets/...), чтобы запросы шли через прокси Vite,
// а не напрямую в MinIO: так работает и с другого устройства в локальной сети.
export const toProxyUrl = (url?: string): string | undefined => {
  if (!url) return url;
  try {
    const { pathname } = new URL(url);
    return pathname;
  } catch {
    // уже относительный адрес (например, файлы из public)
    return url;
  }
};

export const withProxyMedia = <T extends { image?: string; video?: string }>(
  unit: T
): T => ({
  ...unit,
  image: toProxyUrl(unit.image),
  video: toProxyUrl(unit.video),
});
