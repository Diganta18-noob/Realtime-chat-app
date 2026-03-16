import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className="px-4 py-3 border-t border-base-300" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="input input-bordered input-sm flex-1 bg-base-300/50 focus:bg-base-300 border-base-300"
          placeholder="Type a message…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm btn-circle"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <BsSend className="w-4 h-4" />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
