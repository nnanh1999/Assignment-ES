import instance from "./config";

export const getAll = () =>{
    const url = '/products';
    return instance.get(url);
}
export const getAllandCate = () =>{
    const url = '/products?_expand=category';
    return instance.get(url);
}
export const getByCategory = (id) =>{
    const url = `/categories/${id}?_embed=products`;
    return instance.get(url);
}
export const get = (id) =>{
    const url = `/products/${id}`;
    return instance.get(url);
}
export const add = (data) =>{
    const url = `/products`;
    return instance.post(url, data);
}
export const remove = (id) =>{
    const url = `/products/${id}`;
    return instance.delete(url);
}
export const update = (product) => {
    const url = `/products/${product.id}`;
    return instance.put(url,product);
}
export const filterKeyword = (keyword) => {
    const url = `/products?q=${keyword}`;
    return instance.get(url);
}
// http://localhost:3001/products?q=