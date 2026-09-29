import { useState } from "react";

export function BoutonBip() {
  const [like, setLike] = useState(false);
  return (
    <button
      onClick={() => setLike(!like)}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {like ? "Je ne bip plus" : "Je bip"}
    </button>
  );
}
