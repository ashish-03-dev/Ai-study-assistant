import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
function MessageList({ messages }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages">
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          role={msg.role}
          text={msg.text}
          status={msg.status}
        />
      ))}
      <div ref={endRef} />
    </div>
  );
}

export default MessageList;