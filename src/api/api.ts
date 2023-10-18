import axios from "axios";
import { Folder } from "../types/Folder";

const baseURL = import.meta.env.BASEURL || "http://localhost:3001/api/folders/"; // Replace with your API endpoint

// Fetch the folder structure
export const getFolderStructure = async (): Promise<Folder[]> => {
  const response = await axios.get<Folder[]>(baseURL);
  return response.data;
};

// Create a new folder
export const createFolder = async (
  name: string,
  parent?: string
): Promise<Folder> => {
  const response = await axios.post<Folder>(baseURL, { name, parent });
  return response.data;
};

// Delete a folder
export const deleteFolder = async (id: string): Promise<void> => {
  await axios.delete(`${baseURL}/${id}`);
};
