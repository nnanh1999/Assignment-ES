import { filterKeyword, getAll, getByCategory } from '../../../../api/products';
import Header from '../../../components/header';
import Categories from '../categories/list';
// eslint-disable-next-line prefer-const
let perPage = 6;
// eslint-disable-next-line prefer-const
let currentPage =1;
let start = 0;
let end = perPage;

const { data } = await getAll();
const numPage = Math.ceil(data.length / perPage);
const Products = {
  async render() {
    
    return /* html */ `
    <div class="container w-full mx-auto max-h-full">  
        <div id="header">
                ${Header.render()}
         </div>  
        <div class="container w-full mx-auto max-h-full px-24 relative">  
            
            <div class="flex flex-row">
            <input 
            type="text"
            class="
              
              form-control
              block
              mt-5
       
              text-center
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
            id="search"
            placeholder="Tìm kiếm"
          />
          
          <select id="sort"  class="absolute right-24 top-4 h-12 mt-1 text-sm text-pink-700 w-200 rounded-lg cursor-pointer outline-none ">
                <option class=" hidden">Lọc theo giá</option>
                <option >Tăng dần</option>
                <option>Giảm dần</option>
 
            </select>
          
            </div>
            <div>
            <p id="key"></p>
          </div>
            <div class="content flex justify-between gap-10" >
                <article class="">
                    ${await Categories.render()}
                </article>
                <article class=" products grid grid-cols-3 gap-10 text-justify mt-5 ">
                ${data
                  .map(
                    (post,index) => 
                      (index >= start && index< end) ?
                        `
                          <div class="p-4 border border-gray-300 ">
                              <div class="box-img">
                                  <a href="/#/product-detail/${post.id}"><img src="${post.image}" alt="" class="h-58 w-72"></a>
                              </div>
                              <div class="box-title py-2">
                                  <h2 class="text-orange-600 font-bold text-lg"><a href="/#/product-detail/${post.id}"  
                                  class="text-orange-600 font-bold text-xl ">${post.name}</a></h2>
                              </div>
                              <div class="box-text py-2">
                                  <p class="text-sm">${post.price}</p>
                              </div>
                          </div>
                      `:''   
                  )
                  .join('')}
                
                </article>
            </div>
            </div>
            <footer relative class=" bg-black h-12 flex items-center justify-center mt-16">
               <div class="relative left-28 bottom-12 ">
                  <span id="btn-prev" class="cursor-pointer mx-5"><ion-icon class="text-2xl border-2 border-black" name="arrow-round-back"></ion-icon></ion-icon></span>
                  <div class="inline" id="page-number">
                   
                  </div>
                  <span id="btn-next" class="cursor-pointer "><ion-icon class="text-2xl border-2 border-black" name="arrow-round-forward"></span>
                </div>
              <span class="text-white font-xs">Nguyễn Nhật Anh</span>
            </footer>
        </div>
    </div>
        `;
  },
  afterRender() {

    const btnNext = document.querySelector("#btn-next");
    const btnPrev = document.querySelector("#btn-prev");
    
    function renderProduct(){
      document.querySelector(".products").innerHTML = `
      ${data
        .map(
          (post,index) => 
            (index >= start && index< end) ?
              `
                <div class="p-4 border border-gray-300 ">
                    <div class="box-img">
                        <a href="/#/product-detail/${post.id}"><img src="${post.image}" alt="" class="h-58 w-72"></a>
                    </div>
                    <div class="box-title py-2">
                        <h2 class="text-orange-600 font-bold text-lg"><a href="/#/product-detail/${post.id}"  
                        class="text-orange-600 font-bold text-xl ">${post.name}</a></h2>
                    </div>
                    <div class="box-text py-2">
                        <p class="text-sm">${post.price}</p>
                    </div>
                </div>
            `:''   
        )
        .join('')}
      `
    }
    function renderListPage(){
      let content = '';
      content += `<li class="inline border-2 p-1 mx-1 border-black cursor-pointer text-xl"><a>${1}</a></li>`;
      for (let index = 2; index <= numPage; index++) {
        content += `<li class="inline border-2 p-1 mx-1 border-black cursor-pointer text-xl"><a>${index}</a></li>`;
      }

      document.querySelector("#page-number").innerHTML = content;
    }
    renderListPage();

    function getCurrentPage(currentPage){
      start = (currentPage - 1) * perPage;
      end  = currentPage  * perPage;
    }
    btnNext.addEventListener('click' , ()=>{
      currentPage++;
      if(currentPage > numPage){
        currentPage = numPage;
      }
      getCurrentPage(currentPage);

      renderProduct()
    })

    function changePage () {
      const currentPages =document.querySelectorAll("#page-number li")

      for (let index = 0; index < currentPages.length; index++) {
          // eslint-disable-next-line no-loop-func
          currentPages[index].addEventListener(('click'),()=>{
            const value = index + 1;
            currentPage = value; 
            getCurrentPage(currentPage);
            renderProduct()
          })
        
      }
    }
    changePage();

    btnPrev.addEventListener('click' , ()=>{
      currentPage--;
      if(currentPage <= 1){
        currentPage = 1;
      }
      getCurrentPage(currentPage);

      renderProduct()

    })

    
    Header.afterRender();
    const btns = document.querySelectorAll('.btn');
    btns.forEach( async (btnElement) => {
      const {id} = btnElement.dataset;
      btnElement.addEventListener('click', async () => {
        
         
        document.querySelector('#key').innerHTML = ''
        
        const { data } = await getByCategory(id);
        console.log(data);
        let showProducts = ``;       
        data.products.forEach(element => {   
            showProducts += `
              <div class="p-4 border border-gray-300 ">
                <div class="box-img">
                    <a href="/#/product-detail/${element.id}"><img src="${element.image}" alt="" class="h-58 w-72"></a>
                </div>
                <div class="box-title py-2">
                    <h2 class="text-orange-600 font-bold text-lg"><a href="/#/product-detail/${element.id}"  
                    class="text-orange-600 font-bold text-xl ">${element.name}</a></h2>
                </div>
                <div class="box-text py-2">
                    <p class="text-sm">${element.price}</p>
                </div>
            </div>
          `        
        });   
        document.querySelector('.products').innerHTML = showProducts;
      });
     
      

    const search = document.querySelector("#search");
    search.onkeydown = (event) => {
      if(event.keyCode === 13){
        const keyword = event.target.value;
        const data = filterKeyword(keyword);
        // eslint-disable-next-line no-shadow
        data.then(({data})=>{
          let showProducts = ``;       
          data.forEach(element => {   
              showProducts += `
                <div class="p-4 border border-gray-300 ">
                
                  <div class="box-img">
                      <a href="/#/product-detail/${element.id}"><img src="${element.image}" alt="" class="h-58 w-72"></a>
                  </div>
                  <div class="box-title py-2">
                      <h2 class="text-orange-600 font-bold text-lg"><a href="/#/product-detail/${element.id}"  
                      class="text-orange-600 font-bold text-xl ">${element.name}</a></h2>
                  </div>
                  <div class="box-text py-2">
                      <p class="text-sm">${element.price}</p>
                  </div>
              </div>
            `
            
          });
       
          if(keyword !== ''){
            document.querySelector('#key').innerHTML =`Hiển thị cho từ khóa: <p class="font-bold inline ">${keyword}</p> ` ;
          }else{
            document.querySelector('#key').innerHTML = ''
          }
          
          document.querySelector('.products').innerHTML = showProducts;
        })
      }
    }

    });
    
  },
};
export default Products;
