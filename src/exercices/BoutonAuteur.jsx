export function BoutonAuteur() {
  const bips = [
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

  const userId = "u-joe";

  return (
    <div>
      {bips.map((bip) => (
        <div key={bip.id} className="border-b border-gray-200 p-4">
          <p className="font-bold">{bip.profiles.username}</p>
          <p className="mt-1 text-gray-800">{bip.content}</p>
          {bip.author_id === userId && (
            <button className="mt-2 text-sm text-red-500 hover:underline">
              Supprimer
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
