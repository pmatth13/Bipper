import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const LIMITE = 280;

export function BipForm({ onBip, userId }) {
  const [texte, setTexte] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const tropLong = texte.length > LIMITE;
  const vide = texte.trim().length === 0;

  useEffect(() => {
    if (!confirmation) {
      return;
    }
    const id = setTimeout(() => setConfirmation(""), 3000);
    return () => {
      clearTimeout(id);
      console.log("Clean Up");
    };
  }, [confirmation]);

  //Fonction pour soumettre le Bip
  async function handleSubmit(e) {
    e.preventDefault(); //Empeche le navigateur de recharger la page par defaut
    if (tropLong || vide) return;
    setErrorMessage("");
    setSending(true);

    const { data, error } = await supabase
      .from("tweets")
      .insert({ content: texte, author_id: userId })
      .select("id, content, created_at, author_id, profiles(username)")
      .single();

    setSending(false);
    if (error) {
      console.error(error.message);
      setErrorMessage("Le bip n'a pas pu être publié");
      return;
    }
    onBip(data);
    setConfirmation("Bip publié !");
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
        {confirmation && (
          <p className="text-sm text-green-600">{confirmation}</p>
        )}
        <button
          type="submit"
          disabled={tropLong || vide || sending}
          className="px-5 py-2 rounded-full bg-sky-500 text-white font-bold hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? "Publication" : "Bipper"}
        </button>
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      </div>
    </form>
  );
}
