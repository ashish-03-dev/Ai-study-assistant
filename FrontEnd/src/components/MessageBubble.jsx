function MessageBubble({ role, text, status }) {
  return (
    <div className={`message-row ${role}`}>
      <div className={`message-bubble ${status || ""}`}>
        {status === "loading" ? "Thinking..." : text}
      </div>
    </div>
  );
}

export default MessageBubble;