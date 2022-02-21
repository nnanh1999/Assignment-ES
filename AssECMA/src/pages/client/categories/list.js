import { getAll } from "../../../../api/categories"


const Categories = {
    async render(){
        const {data} = await getAll();
        return /* html */ `   
            <article class="post grid grid-rows gap-2 text-justify mt-5">
            <div>
                <h2 class="text-2xl">Danh Mục</h2>
            </div>
            ${data
              .map(
                (post) => `
                <div class="border border-gray-300 text-center">
                    <div class="box-title py-2 ">
                        <h2 class="text-orange-600 font-bold text-lg">
                        <button data-id="${post.id}" class="btn w-52">${post.name}</button></h2>
                    </div>

                </div>
            `
              )
              .join("")}
            <div id="target"></div>
            </article>
          
        `
    },
};
export default Categories;