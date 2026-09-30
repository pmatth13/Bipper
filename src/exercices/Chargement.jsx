import { useState, useEffect } from "react";

const msg = ["msg1", "msg2", "msg3"];

export function Chargement() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMessages(msg);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }
  if (messages.length === 0) {
    return <p>Aucun message</p>;
  }
  return (
    <ul>
      {messages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
}
