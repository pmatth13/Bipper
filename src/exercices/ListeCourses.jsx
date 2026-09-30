import { useState } from "react";

export function ListeCourses() {
  const [articles, setArticles] = useState([
    { id: 1, nom: "montre" },
    { id: 2, nom: "ordi" },
    { id: 3, nom: "smartphone" },
  ]);
  const [texte, setTexte] = useState("");
  const vide = texte.trim().length === 0;

  function handleSubmit(e) {
    e.preventDefault(); //Empeche le navigateur de recharger la page par defaut
    if (vide) return;
    const nouvelArticle = { id: Date.now(), nom: texte };
    setArticles([nouvelArticle, ...articles]);
    setTexte("");
  }

  function handleDelete(id) {
    const toKeep = articles.filter((article) => article.id !== id);
    setArticles(toKeep);
  }
  return (
    <>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            {article.nom}
            <button onClick={() => handleDelete(article.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Quelque chose à ajouter ?"
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
    </>
  );
}
