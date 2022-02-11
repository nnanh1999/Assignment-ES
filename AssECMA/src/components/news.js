import { getAll } from '../../api/posts';

const News = {
  async  render() { 
    const {data}  = await getAll();
    return /* html */ `
        <div class="heading my-4">
            <h2 class="text-purple-900 text-2xl font-bold uppercase">Sản phẩm</h2>
        </div>
        <article class="post grid grid-cols-3 gap-10 text-justify">
        ${data
          .map(
            (post) => `
            <div class="box p-4 border border-gray-300 ">
                <div class="box-img">
                    <a href="/news/${post.id}"><img src="${post.img}" alt="" class="h-48 w-72"></a>
                </div>
                <div class="box-title py-2">
                    <h2 class="text-orange-600 font-bold text-lg"><a href="/news/${post.id}"  
                    class="text-orange-600 font-bold text-xl ">${post.title}</a></h2>
                </div>
                <div class="box-text py-2">
                    <p class="text-sm">${post.desc}</p>
                </div>
            </div>
        `
          )
          .join("")}
        </article>
`
  },
};
export default News;
