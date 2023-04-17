import React, { useState } from "react";
import ChatBotDialog from "./chatBotDialog";
import "./chatBotButton.css";
import "./chatBotDialog.css";

const СhatBotButton = () =>{
    const [isChatbotVisible, setIsChatbotVisible] = useState(false);

    const toggleVisibility = () => {
      setIsChatbotVisible((prevState) => !prevState);
    };

return (
  <div className="chatbot-wrapper">
    {isChatbotVisible && <ChatBotDialog />}
    <button onClick={toggleVisibility} className="button">
      ?
    </button>
  </div>
);
}

export default СhatBotButton;