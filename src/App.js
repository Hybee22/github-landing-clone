import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Home } from "./components";
import "./index.css";
import { useSelector } from "react-redux";

function App() {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="font-face">
      <Router>
        <Routes>
          {auth.user ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/login" element={<Login />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
