import foodLogo from "../assets/swiggy_logo.png";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { IoMdHelpBuoy, IoMdClose } from "react-icons/io";
import { IoRestaurantSharp } from "react-icons/io5";
import { NavLink, Link } from "react-router-dom";
import { useState, useEffect,useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import LoginSignup from "./LoginSignup";
import { logout } from "../features/login/loginSlice";

export default function Header() {
  const [showAuth, setShowAuth] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const cartItems = useSelector((store) => store.cart.items);
  const address = useSelector((state)=>state?.location?.address);

    const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropDown(false); // 👈 close the dropdown
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close auth modal after login
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => setShowAuth(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-orange-500 font-bold" : "";

  const toggleAuth = () => {
    if (user) {
      setShowDropDown((prev) => !prev);
      setShowAuth(false);
    } else {
      setShowDropDown(false);
      setShowAuth((prev) => !prev);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowDropDown(false);
    setShowAuth(true);
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50 flex h-20 justify-evenly items-center bg-white font-bold text-black p-4 shadow-md mb-8">
        {/* Logo */}
        <div>
          <Link to="/">
            <img
              src={foodLogo}
              alt="Swiggy Logo"
              className="rounded-full cursor-pointer transition-all duration-300 hover:scale-95"
              style={{ height: "60px" }}
            />
          </Link>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2">
          {address ? (
            <>
              <h3 className="font-bold border-b-2 cursor-pointer border-black hover:text-orange-500">
                {address.split(",")[1]}
              </h3>
              <h2 className="text-sm text-gray-700">
                {address.split(",").slice(0, 3).join(",")}
              </h2>
            </>
          ) : (
            <>
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-2 hover:text-orange-500">
          <IoRestaurantSharp />
          <h2 className="cursor-pointer">
            <NavLink to="/map" className={navLinkClass}>
              Nearby Restaurants
            </NavLink>
          </h2>
        </div>

        <div className="flex items-center gap-2 hover:text-orange-500">
          <FaSearch />
          <h2 className="cursor-pointer">
            <NavLink to="/search" className={navLinkClass}>
              Search
            </NavLink>
          </h2>
        </div>

        <div className="flex items-center gap-2 hover:text-orange-500">
          <BiSolidOffer />
          <h2 className="cursor-pointer">
            <NavLink to="/Offers" className={navLinkClass}>
              Offers
            </NavLink>
          </h2>
        </div>

        <div className="flex items-center gap-2 hover:text-orange-500">
          <IoMdHelpBuoy />
          <h2 className="cursor-pointer">
            <NavLink to="/help" className={navLinkClass}>
              Help
            </NavLink>
          </h2>
        </div>

        {/* User Profile/Login */}
        <div className="relative">
          <div
            onClick={toggleAuth}
            className="flex items-center gap-2 hover:text-orange-500"
          >
            <FaUser />
            <h2 className="cursor-pointer">
              <NavLink to="" className={navLinkClass}>
                {user
                  ? user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)
                  : "Sign In"}
              </NavLink>
            </h2>
          </div>

          {showDropDown && (
            <div ref={dropdownRef} className="absolute bg-white shadow-lg rounded-md right-[-30px] mt-2 w-40 z-10">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Cart */}
        <div className="flex items-center gap-2 hover:text-orange-500">
          <FaShoppingCart />
          <h2 className="cursor-pointer flex items-center">
            <NavLink to="/cart" className={navLinkClass}>
              Cart{" "}
              <span
                className={`cursor-pointer rounded border-1 px-2 py-[1px] ${
                  cartItems.length
                    ? "bg-green-600 text-white text-xl"
                    : "bg-white text-black"
                }`}
              >
                {cartItems.length}
              </span>
            </NavLink>
          </h2>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-[999] transition-transform transform animate-slideIn">
          <button
            className="absolute cursor-pointer top-4 right-4 text-2xl text-gray-500 hover:text-red-600"
            onClick={toggleAuth}
          >
            <IoMdClose />
          </button>

          <LoginSignup />
        </div>
      )}
    </div>
  );
}
