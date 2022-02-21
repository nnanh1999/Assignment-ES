import instance from "./config";

export const getAll = () =>{
    const url = '/carts';
    return instance.get(url);
}
export const get = (id) =>{
    const url = `/carts/${id}`;
    return instance.get(url);
}
export const add = (data) =>{
    const url = `/carts`;
    return instance.post(url, data);
}
export const addHdcts = (data) =>{
    const url = `/carts`;
    return instance.post(url, data);
}
export const remove = (id) =>{
    const url = `/carts/${id}`;
    return instance.delete(url);
}
export const update = (cart) => {
    const url = `/carts/${cart.id}`;
    return instance.put(url,cart);
}
export const filterKeyword = (keyword) => {
    const url = `/carts?q=${keyword}`;
    return instance.get(url);
}