export function AuteurIds() {
  const auteurs = [
    {
      id: "a1",
      content: "Test",
      author_id: "u-pm",
      profiles: { username: "pm" },
    },
    {
      id: "a2",
      content: "Test2",
      author_id: "u-pm",
      profiles: { username: "pm" },
    },
    {
      id: "a3",
      content: "Test",
      author_id: "u-joe",
      profiles: { username: "joe" },
    },
  ];

  const auteurArray = auteurs.map((auteur) => ({
    id: auteur.id,
    auteur: auteur.profiles.username,
    texte: auteur.content,
    authorId: auteur.author_id,
  }));

  console.log(auteurArray);
}
