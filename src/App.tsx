import "./App.css";
import { Dashboard, ViewMatchPage } from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PATH } from "./consts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
            path={PATH.INTERFACE}
            element={<Navigate to={PATH.DASHBOARD} />}
          />
        <Route path={PATH.DASHBOARD} element={<Dashboard />} />
        <Route path={PATH.VIEWMATCH} element={<ViewMatchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
