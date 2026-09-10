import axios from "axios";
import ChatInput from "./Components/ChatInput/ChatInput.jsx";
import MessageList from "./Components/MessageList/MessageList.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import { useState, useEffect } from "react";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const fetchChat = async ()=>{
      try {
        const result = await axios.get('http://localhost:3000/api/chat/conversations')

      const data = result.data;
      if(data.success){
        console.log(data.data)
      }
      } catch (error) {
        throw error;
      }
  }

  useEffect(()=>{
    fetchChat();
  },[]);
  return (
    <>
      <div className="flex h-screen bg-gray-800 text-white">
        <Sidebar isOpen = {isSidebarOpen}
         toggleSidebar={()=>setIsSidebarOpen(!isSidebarOpen)}
         />

         <div className="flex flex-col flex-1">
            <MessageList message={messages}/>
            <ChatInput setMessages={setMessages} messages={messages}/>
         </div>
      </div>
    </>
  );
}

export default App;
