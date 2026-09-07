import ChatInput from "./Components/ChatInput/ChatInput.jsx";
import MessageList from "./Components/MessageList/MessageList.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import { useState } from "react";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
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
