import { Routes, Route, Navigate } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import SubmittedUser from "./pages/SubmittedUser";

export default function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Navigate to="/create" replace />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/submitted" element={<SubmittedUser />} />
      </Routes>
    </>
  );
}

