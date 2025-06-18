import { FaSearch } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { Link} from 'react-router-dom';
import { cuisines } from "../constants/cuisines";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [filterList, setFilterList] = useState([]);
  const  restoList  =  useSelector((state)=>state.list.restaurantList);

  
  useEffect(() => {
    if (searchText.trim() !== "") {
      const filtered = restoList.filter((resto) => {
        const nameMatch = resto.name
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const cuisineMatch = resto.cuisines.some((cuisine) =>
          cuisine.toLowerCase().includes(searchText.toLowerCase())
        );
        return nameMatch || cuisineMatch;
      });

      setFilterList(filtered);
    }
  }, [searchText, restoList]);

  return (
    <div className="pt-24 px-4 h-screen">
      <div className="mx-auto w-full max-w-3xl p-2">
        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-3 shadow-sm w-full bg-white">
          <input
            type="text"
            placeholder="Search for restaurants and food"
            className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText ? (
            <FaTimes
              className="cursor-pointer text-black"
              onClick={() => setSearchText("")}
              title="Clear"
            />
          ) : (
            <FaSearch className="text-black" />
          )}
        </div>

        {!searchText && (
          <div>
            <h2 className="mt-8 text-xl font-extrabold">Popular Cuisines</h2>
            <div className="mt-2 flex gap-3 flex-wrap">
              {cuisines.map((item) => (
                <button key={item.id} onClick={() => setSearchText(item.name)}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-24 cursor-pointer rounded-md hover:scale-105 transition"
                    title={item.name}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

 {searchText && (

    <div>
    {filterList.length === 0 ? (
      <p className="text-center text-gray-500 text-lg mt-6">No results found.</p>
    ) : (
      <div className="mt-6 flex flex-col">
        {filterList.map((resto) => (
          <Link key={resto.id} to={`/restaurant/${resto.id}`} >
          <div
        
            className="w-180 p-1 mb-4 h-20 cursor-pointer flex gap-4 hover:bg-gray-100"
          >
            {/* Image */}
            <div>
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resto.cloudinaryImageId}`}
                className="w-20 h-full object-cover rounded object-center"
                alt="restaurant"
              />
            </div>

            <div className="flex flex-col gap-1 justify-center">
              <h3 className="text-sm font-semibold">
                {resto.name?.split(" ").slice(0, 4).join(" ")}
                {resto.name?.split(" ").length > 4 && " ..."}
              </h3>
              <p className="text-sm font-extralight text-[rgba(2,6,12,0.6)] mb-1">
                {resto.cuisines?.slice(0, 3).join(", ")}
                {resto.cuisines?.length > 3 && " ..."}
              </p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    )}
  </div>

)}

      </div>
    </div>
  );
}
