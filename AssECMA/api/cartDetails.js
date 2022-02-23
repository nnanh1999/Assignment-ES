import instance from "./config";

// eslint-disable-next-line import/prefer-default-export
export const addCartDetail = (data) =>{
    const url = `/carts-detail`;
    return instance.post(url, data);
}
export const get = (id) =>{
    const url = `/carts-detail/${id}?_expand=cart`;
    return instance.get(url);
}