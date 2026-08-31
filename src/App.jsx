import { useState } from "react";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  // Mémorise quelle page afficher : 'signup' ou 'login'
  const [page, setPage] = useState("signup");

  if (page === "login") {
    return <LoginPage onGoToSignUp={() => setPage("signup")} />;
  }

  return <SignUpPage onGoToLogin={() => setPage("login")} />;
}
