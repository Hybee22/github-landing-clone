import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Home } from "./components";
import "./index.css";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  return (
    <div className="font-face">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {["/"].map((path, index) => (
            <Route
              exact
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
