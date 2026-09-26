import { supabase } from "./lib/supabase";

function App() {
  console.log(supabase);
  return <h1 className="text-red-500">Hello world</h1>;
}

export default App;
