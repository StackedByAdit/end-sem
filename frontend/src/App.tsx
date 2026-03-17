import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Signin } from "./components/pages/Signin";
import { Signup } from "./components/pages/Signup";
import { Home } from "./components/pages/Home";
import { CreateBlog } from "./components/pages/CreateBlog";
import { GetBlog } from "./components/pages/GetBlog";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/blogs" replace />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs" element={<Home />} />
        <Route path="/blogs/create" element={<CreateBlog />} />
        <Route path="/blogs/:id" element={<GetBlog />} />
        <Route path="*" element={<div className="p-6">Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
