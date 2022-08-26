export interface ImgList {
  imglink: string;
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: 'Male' | 'Female';
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
    url: string;
  };
  image: string;
  episode: Array<string>[];
  urls: string;
}

export interface Episode {
  id: 1;
  name: string;
  air_date: string;
  episode: string;
  characters: string;
  url: string;
}

export interface CharState {
  pgNumber: number;
}

export interface CharAction {
  type: 'GET_NEXT_RES';
  payload: number;
}
