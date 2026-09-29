import { Bip } from "./Bip.jsx";
import { useState } from "react";

export function FilTest() {
  const [dernierSupprime, setDernierSupprime] = useState(null);
  function handleDelete(id) {
    setDernierSupprime(id);
  }
  return (
    <div className="max-w-xl mx-auto">
      <p>Dernier Bip supprimé: {dernierSupprime ? dernierSupprime : "aucun"}</p>
      <Bip auteur="Marc" texte="Hello World" id={1} onDelete={handleDelete} />
      <Bip
        auteur="Pierre"
        texte="Hi, i'm here"
        id={2}
        onDelete={handleDelete}
      />
      <Bip
        auteur="Matthieu"
        texte="Hello everybody"
        id={3}
        onDelete={handleDelete}
      />
    </div>
  );
}
