// import React from 'react'

// function chat() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default chat
import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
// import Divider from "../components/Divider";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import Messages from "../components/Messages";

const Chat = () => {
  const [messages, setMessages] = useState([
    { from: "computer", text: "Hi, My Name is HoneyChat" },
    { from: "me", text: "Hey there" },
    { from: "me", text: "Myself Ferin Patel" },
    {
      from: "computer",
      text: "Nice to meet you. You can send me message and i'll reply you with same message.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages((old) => [...old, { from: "me", text: data }]);
    setInputMessage("");

    setTimeout(() => {
      setMessages((old) => [...old, { from: "computer", text: data }]);
    }, 1000);
  };

  return (
    <div>chat</div>
  )
}

export default Chat;