// https://rickandmortyapi.com/api

import axios from 'axios';
import { ImgList, Episode } from '../types';

export const loadDetails = async (): Promise<any> => {
  return axios
    .get<Array<ImgList>>(`https://rickandmortyapi.com/api/character`)
    .then((response: any) => response.data.results)
    .catch((e: Error) => {
      console.log(e);
      // return [];
    });
};

export const loadNextDetails = async (pgNo: number): Promise<any> => {
  return axios
    .get<Array<ImgList>>(`https://rickandmortyapi.com/api/character/?page=` + pgNo)
    .then((response: any) => response.data.results)
    .catch((e: Error) => {
      console.log(e);
      // return [];
    });
};

export const fetchEpisode = async (episode: any): Promise<Episode[]> => {
  let episodesDetails = [];
  // episode.map((ep) => {
  try {
    // episodesDetails.push(await fetch(ep).then((response) => response.json()));
    episodesDetails = await Promise.all(
      episode.map(async (url) => {
        const resp = await fetch(url);
        return resp.json();
      })
    );
  } catch (e) {
    console.log(`Exited server start ${e}`);
  }
  return episodesDetails;
};
