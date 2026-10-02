import { supabase } from "./lib/supabase";
import { BipForm } from "./components/BipForm";
import { BipList } from "./components/BipList";
import { LoginForm } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
import { useEffect, useState } from "react";

export function App() {
  const [bips, setBips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  //Permet de verifier si session active, ecoute et nettoyage
  useEffect(() => {
    //Check si session en cours
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
      setSessionLoading(false);

      if (error) {
        console.error(error.message);
      }
    }
    checkSession();

    //S'abonner (Lancer l'écoute)
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      console.log(event);
      if (event === "SIGNED_OUT") setShowSignUp(false);
    });
    //Se désabonner (Couper l écoute)
    return () => data.subscription.unsubscribe();
  }, []);

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

  //Gere la deconnexion (la connexion est gere dans le composant LoginForm)
  async function handleLogOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error.message);
    }
  }

  //Permet de recevoir un Bip confirmé par la BDD
  function handleBip(bip) {
    const newBip = {
      id: bip.id,
      auteur: bip.profiles.username,
      texte: bip.content,
    };
    setBips((prev) => [newBip, ...prev]);
  }
  //Permet de supprimer un bip
  function handleDelete(id) {
    const aGarder = bips.filter((bip) => bip.id !== id);
    setBips(aGarder);
  }

  //Les return conditionnels
  if (sessionLoading) {
    return <p>Verification de la session...</p>;
  }
  if (!session) {
    return showSignUp ? (
      <SignUpForm onGoToLoginForm={() => setShowSignUp(false)} />
    ) : (
      <LoginForm onGoToSignUpForm={() => setShowSignUp(true)} />
    );
  }
  return (
    <>
      <div className="flex flex-col items-start gap-3">
        <p>Connecté en tant que {session.user.email}</p>
        <button
          onClick={handleLogOut}
          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-100"
        >
          Se déconnecter
        </button>
      </div>
      <BipForm onBip={handleBip} userId={session.user.id} />
      <BipList onDelete={handleDelete} loading={loading} bips={bips} />
    </>
  );
}
