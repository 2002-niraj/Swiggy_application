
import foodLogo from '../assets/newswiggy_logo.jpeg';
export default function FooterSection() {
  return (
    <div className="w-full p-2  bg-[rgb(240,240,245)] flex flex-col items-center gap-10">
      
      
      <div className="w-11/12 p-4 flex flex-wrap gap-10 justify-center items-center">
        <h1 className="text-2xl font-bold text-center">
          For better experience, download the Swiggy app now
        </h1>

        <a href="#">
          <img
            className="w-[180px]"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png"
            alt="Download Android App"
          />
        </a>

        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            className="w-[180px]"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png"
            alt="Download iOS App"
          />
        </a>
      </div>

      <div className="w-5/6 pt-2 flex flex-wrap justify-evenly items-start gap-8">
        

        <div className='flex flex-col gap-2 items-center'>
             <div>
                <img src={foodLogo} className=" rounded-xl" style={{ height: '60px' }} alt="" />
             </div>
             <div className=' text-gray-600 text-sm'>© 2025 Swiggy Limited</div>
        </div>

        <div className="flex flex-col gap-2">
          <ul>
            <li className="font-bold mb-3">About Us</li>
            <li className="cursor-pointer text-gray-600 mb-3">Swiggy Corporate</li>
            <li className="cursor-pointer text-gray-600 mb-3">Careers</li>
            <li className="cursor-pointer text-gray-600 mb-3">Team</li>
            <li className="cursor-pointer text-gray-600 mb-3">Swiggy One</li>
            <li className="cursor-pointer text-gray-600 mb-3">Swiggy Instamart</li>
          </ul>
        </div>


        <div className="flex flex-col gap-2">
          <ul>
            <li className="font-bold mb-3">Contact us</li>
            <li className="cursor-pointer text-gray-600 mb-3">Help & Support</li>
            <li className="cursor-pointer text-gray-600 mb-3">Partner with us</li>
            <li className="cursor-pointer text-gray-600 mb-3">Ride with us</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <ul>
            <li className="font-bold mb-3">Available in</li>
            <li className="cursor-pointer text-gray-600 mb-3">Bangalore</li>
            <li className="cursor-pointer text-gray-600 mb-3">Gurgaon</li>
            <li className="cursor-pointer text-gray-600 mb-3">Hyderabad</li>
            <li className="cursor-pointer text-gray-600 mb-3">Pune</li>
            <li className="cursor-pointer text-gray-600 mb-3">Mumbai</li>
          </ul>
        </div>

          <div className="flex flex-col gap-2">
          <ul>
            <li className="font-bold mb-3 ">Life at Swiggy</li>
            <li className="cursor-pointer text-gray-600 mb-3">Explore with Swiggy</li>
            <li className="cursor-pointer text-gray-600 mb-3">Swiggy News</li>
            <li className="cursor-pointer text-gray-600 mb-3">Snackables</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
