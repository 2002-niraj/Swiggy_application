const BASE = "https://www.swiggy.com/dapi";

export const SwiggyAPI ={
   restaurantList: (latitude,longitude)=> `${BASE}/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
   restaurantMenu: (latitude,longitude,restaurantId)=> `${BASE}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${latitude}&lng=${longitude}&restaurantId=${restaurantId}`
}