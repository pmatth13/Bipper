import { useState } from "react";

const LIMITE = 280;

export function BipForm({ onBip }) {
  const [texte, setTexte] = useState("");
  const tropLong = texte.length > LIMITE;
  const vide = texte.trim().length === 0;

  //Fonction pour soumettre le Bip
  function handleSubmit(e) {
    e.preventDefault();
    if (tropLong || vide) return;
    onBip(texte);
    setTexte("");
  }

  return (
    <form
      className="max-w-xl mx-auto mt-8 p-4 bg-white border border-gray-200 rounded-2xl shadow-sm"
      onSubmit={handleSubmit}
    >
      <textarea
        placeholder="Quelque chose à Bipper ?"
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        className="w-full h-28 p-3 text-lg bg-gray-50 rounded-xl resize-none placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      <div className="flex items-center justify-end gap-4 mt-2">
        <p className={`text-sm ${tropLong ? "text-red-500" : "text-gray-400"}`}>
          {texte.length} / {LIMITE}
        </p>
        <button
          type="submit"
          disabled={tropLong || vide}
          className="px-5 py-2 rounded-full bg-sky-500 text-white font-bold hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Bipper
        </button>
      </div>
    </form>
  );
}
