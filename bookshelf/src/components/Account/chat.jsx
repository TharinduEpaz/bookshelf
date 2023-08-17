import React, { useState } from "react";

const chatContainerStyle = {
  width: "300px",
  height: "400px",
  border: "1px solid #ccc",
  overflow: "hidden",
  position: "relative",
};

const messageStyle = {
  marginBottom: "10px",
  padding: "8px",
  borderRadius: "8px",
  maxWidth: "80%",
};

const userMessageStyle = {
  ...messageStyle,
  backgroundColor: "#cceeff",
  alignSelf: "flex-end",
};

const botMessageStyle = {
  ...messageStyle,
  backgroundColor: "#f0f0f0",
  alignSelf: "flex-start",
};

const ChatMessage = ({ message, isUser }) => (
  <div style={isUser ? userMessageStyle : botMessageStyle}>
    {message.text}
  </div>
);

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", isUser: false },
    { text: "Hi there! I have a question.", isUser: true },
    { text: "Sure, feel free to ask.", isUser: false },
  ]);

  return (
    <div style={{display:'flex',width:'100%',justifyContent:'center'}}>
    <div style={chatContainerStyle} >
      <div style={{ padding: "10px", overflowY: "auto", height: "calc(100% - 40px)" }}>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            isUser={message.isUser}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default ChatInterface;
