import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/LayoutComponents/Layout";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import { UserContextProvider } from "./store/UserContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
