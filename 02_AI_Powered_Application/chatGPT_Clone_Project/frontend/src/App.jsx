import ChatSharedLayout from "./Components/ChatSharedLayout/ChatSharedLayout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { Routes, Route, Navigate } from "react-router-dom";
function App() {
  const token = localStorage.getItem("token");

  return (
      <Routes>
        {
          !token ? (
            <>
             <Route path="/login" element = {<Login/>} />
             <Route path="/register" element = {<Registration/>} />
             <Route path="*" element = {<Login/>} />
            </>
          ):(
            <>
            <Route path="/chat/conversation" element ={<ChatSharedLayout/>} />
            <Route path="*" element = {<Navigate to="/" />} />
            </>
          )
        }
      </Routes>
  );
}

export default App;
