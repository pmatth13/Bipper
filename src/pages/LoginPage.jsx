import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginPage({ onGoToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      console.log("Connecté", data);
    }
  }

  return (
    <div>
      <h1>Connexion</h1>

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

      <button onClick={handleLogin} disabled={loading}>
        Se connecter
      </button>

      {error && <p>{error}</p>}

      <button onClick={onGoToSignUp}>Pas de compte ? S'inscrire</button>
    </div>
  );
}
