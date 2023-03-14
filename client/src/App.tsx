import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import useAuthContext from "./hooks/useAuthContext";
import PasswordReset from "./pages/PasswordReset";

function App() {
  const { loading, authorized } = useAuthContext({});
  if (loading) return <Loader />;

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={authorized ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!authorized ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/signup"
          element={!authorized ? <Signup /> : <Navigate to="/" replace />}
        />
        <Route
          path="/reset"
          element={!authorized ? <PasswordReset /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
