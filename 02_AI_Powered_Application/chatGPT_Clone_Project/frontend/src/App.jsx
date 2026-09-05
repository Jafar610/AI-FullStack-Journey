import ChatHeader from "./Components/ChatHeader/ChatHeader"
import Sidebar from "./Components/Sidebar/Sidebar"

function App() {
  return (
    <div className="app">
      <Sidebar/>
      <main className="chat">
        <ChatHeader/>
      </main>
    </div>
  )
}

export default App