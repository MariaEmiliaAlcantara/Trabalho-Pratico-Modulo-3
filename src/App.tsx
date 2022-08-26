import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/despesas" element={<Home />} />
        <Route path="*" element={<Navigate to="/despesas" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
