import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";
 
function App() {
 const [message, setMessage] = useState("");
 const [chat, setChat] = useState([]);
 
 const sendMessage = async () => {
 if (!message.trim()) return;
 
 const newChat = [...chat, { sender: "user", text: message }];
 setChat(newChat);
 
 const res = await fetch("http://127.0.0.1:8000/ask", {
   method: "POST",
   headers: {
    "Content-Type": "application/json"
   },
   body: JSON.stringify({ prompt: message })
 });
 
 const data = await res.json();
 
 setChat([
   ...newChat,
   { sender: "ai", text: data.response }
 ]);
 
setMessage("");
};
 
 return (
   <div className="app">
     <h1>VedaPriya's AI Coding Mentor</h1>
 
     <div className="chat-box">
       {chat.map((msg, index) => (
        <div key={index} className={msg.sender}>
 {msg.sender === "ai" ? (
   <ReactMarkdown>{msg.text}</ReactMarkdown>
 ) : (
   msg.text
 )}
</div>
       ))}
     </div>
 
     <div className="input-box">
       <input
        value={message}
         onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask coding question..."
       />
       <button onClick={sendMessage}>Send</button>
     </div>
   </div>
 );
}
 
export default App;