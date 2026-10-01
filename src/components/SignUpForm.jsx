import { useState } from "react";
import { supabase } from "../lib/supabase";

export function SignUpForm({ onGoToLoginForm }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();
    setErrorMessage("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });
    if (error) {
      console.error(error.message);
      setErrorMessage("Inscription impossible, veuillez réessayer");
    }
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <form className="flex flex-col gap-3" onSubmit={handleSignUp}>
        <h1 className="text-xl font-bold">Inscription</h1>

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
          required
          autoComplete="username"
          minLength={3}
          maxLength={20}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
          required
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 focus:border-sky-500 focus:outline-none"
          required
          autoComplete="new-password"
          minLength={6}
        />
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        <button
          type="submit"
          className="rounded-full bg-sky-500 px-4 py-2 font-semibold text-white hover:bg-sky-600"
        >
          S'inscrire
        </button>
      </form>
      <button
        className="text-sm text-sky-600 hover:underline"
        type="button"
        onClick={onGoToLoginForm}
      >
        Déjà un compte ? Se connecter
      </button>
    </div>
  );
}
