import {
  createBrowserRouter,
  createRoutesFromChildren,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./Context/Theme";
import LoginPage from "./Component/LoginPage";

function App() {
  const MyRouter = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route path="/" element={<LoginPage />} />
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
