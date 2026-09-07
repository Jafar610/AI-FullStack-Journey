import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import { useState } from "react";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (

    <>
      <div className="flex h-screen bg-gray-800 text-white">
        <Sidebar isOpen = {isSidebarOpen}
         toggleSidebar={()=>setIsSidebarOpen(!isSidebarOpen)}
         />
      </div>
    </>
  );
}

export default App;
