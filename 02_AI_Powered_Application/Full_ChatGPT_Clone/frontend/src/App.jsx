import MessageList from "./Components/MessageList/MessageList.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import { useState } from "react";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [message, setMessage] = useState([]);
  return (

    <>
      <div className="flex h-screen bg-gray-800 text-white">
        <Sidebar isOpen = {isSidebarOpen}
         toggleSidebar={()=>setIsSidebarOpen(!isSidebarOpen)}
         />

         <div>
            <MessageList message={message}/>
         </div>
      </div>
    </>
  );
}

export default App;
