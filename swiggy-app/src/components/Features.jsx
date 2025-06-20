import Button from "./Button";
const Features = ()=>{

      const filters = [
    "Sort By",
    "Fast Delivery",
    "Ratings 4.0+",
    "Pure Veg",
    "Offers",
    "Food in 10 mins",
    "Rs.300-Rs.600",
    "Less than Rs.300",
  ];

    return (
        <div className="mx-24 mt-2 mb-2 flex items-center gap-4 flex-wrap">
            {
                filters.map((filter, index) => (
                    <div key={index} className="text-sm text-black/75 font-semibold">
                        <Button
                            text={filter}
                            bgColor="bg-white"
                            textColor="text-black"
                            padding="px-3 py-2"
                            rounded="rounded-4xl"
                            uppercase="uppercase"
                            font="font-semibold"
                            className="border border-[rgba(2,6,12,0.15)] hover:bg-gray-100 transition duration-200"
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default Features;