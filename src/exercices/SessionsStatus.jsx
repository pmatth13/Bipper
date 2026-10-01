import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function SessionStatus() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Check si session en cours
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);

      if (error) {
        console.error(error.message);
      }
    }
    checkSession();

    //S'abonner (Lancer l'écoute)
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      console.log(event);
    });
    //Se désabonner (Couper l écoute)
    return () => data.subscription.unsubscribe();
  }, []);

  //Gere la connexion
  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email: "...",
      password: "...",
    });
    if (error) {
      console.error(error.message);
    }
  }
  //Gere la deconnexion
  async function handleCheckOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error.message);
    }
  }

  if (loading) {
    return <p>Verification de la session...</p>;
  }
  if (!session) {
    return (
      <div className="flex flex-col items-start gap-3">
        <p>Non connecté</p>
        <button
          onClick={handleLogin}
          className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          Se connecter en pm
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-start gap-3">
      <p>Connecté en tant que {session.user.email}</p>
      <button
        onClick={handleCheckOut}
        className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-100"
      >
        Se déconnecter
      </button>
    </div>
  );
}
