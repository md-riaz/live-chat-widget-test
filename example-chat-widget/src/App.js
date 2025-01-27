import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import './App.css';
import { useChat } from "./ChatProvider";
import { WidgetContainer } from "./WidgetContainer";

function App() {

  const [license, setLicense] = useState("");
  const [greeting, setGreeting] = useState();

  const { sendMessage } = useChat();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString); // doesn't work in IE, but who cares ;)
    const license = urlParams.get("license");
    setLicense(license);
  }, []);

  useEffect(() => {

    const handleMessage = evt => {
      if ("greeting" in evt.data) {
        setGreeting(evt.data.greeting);
      } else if ("sendMessage" in evt.data) {
        sendMessage({
          _id: nanoid(),
          message: evt.data.sendMessage,
          sender: "remote",
          direction: "outgoing",
        });
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);

  }, [sendMessage, setGreeting]);

  return (
    <WidgetContainer license={license} greeting={greeting} />
  );
}

export default App;