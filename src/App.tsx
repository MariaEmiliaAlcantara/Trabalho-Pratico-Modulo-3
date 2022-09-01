import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/despesas/:date" element={<Home />} />
        <Route path="*" element={<Navigate to="/despesas/2020-06" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
