import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Library } from "../index";
import ThemeBtn from "../MainPages/ThemeBtn";

export default function Header() {
  return (
    <header className="shadow sticky z-50 top-0">
      <nav
        className="bg-black-700 border-gray-200 px-4 lg:px-6 py-2"
        style={{ background: "black" }}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img src={Library} className="mr-2 w-25 h-20" alt="Library" />
          </Link>
          <div className="flex items-center lg:order-2">
            <ThemeBtn />
            <Link
              to="/userLogin"
              className="text-white hover:bg-gray-50 hover:text-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Log in
            </Link>
            <Link
              to="/LibraryLoginPage"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Become Library
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
