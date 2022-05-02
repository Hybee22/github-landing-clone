import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Home } from "./components";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="font-face">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {["/"].map((path, index) => (
            <Route
              path={path}
              key={index}
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
