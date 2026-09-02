import { useState } from "react";
import { supabase } from "../lib/supabase";

// Reçue depuis App.jsx => Affichage de la page de connexion grâce à la Props onGoToLogin
export default function SignUpPage({ onGoToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Deux états de service
  const [error, setError] = useState(null); // message d'erreur à afficher
  const [loading, setLoading] = useState(false); // false = pas de requete en cours, true = requete en cours

  // Appelée au clic sur le bouton
  async function handleSignUp() {
    setError(null); // on efface l'erreur précédente
    setLoading(true); // bloque bouton

    // Envoi à Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    setLoading(false); // requête terminée => débloque

    // Test si erreur
    if (error) {
      setError(error.message);
    } else {
      console.log("Compte créé", data);
    }
  }

  return (
    <div>
      <h1>Inscription</h1>

      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* disabled={loading} empêche de cliquer pendant la requête */}
      <button onClick={handleSignUp} disabled={loading}>
        {loading ? "Création..." : "S'inscrire"}
      </button>

      {/* Affiche le paragraphe seulement si error contient un message */}
      {error && <p>{error}</p>}

      <button onClick={onGoToLogin}>Déjà un compte ? Se connecter</button>
    </div>
  );
}
