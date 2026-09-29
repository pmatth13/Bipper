export function Bip({ auteur, texte, id, onDelete }) {
  return (
    <div className="border-b border-gray-200 p-4">
      <p className="font-bold">{auteur}</p>
      <p className="mt-1 text-gray-800">{texte}</p>
      <button
        onClick={() => onDelete(id)}
        className="mt-2 text-sm text-red-500 hover:underline"
      >
        Supprimer
      </button>
    </div>
  );
}
