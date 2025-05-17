import {
  createBrowserRouter,
  createRoutesFromChildren,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./Context/Theme";
import LoginPage from "./Component/LoginPage";
import Layout from "./Layout";
import Home from "./Component/Landing/Home";
import SignUp from "./Component/SignUp";
import OTPVerification from "./Component/OTPVerification";
import Chatbot from "./Component/Chatbot";

function App() {
  const MyRouter = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/OTPVerification" element={<OTPVerification />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </>
    )
  );
  return (
    <ThemeProvider>
      <RouterProvider router={MyRouter} />
    </ThemeProvider>
  );
}

export default App;
