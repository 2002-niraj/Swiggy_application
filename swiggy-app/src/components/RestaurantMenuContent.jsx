import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Itemlist from "./Itemlist";
import Restaurantinfo from "./Restaurantinfo";
import { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";

export default function RestaurantMenuContent({ restaurantId }) {
  
  const { loading, restaurantInfo, menuItems } = useSelector(
    (state) => state.menu
  );

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // close if clicked again
    } else {
      setOpenIndex(index); // open the one clicked
    }
  };

  if (!restaurantInfo) return null;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="pt-20 px-4 overflow-x-hidden mb-10">
          <h1 className="text-3xl text-black font-bold mt-6 mb-6 mx-64">
            {restaurantInfo?.name}
          </h1>

          <Restaurantinfo restaurantInfo={restaurantInfo} />

          <div className="w-[820px] mt-10 mx-auto  border-t-16 mb-6 border-gray-300">
            {menuItems?.map((item, index) => (
              <Accordion
                key={index}
                expanded={openIndex === index}
                onChange={() => handleToggle(index)}
                className="border-b-16 mb-6 mt-4 border-gray-300"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  id={`panel-${index}`}
                  aria-controls={`panel-content-${index}`}
                >
                  <h2 className="text-black mt-8 text-xl font-semibold">
                    {item.title} ({item.items.length})
                  </h2>
                </AccordionSummary>
                <AccordionDetails>
                  <Itemlist
                    restaurantId={restaurantId}
                    key={index}
                    items={item.items}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
