import React from "react";
import Message from "../Message/Message";
import "./ChatHistory.css";

function ChatHistory(props) {
    return (
        <div className="ChatHistory">
            <h2>Chat History</h2>
            {props.chatHistory.map((msg, index) => (
                <Message key={index} message={msg.data} />
            ))}
        </div>
    );
}

export default ChatHistory;