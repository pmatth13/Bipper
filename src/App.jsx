import { supabase } from "./lib/supabase";
import { BoutonBip } from "./exercices/BoutonBip";
import { ChampsTexte } from "./exercices/ChampsTexte";

function App() {
  return (
    <>
      <BoutonBip />
      <ChampsTexte />
    </>
  );
}

export default App;
