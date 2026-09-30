import { supabase } from "./lib/supabase";
import { BipForm } from "./components/BipForm";
import { BipList } from "./components/BipList";
import { useEffect, useState } from "react";

function App() {
  const [bips, setBips] = useState([]);
  const [loading, setLoading] = useState(true);

  //Permet d'actualiser les bips avec la database
  useEffect(() => {
    async function chargerBips() {
      const { data, error } = await supabase
        .from("tweets")
        .select("id, content, created_at, profiles(username)")
        .is("parent_id", null)
        .order("created_at", { ascending: false });

      setLoading(false);

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
      <BipList onDelete={handleDelete} loading={loading} bips={bips} />
    </>
  );
}

export default App;
