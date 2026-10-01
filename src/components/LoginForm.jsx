import { useState } from "react";
import { supabase } from "../lib/supabase";

export function LoginForm({ onGoToSignUpForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //Fonction pour soumettre le formulaire
  async function handleLogin(e) {
    e.preventDefault(); //Empeche le navigateur de recharger la page par defaut
    setErrorMessage("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error.message);
      setErrorMessage("Email ou mot de passe invalide");
    }
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <form className="flex w-full flex-col gap-3" onSubmit={handleLogin}>
        <h1 className="text-xl font-bold">Connexion</h1>
        <input
          className="rounded-lg border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <input
          className="rounded-lg border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        <button
          type="submit"
          className="rounded-full bg-sky-500 px-4 py-2 font-semibold text-white hover:bg-sky-600"
        >
          Se connecter
        </button>
      </form>
      <button
        className="text-sm text-sky-600 hover:underline"
        type="button"
        onClick={onGoToSignUpForm}
      >
        Pas encore inscrit ? Par ici
      </button>
    </div>
  );
}
