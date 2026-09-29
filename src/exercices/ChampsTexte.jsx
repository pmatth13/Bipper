import { useState } from "react";

export function ChampsTexte() {
  const [texte, setTexte] = useState("");
  return (
    <>
      <textarea
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        className="border border-black"
      />
      <p>
        {texte.length} {texte.length < 2 ? "caractère" : "caractères"}
      </p>
    </>
  );
}
