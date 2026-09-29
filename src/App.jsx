import { supabase } from "./lib/supabase";
import { BipForm } from "./components/BipForm";
import { FilTest } from "./exercices/FilTest.jsx";

function App() {
  return (
    <>
      <BipForm />
      <FilTest />
    </>
  );
}

export default App;
