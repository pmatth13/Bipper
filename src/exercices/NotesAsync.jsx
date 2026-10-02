import { useState } from "react";

function fakeInsert(texte) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (texte.trim() === "") {
        resolve({ data: null, error: { message: "Le texte est vide" } });
      } else {
        resolve({ data: { id: Date.now(), contenu: texte }, error: null });
      }
    }, 1000);
  });
}

export function NotesAsync() {
  const [texte, setTexte] = useState("");
  const [list, setList] = useState([]);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleInsert(e) {
    e.preventDefault();
    setErrorMessage("");
    setSending(true);
    const { error, data } = await fakeInsert(texte);
    setSending(false);
    if (error) {
      console.error(error.message);
      setErrorMessage(error.message);
      return;
    }
    setList((prev) => [data, ...prev]);
    setTexte("");
  }
  return (
    <>
      <form onSubmit={handleInsert} className="flex gap-2">
        <textarea
          className="flex-1 rounded border border-gray-300 px-3 py-2"
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="rounded-full bg-sky-500 px-4 py-2 font-semibold text-white hover:bg-sky-600 disabled:opacity-50"
          disabled={sending}
        >
          {sending ? "Envoi..." : "Ajouter"}
        </button>
      </form>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
      <ul className="mt-4 flex flex-col gap-2">
        {list.map((note) => (
          <li
            key={note.id}
            className="rounded border border-gray-200 px-3 py-2"
          >
            {note.contenu}
          </li>
        ))}
      </ul>
    </>
  );
}
