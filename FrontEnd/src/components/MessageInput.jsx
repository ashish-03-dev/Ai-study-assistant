import { useState } from "react";

function MessageInput({ onSend, setShowGreeting, disabled }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || disabled) return;

    onSend(input);   // 🔥 send to parent
    setInput("");
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Ask anything..."
          onChange={(e) => {
            setInput(e.target.value);
            if (e.target.value.length > 0) {
              setShowGreeting(false);
            } else {
              setShowGreeting(true);
            }
          }}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend} disabled={disabled}>
          {disabled ? "..." : "➤"}
        </button>
      </div>
    </div>
  );
}

export default MessageInput;