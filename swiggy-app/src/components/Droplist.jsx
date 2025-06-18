import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/login/loginSlice";
import { clearCart } from "../features/cart/cartSlice";
import { persistor } from "../app/Store";
import fetchOrderHistory from "../features/orderHistory/orderHistoryThunk";
import { useNavigate } from "react-router-dom";
const Droplist = ({ setShowDropDown, setShowAuth }) => {
  const dispatch = useDispatch();
   const navigate = useNavigate();

  const user = useSelector((state) => state.login.user);

  const {id} = user || null

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    persistor.purge();
    setShowDropDown(false);
    setShowAuth(true);
  };

  const handleOrdersHistory = ()=>{
         dispatch(fetchOrderHistory(id))
         setTimeout(() => {
           navigate("/order-history");
         }, 1000);
  }

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
        <li 
        onClick={handleOrdersHistory}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Your Orders
        </li>
      </ul>
    </div>
  );
};

export default Droplist;
