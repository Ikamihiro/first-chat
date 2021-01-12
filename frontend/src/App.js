import React, { useEffect, useState } from "react";
import "./App.css";
import { connect, sendMsg } from "./api";
import Header from './components/Header/Header';
import ChatHistory from './components/ChatHistory';
import CharInput from './components/ChatInput';

function App() {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    connect((msg) => {
      console.log(msg);
      setChatHistory((prevState) => ([...prevState, msg]));
      console.log(chatHistory);
    });
  });

  const send = (event) => {
    if (event.keyCode === 13) {
      sendMsg(event.target.value);
      event.target.value = "";
    }
  };

  return (
    <div className="App">
      <Header />
      <ChatHistory chatHistory={chatHistory}></ChatHistory>
      <CharInput send={send}></CharInput>
    </div>
  );
}

export default App;
