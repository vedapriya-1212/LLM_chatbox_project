import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newChat = [
      ...chat,
      {
        sender: "user",
        text: message,
      },
    ];

    setChat(newChat);

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/ask",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            prompt: message,
          }),
        }
      );

      const data = await res.json();

      setChat([
        ...newChat,
        {
          sender: "ai",
          text: data.response,
        },
      ]);
    } catch {
      setChat([
        ...newChat,
        {
          sender: "ai",
          text: "Error connecting to backend.",
        },
      ]);
    }

    setMessage("");
  };

  const newChatHandler = () => {
    setChat([]);
  };

  return (
    <div className="layout">

      {/* Sidebar */}

      <div className="sidebar">

        <div className="logo">
          ⚡ ChatAI
        </div>

        <button
          className="new-chat-btn"
          onClick={newChatHandler}
        >
          + New Chat
        </button>

        <div className="history">
          <h3>Recent Chats</h3>

          <div className="history-item">
            React Questions
          </div>

          <div className="history-item">
            Python Help
          </div>

          <div className="history-item">
            ML Training
          </div>

        </div>

      </div>

      {/* Main */}

      <div className="main">

        <div className="header">

          <h1>
            VedaPriya's AI Coding Mentor
          </h1>

          <p>
            Learn Coding • Build AI •
            Debug Faster
          </p>

        </div>

        <div className="chat-box">

          {chat.length === 0 && (
            <div className="welcome">
              👋 Ask me anything about
              Python, React, AI,
              Machine Learning, DSA
              and more.
            </div>
          )}

          {chat.map((msg, index) => (
            <div
              key={index}
              className={`message-row ${msg.sender}`}
            >
              <div className="avatar">
                {msg.sender === "ai"
                  ? "🤖"
                  : "👨‍💻"}
              </div>

              <div
                className={`bubble ${msg.sender}`}
              >
                {msg.sender === "ai" ? (
                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="input-box">

          <input
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            placeholder="Ask me anything..."
            onKeyDown={(e) =>
              e.key === "Enter" &&
              sendMessage()
            }
          />

          <button onClick={sendMessage}>
            ➤
          </button>

        </div>

      </div>

    </div>
  );
}

export default App;