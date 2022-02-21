
import { getAllandCate } from '../../api/products';

let currentPage  = 1;
/* eslint-disable prefer-const */
// eslint-disable-next-line prefer-const
let perPage = 4;
let start = 0
let end = perPage;

const {data}  = await  getAllandCate();  
const numPage = Math.ceil(data.length / perPage);

const Products = {
  async  render() { 
  
    return /* html */ `
        <div class="heading my-4">
            <h2 class="text-black text-3xl font-extrabold mt-12 uppercase">Sản phẩm</h2>
        </div>
        <div class="text-right ">
          <button id="btn-prevv" class=""><ion-icon class="text-2xl border-2 border-black" name="arrow-round-back"></ion-icon></ion-icon></button>
          <button id="btn-nextt" class=""><ion-icon class="text-2xl border-2 border-black" name="arrow-round-forward"></button>
        </div>
        <article class="postProducts grid grid-cols-4 gap-10 text-justify">
        ${data
          .map(
            (post,index) => index > start && index <= end ? `
            <div class="box p-4 border border-gray-300 ">
                <div class="box-img">
                    <a href="/product-detail/${post.id}"><img src="${post.image}" alt="" class="h-64 w-64"></a>
                </div>
            <div>
                <p class="text-slate-600 font-serif text-sm ">${post.category.name}</p>
            </div>
                <div class="box-title py-2">
                    <h2"><a href="/product-detail/${post.id}"  
                    class="text-black font-semibold text-xl ">${post.name}</a></h2>
                </div>
                <div class="box-text py-2">
                    <p class="text-sm font-sans">${post.price}</p>
                </div>
            </div>
            
        `:''
          )
          .join("")}
        </article>
`
  },
  afterRender(){

    function renderProduct(){
      document.querySelector(".postProducts").innerHTML = `
      ${data
        .map(
          (post,index) => index > start && index <= end ? `
          <div class="box p-4 border border-gray-300 ">
              <div class="box-img">
                  <a href="/product-detail/${post.id}"><img src="${post.image}" alt="" class="h-72 w-72"></a>
              </div>
              <div>
                <p class="text-slate-600 font-serif text-sm ">${post.category.name}</p>
               </div>
              <div class="box-title py-2">
                  <h2 class=""><a href="/product-detail/${post.id}"  
                  class="text-black font-semibold text-xl ">${post.name}</a></h2>
              </div>
              <div class="box-text py-2">
                  <p class="text-sm">${post.price} đ</p>
              </div>
          </div>
          
      `:''
        )
        .join("")}
      `
    }

    // eslint-disable-next-line no-shadow
    function getStartEnd(currentPage){
      start = (currentPage - 1) * perPage;
      end = currentPage * perPage;
    }
    document.querySelector("#btn-nextt").addEventListener('click' ,async ()=>{
      // eslint-disable-next-line no-plusplus
      currentPage++;
      if(currentPage > numPage){
        currentPage = numPage;
      }
      getStartEnd(currentPage);
      renderProduct();

    
      
  })
  document.querySelector("#btn-prevv").addEventListener('click' ,async ()=>{
    // eslint-disable-next-line no-plusplus
    currentPage--;
    if(currentPage <= 1){
      currentPage = 1;
    }
    getStartEnd(currentPage);

    renderProduct()
})
  }
};
export default Products;
