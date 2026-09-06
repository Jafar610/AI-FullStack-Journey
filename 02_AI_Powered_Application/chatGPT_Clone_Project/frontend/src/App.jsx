import ChatHeader from "./Components/ChatHeader/ChatHeader";
import MessageList from "./Components/MessageList/MessageList";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ChatInput from "./Components/ChatInput/ChatInput";
function App() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const lastMessageRef = useRef(null);
  async function fetchConversations() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/chat/conversations",
      );

      setConversations(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleSubmit(question) {
    if (!question.trim()) {
      return;
    }

    const tempQuestion = {
      id: Date.now(),
      content: question.trim(),
      role: "user",
    };
    setConversations((prev) => [...prev, tempQuestion]);
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "http://localhost:3000/api/chat/conversations",
        {
          question: question.trim(),
        },
      );

      setConversations((prev) => [...prev, data?.data?.assistantConversation]);
    } catch (error) {
       console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(()=>{
    lastMessageRef.current?.scrollIntoView({behavior:'smooth'});

  },[conversations, lastMessageRef.current])

  return (
    <div className="app">
      <Sidebar />
      <main className="chat">
        <ChatHeader />
        <MessageList 
         conversations={conversations}
         isLoading={isLoading}
         lastMessageRef={lastMessageRef}
         />
        <ChatInput handleSubmit={handleSubmit} />
      </main>
    </div>
  );
}

export default App;
