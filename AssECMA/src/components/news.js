
import { getAll } from '../../api/posts';

let currentPage  = 1;
/* eslint-disable prefer-const */
// eslint-disable-next-line prefer-const
let perPage = 4;
let start = 0
let end = perPage;

const {data}  = await  getAll();  
const numPage = Math.ceil(data.length / perPage);

const News = {
  async  render() { 
      
    return /* html */ `
        <div class="heading my-4">
            <h2 class="text-black text-3xl font-extrabold mt-12 uppercase">Tin tức</h2>
        </div>
        <div class="text-right ">
          <button id="btn-prev" class=""><ion-icon class="text-2xl border-2 border-black" name="arrow-round-back"></ion-icon></ion-icon></button>
          <button id="btn-next" class=""><ion-icon class="text-2xl border-2 border-black" name="arrow-round-forward"></button>
        </div>
        <article class="post grid grid-cols-4 gap-10 text-justify">
        ${data
          .map(
            (post,index) => index > start && index <= end ? `
            <div class="box p-4 border border-gray-300 ">
              
                <div class="box-img">
                    <a href="/news/${post.id}"><img src="${post.img}" alt="" class="h-48 w-72"></a>
                </div>
                <div class="news_date pt-5">
                  <li class="text-xs text-gray-400">${post.createdAt}</li>
              </div>
                <div class="box-title py-2">
                    <h2"><a href="/news/${post.id}"  
                    class="text-black font-semibold text-xl ">${post.title}</a></h2>
                </div>
                
            </div>
            
        `:''
          )
          .join("")}
        </article>
`
  },
  afterRender(){


    // eslint-disable-next-line no-shadow
    function getStartEnd(currentPage){
      start = (currentPage - 1) * perPage;
      end = currentPage * perPage;
    }
    function renderPage(){
      document.querySelector(".post").innerHTML = `
      ${data
        .map(
          (post,index) => index > start && index <= end ? `
          <div class="box p-4 border border-gray-300 ">
              <div class="box-img">
                  <a href="/news/${post.id}"><img src="${post.img}" alt="" class="h-48 w-72"></a>
              </div>
              <div class="news_date pt-5">
                  <li class="text-xs text-gray-400">${post.createdAt}</li>
              </div>
              <div class="box-title py-2">
                  <h2 class=" "><a href="/news/${post.id}"  
                  class="text-black font-semibold text-xl  ">${post.title}</a></h2>
              </div>
              
          </div>
          
      `:''
        )
        .join("")}
      `
    }

    document.querySelector("#btn-next").addEventListener('click' ,async ()=>{
      // eslint-disable-next-line no-plusplus
      currentPage++;
      if(currentPage > numPage){
        currentPage = numPage;
      }
      getStartEnd(currentPage);
      renderPage()
      
  })
  document.querySelector("#btn-prev").addEventListener('click' ,async ()=>{
    // eslint-disable-next-line no-plusplus
    currentPage--;
    if(currentPage <= 1){
      currentPage = 1;
    }
    getStartEnd(currentPage);
    renderPage()
})
  }
};
export default News;
