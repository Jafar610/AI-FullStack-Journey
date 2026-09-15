import ChatSharedLayout from "./Components/ChatSharedLayout/ChatSharedLayout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { Routes, Route, Navigate } from "react-router-dom";
function App() {
  const token = localStorage.getItem("token");

  const isAuthenticated = token && token !== "undefined" && token !== "null";

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <ChatSharedLayout /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!isAuthenticated ? <Registration /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
