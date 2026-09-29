import { supabase } from "./lib/supabase";
import { BipForm } from "./components/BipForm";
import { Bip } from "./components/Bip";
import { useState } from "react";

function App() {
  const [dernierBip, setDernierBip] = useState(null);
  //Permet de recevoir le texte de BipForm
  function handleBip(texte) {
    setDernierBip(texte);
  }
  //Permet de supprimer un bip
  function handleDelete() {
    setDernierBip(null);
  }
  return (
    <>
      <BipForm onBip={handleBip} />
      {dernierBip ? (
        <Bip auteur="PM" texte={dernierBip} id={1} onDelete={handleDelete} />
      ) : null}
    </>
  );
}

export default App;
