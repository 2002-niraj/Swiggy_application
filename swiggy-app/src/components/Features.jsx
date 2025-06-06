const Features = ()=>{


    return (
        <div className="mx-24 mt-2 mb-2 flex items-center gap-4">
            <div className=" text-sm text-black/75 font-semibold" >
                <button className="cursor-pointer px-3 py-2 rounded-4xl border border-[rgba(2,6,12,0.15)]">Sort By</button>
            </div>
            <div className="text-sm text-black/75 font-semibold">
               <button className="cursor-pointer px-3 py-2 rounded-4xl border border-[rgba(2,6,12,0.15)]" > Fast Delivery</button>
            </div>
            <div className="text-sm text-black/75 font-semibold" >
               <button className="cursor-pointer px-3 py-2 rounded-4xl border border-[rgba(2,6,12,0.15)]" > Ratings 4.0+</button>
            </div>
            <div className=" text-sm text-black/75 font-semibold" >
                <button className="cursor-pointer px-3 py-2 rounded-4xl border border-[rgba(2,6,12,0.15)]" >Pure Veg</button>
            </div>
              <div className="text-sm text-black/75 font-semibold" >
               <button className="cursor-pointer px-3 py-2 rounded-4xl border border-[rgba(2,6,12,0.15)]" > Offers</button>
            </div>

              <div className=" text-sm text-black/75 font-semibold" >
               <button className="cursor-pointer px-3 py-2 rounded-4xl border border-[rgba(2,6,12,0.15)]"> Food in 10 mins</button>
            </div>

              <div className="text-sm text-black/75 font-semibold" >
               <button className="cursor-pointer px-3 py-2 rounded-4xl border border-[rgba(2,6,12,0.15)]" > Rs.300-Rs.600</button>
            </div>
              <div className=" text-sm text-black/75 font-semibold" >
               <button className="cursor-pointer px-3 py-2 rounded-4xl border border-[rgba(2,6,12,0.15)]"> Less than Rs.300</button>
            </div>
        </div>
    )
}

export default Features;