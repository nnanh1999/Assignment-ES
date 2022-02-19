import instance from "./config";

export const getAll = () =>{
    const url = '/posts';
    return instance.get(url);
}
export const get = (id) =>{
    const url = `/posts/${id}`;
    return instance.get(url);
}
export const add = (data) =>{
    const url = `/posts`;
    return instance.post(url, data);
}
export const remove = (id) =>{
    const url = `/posts/${id}`;
    return instance.delete(url);
}
export const update = (post) => {
    const url = `/posts/${post.id}`;
    return instance.put(url,post);
}
export const filterKeyword = (keyword) => {
    const url = `/posts?q=${keyword}`;
    return instance.get(url);
}