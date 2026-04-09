import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Portfolio from "./components/portfolio";
import ProjectDetail from "./components/ProjectDetail";
import ScrollToHash from "./components/ScrollToHash";

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="app-root d-flex flex-column flex-grow-1 min-vh-100" style={{ minHeight: "100dvh" }}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
