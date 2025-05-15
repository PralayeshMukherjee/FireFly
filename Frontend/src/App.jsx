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

function App() {
  const MyRouter = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/Login" element={<LoginPage />} />
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
