import React from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeBtn from "../ThemeBtn";
import fireflyLogo from "../../assets/fireflyLogo.png";

export default function Header() {
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-violet-600  dark:bg-gray-800 border-gray-200 px-4 lg:px-6 py-2">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex dark:bg-transparent rounded-xl items-center">
            <img
              src={fireflyLogo}
              className="mr-2 w-25 h-20 rounded-full"
              alt="Library"
            />
          </Link>
          <div className="flex i gap-5 tems-center lg:order-2">
            <ThemeBtn />
            <Link
              to="/Login"
              className="text-white hover:bg-gray-600 border hover:text-white focus:ring-4 focus:ring-gray-300 font-mono font-bold rounded-lg text-md px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Login
            </Link>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to={"/home"}
                  className={`text-white hover:text-orange-400`}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/about"}
                  className={`text-white hover:text-orange-400`}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/contact"}
                  className={`text-white hover:text-orange-400`}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
