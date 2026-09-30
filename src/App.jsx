import { supabase } from "./lib/supabase";
import { BipForm } from "./components/BipForm";
import { Bip } from "./components/Bip";
import { useEffect, useState } from "react";

function App() {
  const [bips, setBips] = useState([]);

  useEffect(() => {
    async function chargerBips() {
      const { data, error } = await supabase
        .from("tweets")
        .select("id, content, created_at, profiles(username)")
        .is("parent_id", null)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      const bipCharges = data.map((bip) => ({
        id: bip.id,
        auteur: bip.profiles.username,
        texte: bip.content,
      }));
      setBips(bipCharges);
    }
    chargerBips();
  }, []);

  //Permet de recevoir le texte de BipForm
  function handleBip(texte) {
    const bip = { id: Date.now(), auteur: "PM", texte: texte };
    setBips([bip, ...bips]);
  }
  //Permet de supprimer un bip
  function handleDelete(id) {
    const aGarder = bips.filter((bip) => bip.id !== id);
    setBips(aGarder);
  }
  return (
    <>
      <BipForm onBip={handleBip} />
      <div className="flex flex-col gap-3">
        {bips.length === 0 ? (
          <p className="text-center text-gray-500">Aucun bip pour le moment</p>
        ) : (
          bips.map((bip) => (
            <Bip
              key={bip.id}
              auteur={bip.auteur}
              id={bip.id}
              texte={bip.texte}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
