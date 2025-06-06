import Offer_collectionBanner from "../assets/Offer_collectionBanner.avif"

const Offers = ()=>{
  
    return (
        <div className=" pt-28 px-4 flex justify-center mb-40">
          <div className="relative">
            <img src={Offer_collectionBanner} alt="offerImage" className="w-270 object-cover object-center" />
            <div className="absolute bottom-[60px] left-[30px]">
            <h1 className="text-3xl text-white font-stretch-50% ">Restaurants With Great Offers! <br/> Near Me.</h1>
            </div>
          </div>

        </div>
    )
}

export default Offers;