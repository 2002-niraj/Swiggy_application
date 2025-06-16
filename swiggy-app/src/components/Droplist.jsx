import { useDispatch } from "react-redux";
import { logout } from "../features/login/loginSlice";
import { clearCart } from "../features/cart/cartSlice";
import { persistor } from "../app/Store";
const Droplist = ({ setShowDropDown, setShowAuth }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    persistor.purge();
    setShowDropDown(false);
    setShowAuth(true);
  };

  return (
    <div>
      <ul className="py-2">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
        <li
          onClick={handleLogout}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          Logout
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Your Orders
        </li>
      </ul>
    </div>
  );
};

export default Droplist;
