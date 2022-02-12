import { get } from "../../../api/posts";
import Header from "../../components/header";

const DetailNewsPage = {
  async render(id) {
    const {data} = await get(id);
    return /* html */ `
    <div class="container max-w-5xl mx-auto max-h-full">  
        ${ Header.render()} 
        <div class="news_title pt-5">
            <h1 class="text-2xl text-bold font-semibold italic md:not-italic text-black"> ${data.title} </h1>
        </div>
        <div class="news_date pt-5">
            <li class="text-xs text-gray-400">${data.createdAt}</li>
        </div>
        <div class="post grid grid-cols-3 gap-2 text-justify pt-5">
            <div  class="col-span-2">
                <div class="news_img">
                    <img class="" src="${data.img}" />
                </div>
            </div>
            <div class="col-span-1">
                <div  class="text-xs tahoma text-black"> ${data.desc} </div>
            </div>
        </div>
        <footer class="bg-purple-900 h-12 flex items-center justify-center mt-4">
            <span class="text-white font-xs">Nguyễn Nhật Anh</span>
        </footer>
    </div>
    
    `;
  },
  afterRender(){
    Header.afterRender();
  }
};
export default DetailNewsPage;
