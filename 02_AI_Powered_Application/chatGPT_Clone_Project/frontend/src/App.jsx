import ChatHeader from "./Components/ChatHeader/ChatHeader"
import MessageList from "./Components/MessageList/MessageList"
import Sidebar from "./Components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import axios from 'axios'
function App() {
  const [conversations, setConversations] = useState([]);
  async function fetchConversations(){
    try {
      const response = await axios.get(
      'http://localhost:3000/api/chat/conversations'
    );
    console.log(response);
    setConversations(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  }


  useEffect(()=>{
     fetchConversations();
  },[])
 
  return (
    <div className="app">
      <Sidebar/>
      <main className="chat">
        <ChatHeader/>
        <MessageList conversations={conversations}/>
      </main>
    </div>
  )
}

export default App