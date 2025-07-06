import { CreateTrack, Track, TrackPopulated } from "@/types/Track";
import axios from "axios";
import { formatObject } from "./formatService";

const url = "http://localhost:4000/api/tracks";

export const getTracks = async (): Promise<TrackPopulated[]> => {
  const { data } = await axios.get<TrackPopulated[]>(url);
  return data.map(formatObject);
};

export const getTrackById = async (id: string): Promise<Track> => {
  const { data } = await axios.get<Track>(url + "/" + id);
  return formatObject(data);
};

export const createTrack = async (body: CreateTrack) => {
  const { data } = await axios.post<CreateTrack>(url, body);
  return data;
};

export const updateTrack = async (body: Track) => {
  const { data } = await axios.put<Track>(url + "/" + body._id, body);
  return data;
};
