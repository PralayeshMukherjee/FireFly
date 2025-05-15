import {
  createBrowserRouter,
  createRoutesFromChildren,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./Context/Theme";

function App() {
  const MyRouter = createBrowserRouter(createRoutesFromChildren(<></>));
  return (
    <ThemeProvider>
      <RouterProvider router={MyRouter} />
    </ThemeProvider>
  );
}

export default App;
