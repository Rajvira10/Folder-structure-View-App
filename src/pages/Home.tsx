import { useEffect, useState } from "react";
import FolderTree from "../components/FolderTree";
import { getFolderStructure, createFolder, deleteFolder } from "../api/api";
import { Folder } from "../types/Folder";

function Home() {
  const [folderStructure, setFolderStructure] = useState<Folder[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const folders = await getFolderStructure();
        setFolderStructure(folders);
      } catch (error) {
        setError("Error fetching folder structure");
      }
    };

    fetchData();
  }, []);

  const handleCreateFolder = async (
    name: string,
    parent: string | undefined
  ) => {
    try {
      await createFolder(name, parent);
      const folders = await getFolderStructure();
      setFolderStructure(folders);
    } catch (error) {
      setError("Error creating folder");
    }
  };

  const handleDeleteFolder = async (id: string) => {
    try {
      await deleteFolder(id);
      const folders = await getFolderStructure();
      setFolderStructure(folders);
    } catch (error) {
      setError("Error deleting folder");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-4">Folder Structure</h2>
      {error && <p className="text-red-500">{error}</p>}
      <FolderTree
        folders={folderStructure}
        createFolder={handleCreateFolder}
        deleteFolder={handleDeleteFolder}
      />
    </div>
  );
}

export default Home;
