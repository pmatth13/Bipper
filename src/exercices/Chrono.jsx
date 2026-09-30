import { useEffect, useState } from "react";

export function Chrono() {
  const [clics, setClics] = useState(0);
  const [secondes, setSecondes] = useState(0);
  const [enMarche, setEnMarche] = useState(false);

  useEffect(() => {
    document.title = `Clics : ${clics}`;
  }, [clics]);
  useEffect(() => {
    if (!enMarche) return;
    const chrono = setInterval(
      () => setSecondes((precedent) => precedent + 1),
      1000,
    );
    return () => clearInterval(chrono);
  }, [enMarche]);

  return (
    <div className="w-fit mx-auto p-4 mb-4 border border-gray-700 rounded-xl flex items-center gap-4 ">
      <p className="text-2xl font-bold ">{clics}</p>
      <button
        className="px-4 py-2 rounded-full bg-sky-500 text-white font-semibold hover:bg-sky-600"
        onClick={() => setClics(clics + 1)}
      >
        +1
      </button>
      <p>{secondes}s</p>
      <button
        className="px-4 py-2 rounded-full border border-sky-500 text-sky-500 font-semibold hover:bg-sky-500 hover:text-white"
        onClick={() => setEnMarche(!enMarche)}
      >
        {enMarche ? "Arrêter" : "Démarrer"}
      </button>
      <button
        className="px-4 py-2 rounded-full border border-gray-500 text-gray-500 font-semibold hover:bg-gray-500 hover:text-white"
        onClick={() => {
          setSecondes(0);
          setEnMarche(false);
        }}
      >
        Réinitialiser
      </button>
    </div>
  );
}
