import { Bip } from "./Bip";

export function BipList({ bips, loading, onDelete, userId }) {
  if (loading) {
    return <p className="text-center text-gray-500">Chargement...</p>;
  }
  if (bips.length === 0) {
    return (
      <p className="text-center text-gray-500">Aucun bip pour le moment</p>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {bips.map((bip) => (
        <Bip
          key={bip.id}
          auteur={bip.auteur}
          id={bip.id}
          texte={bip.texte}
          onDelete={onDelete}
          userId={userId}
          authorId={bip.authorId}
        />
      ))}
    </div>
  );
}
