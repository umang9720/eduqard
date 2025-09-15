import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import ResponsiveAppBar from "./container/MenuBar";
import AllScreens from "./container/AllScreens";

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Navigate to="/all-apps" replace />} /> 
        <Route path="/all-apps" element={<AllScreens />} />
        <Route path="/popular" element={<AllScreens />} />
        <Route path="/trending" element={<AllScreens />} />
      </Routes>
    </Router>
  );
}

export default App;
