import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AuthProvider from "./components/AuthProvider/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
    </AuthProvider>
  );
}

export default App;
