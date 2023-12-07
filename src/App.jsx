import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Forgot from "./pages/auth/forgot/Forgot";
import Home from "./pages/home/Home";
import NoPage from "./pages/nopage/NoPage";
import Comment from "./pages/comment/Comment";
import Supplier from "./pages/supplier/supplier";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/comment" index element={<Comment />} />
        <Route path="/supplier" index element={<Supplier />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
