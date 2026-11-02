export interface RenderServerUnit {
  id: number;
  processor: string;
  description: string;
  status: string;
  image: string;
  video: string;
  cores: number;
  ram: number;
  likes_number: number;
  is_mine: boolean;
}

export interface RenderServerUnitsResult {
  max: number;
  min: number
  renderServerUnits: RenderServerUnit[];
}

export const getRenderServerUnitsByRam = async (min = 8, max = 128): Promise<RenderServerUnitsResult> => {
  return fetch(`/api/render-server-units?min=${min}&max=${max}`).then(
    (response) => response.json()
  );
};

export const getRenderServerUnitById = async (
  id: number | string
): Promise<RenderServerUnitsResult> => {
  return fetch(`/api/render-server-units/${id}`).then(
    (response) => response.json()
  );
};