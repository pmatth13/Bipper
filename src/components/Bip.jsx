import { useState } from "react";

export function Bip({ auteur, texte, id, onDelete, authorId, userId }) {
  const [deleting, setDeleting] = useState(false);
  async function handleClick() {
    setDeleting(true);
    await onDelete(id);
    setDeleting(false);
  }
  return (
    <div className="border-b border-gray-200 p-4">
      <p className="font-bold">{auteur}</p>
      <p className="mt-1 text-gray-800">{texte}</p>
      {authorId === userId && (
        <button
          onClick={handleClick}
          disabled={deleting}
          className="mt-2 text-sm text-red-500 hover:underline disabled:opacity-50 disabled:cursor-"
        >
          {deleting ? "Suppression..." : "Supprimer"}
        </button>
      )}
    </div>
  );
}
