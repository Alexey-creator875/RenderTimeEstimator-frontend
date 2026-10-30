export interface ITunesMusic {
  wrapperType: string;
  artworkUrl100: string;
  artistName: string;
  collectionCensoredName: string;
  trackViewUrl: string;
  trackId: number;
  previewUrl?: string;
}

export interface ITunesResult {
  resultCount: number;
  results: ITunesMusic[];
}

export const getMusicByName = async (name = ""): Promise<ITunesResult> => {
  return fetch(`https://itunes.apple.com/search?term=${name}`).then(
    (response) => response.json()
  );
};

export const getTrackById = async (
  id: number | string
): Promise<ITunesResult> => {
  return fetch(`https://itunes.apple.com/lookup?id=${id}`).then(
    (response) => response.json()
  );
};