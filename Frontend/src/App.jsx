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
