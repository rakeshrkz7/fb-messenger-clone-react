import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  // useState = varaiable  in React
  // useEffect = runs code on a condition in REACT

  // data from db
  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // snapshot is a list of data
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            message: doc.data(),
          }))
        ); // gives data as object
      });
  }, []);

  //run code on condition
  useEffect(() => {
    //run code here..
    // if its blank inside [], this code runs ONCE when the app component loads(page loads)
    // if we have varaiable like input, then each changes in input leads to refresh of the app component
    setUsername(prompt("Please enter your name"));
  }, []); // condition/dependency

  const sendMessage = (event) => {
    // all the logic to send messages goes here
    event.preventDefault(); //prevents from refreshing

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setMessages([...messages, { username: username, message: input }]);
    setInput("");
  };
  // console.log(input);
  // console.log(messages);
  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
      <h1>Messenger</h1>
      <h2>Logged in as {username}</h2>
      <form className="app_form">
        <FormControl className="app_formControl">
          <Input
            className="app__input"
            placeholder="Type a message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          {/* input button */}
          <IconButton
            className="app_iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            {/* Send Message */}
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      {/* messages themselves */}

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
