import logo from "../assets/circle_check.png";
import { useNavigate } from "react-router-dom";
const Ordersucess = () => {

    const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={logo} alt="Order Success" className="w-24 h-24 mb-4" />
        <p className="text-2xl text-orange-400 mb-6">
          Thank you for your order. Your food is on its way!
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded transition duration-300"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Ordersucess;
