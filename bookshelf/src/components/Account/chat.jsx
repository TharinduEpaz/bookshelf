import React, { useState, useRef } from "react";
import {
  Box,
  Input,
  Button,
} from "@chakra-ui/react";

const chatContainerStyle = {
  width: "100%",
  height: "50%",
  border: "1px solid #ccc",
  overflow: "hidden",
  position: "relative",
  backgroundColor: "white",
  borderRadius: "20px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
};

const messageContainerStyle = {
  flex: 1,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column-reverse", // Keep the newest message at the bottom
};

const messageStyle = {
  marginBottom: "10px",
  padding: "8px",
  borderRadius: "8px",
  maxWidth: "80%",
};

const receivedMessageStyle = {
  ...messageStyle,
  backgroundColor: "#f0f0f0",
  alignSelf: "flex-start", // Align received messages to the left
};

const sentMessageStyle = {
  ...messageStyle,
  backgroundColor: "#cceeff",
  alignSelf: "flex-end", // Align sender messages to the right
};

const ChatMessage = ({ message, isUser }) => (
  <Box
    p={2}
    borderRadius="8px"
    maxW="80%"
    bgColor={isUser ? "#cceeff" : "#f0f0f0"}
    alignSelf={isUser ? "flex-end" : "flex-start"}
  >
    {message.text}
  </Box>
);

const chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", isUser: true }, // Sender's message
  ]);

  const messageInputRef = useRef(null);

  const handleSendMessage = () => {
    const messageText = messageInputRef.current.value;
    if (messageText.trim() === "") return;

    const newMessage = { text: messageText, isUser: false }; // Response
    setMessages([newMessage, ...messages]); // Place the new message at the top

    messageInputRef.current.value = "";
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Box style={chatContainerStyle} width="100%" height="100%">
      <Box style={messageContainerStyle}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} isUser={message.isUser} />
        ))}
      </Box>
      <Box display="flex" mt={4}>
        <Input
          type="text"
          ref={messageInputRef}
          placeholder="Type your message..."
          onKeyPress={handleKeyPress}
          
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </Box>
    </Box>
  );
};

export default chat;
