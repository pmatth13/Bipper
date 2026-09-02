import { useState, useEffect } from "react"; //UseState = mémoire de React
import { supabase } from "./lib/supabase";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  // Mémorise quelle page afficher : 'signup' ou 'login'
  const [page, setPage] = useState("signup");
  const [user, setUser] = useState(null); // null = pas connecté
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Écoute les changements de session && Se déclenche une fois au démarrage avec la session existante.
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null); // revoi les données si y'a session sinon null
      setChecking(false);
    });

    // Nettoyage au démontage = Arrêt de l'ecoute
    return () => data.subscription.unsubscribe();
  }, []);

  // En attente de réponses ..
  if (checking) return <p>Chargement...</p>;

  // Connecté
  if (user) return <p>Connecté en tant que {user.email}</p>;

  // Pas connecté alors inscription ou connexion
  if (page === "login") {
    //Chaque page recoit la fonction qui mène vers l'autre
    return <LoginPage onGoToSignUp={() => setPage("signup")} />;
  }

  return <SignUpPage onGoToLogin={() => setPage("login")} />;
}
