const getRestoById = (restoList , id)=>{
return restoList.find(resto => resto.id === id);
}

export default getRestoById;