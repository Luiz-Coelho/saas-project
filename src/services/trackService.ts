import { CreateTrack, Track } from "@/typing/Track";
import axios from "axios";

const url = "http://localhost:3000/api/tracks";

export const getTracks = async (): Promise<Track[]> => {
  const { data } = await axios.get(url);
  return data;
};

export const getTrackById = async (id: string): Promise<Track> => {
  const { data } = await axios.get(url + "/" + id);
  return data;
};

export const createTrack = async (body: CreateTrack) => {
  const { data } = await axios.post(url, body);
  return data;
};
