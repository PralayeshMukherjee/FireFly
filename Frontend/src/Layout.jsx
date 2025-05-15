import { Outlet } from "react-router-dom";
import MainFooter from "./Component/Landing/Footer";
import Header from "./Component/Landing/Header";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <MainFooter />
    </>
  );
}
export default Layout;
