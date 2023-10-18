import axios from "axios";
import { Folder } from "../types/Folder";

const baseURL = import.meta.env.BASEURL || "http://localhost:3001/api/folders/";

export const getFolderStructure = async (): Promise<Folder[]> => {
  const response = await axios.get<Folder[]>(baseURL);
  return response.data;
};

export const createFolder = async (
  name: string,
  parent?: string
): Promise<Folder> => {
  const response = await axios.post<Folder>(baseURL, { name, parent });
  return response.data;
};

export const deleteFolder = async (id: string): Promise<void> => {
  await axios.delete(`${baseURL}/${id}`);
};
