import React, { useState, useEffect } from "react";
import { Folder } from "../types/Folder";

interface FolderTreeProps {
  folders: Folder[];
  createFolder: (name: string, parent?: string) => void;
  deleteFolder: (id: string) => void;
}

const FolderTree: React.FC<FolderTreeProps> = ({
  folders,
  createFolder,
  deleteFolder,
}) => {
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderParent, setNewFolderParent] = useState<string | undefined>(
    ""
  );
  const [newFolderParentName, setNewFolderParentName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);

  const [folderVisibility, setFolderVisibility] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    // Initialize folder visibility to show all folders by default when 'folders' prop updates
    if (folders.length > 0) {
      const initialVisibility: Record<string, boolean> = {};
      folders.forEach((folder) => {
        initialVisibility[folder._id] = true;
      });
      setFolderVisibility(initialVisibility);
    }
  }, [folders]);

  const handleCreateFolder = () => {
    if (newFolderName) {
      createFolder(newFolderName, newFolderParent);
      setNewFolderName("");
      setNewFolderParent("");
      setShowAddModal(false);
    }
  };

  const handleDeleteFolder = (folder: Folder) => {
    setFolderToDelete(folder);
  };

  const confirmDeleteFolder = () => {
    if (folderToDelete) {
      deleteFolder(folderToDelete._id);
      setFolderToDelete(null);
    }
  };

  const toggleFolderVisibility = (folderId: string) => {
    setFolderVisibility((prevVisibility) => ({
      ...prevVisibility,
      [folderId]: !prevVisibility[folderId],
    }));
  };

  // Recursive function to render folders
  const renderFolder = (folder: Folder) => {
    const isFolderVisible = folderVisibility[folder._id];
    const hasChildren = folders.some((child) => child.parent === folder._id);

    return (
      <li key={folder._id} className="pl-4">
        <div className="flex items-center space-x-2">
          <span
            className="pr-2 cursor-pointer"
            onClick={() => toggleFolderVisibility(folder._id)}
          >
            {isFolderVisible ? "📂" : "📁"}
          </span>
          {folder.name}
          <button
            onClick={() => {
              setNewFolderParent(folder._id);
              setNewFolderParentName(folder.name);
              setShowAddModal(true);
            }}
            className="text-green-500"
          >
            +
          </button>
          {!folder.isRoot && (
            <button
              onClick={() => handleDeleteFolder(folder)}
              className="text-red-500"
            >
              Delete
            </button>
          )}
        </div>
        {isFolderVisible && hasChildren && (
          <ul>
            {folders
              .filter((child) => child.parent === folder._id)
              .map((childFolder) => renderFolder(childFolder))}
          </ul>
        )}
        {isFolderVisible && !hasChildren && (
          <div className="pl-6 text-gray-600">- No Folders</div>
        )}
      </li>
    );
  };

  return (
    <div>
      <ul>
        {folders
          .filter((folder) => !folder.parent)
          .map((folder) => renderFolder(folder))}
      </ul>

      {/* Add Folder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white w-1/3 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-2">
              Add Folder in {newFolderParentName}
            </h2>
            <input
              type="text"
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="border p-1 w-full"
            />
            <div className="mt-2 flex justify-end">
              <button
                onClick={handleCreateFolder}
                className="bg-green-500 text-white px-2 py-1"
              >
                Create
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-red-500 text-white px-2 py-1 ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Folder Confirmation Modal */}
      {folderToDelete && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white w-1/3 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-2">
              Confirm Delete Folder
            </h2>
            <p>
              Are you sure you want to delete the folder "{folderToDelete.name}
              "?
            </p>
            <div className="mt-2 flex justify-end">
              <button
                onClick={confirmDeleteFolder}
                className="bg-red-500 text-white px-2 py-1"
              >
                Confirm
              </button>
              <button
                onClick={() => setFolderToDelete(null)}
                className="bg-gray-300 text-gray-700 px-2 py-1 ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderTree;
