import { filterKeyword, getAll, getByCategory } from '../../../../api/products';
import Header from '../../../components/header';
import Categories from '../categories/list';

const Products = {
  async render() {
    const { data } = await getAll();
    return /* html */ `
        <div class="container max-w-5xl mx-auto max-h-full">  
            <div id="header">
                ${Header.render()}
            </div>  
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
          <select name="" id=""> 
            <option value="#">Lọc theo giá</option>  
          </select>
          <div>
            <p id="key"></p>
          </div>
            </div>
            <div class="content flex justify-between gap-10" >
                <article class="">
                    ${await Categories.render()}
                </article>
                <article class="products grid grid-cols-3 gap-10 text-justify mt-5 ">
                ${data
                  .map(
                    (post) => `
                    <div class="p-4 border border-gray-300 ">
                        <div class="box-img">
                            <a href="/#/product-detail/${post.id}"><img src="${post.image}" alt="" class="h-58 w-72"></a>
                        </div>
                        <div class="box-title py-2">
                            <h2 class="text-orange-600 font-bold text-lg"><a href="/#/product-detail/${post.id}"  
                            class="text-orange-600 font-bold text-xl ">${post.name}</a></h2>
                        </div>
                        <div class="box-text py-2">
                            <p class="text-sm">${post.desc}</p>
                        </div>
                    </div>
                `
                  )
                  .join('')}
                </article>
            </div>
           
        </div>

        `;
  },
  afterRender() {
    Header.afterRender();
    const btns = document.querySelectorAll('.btn');
    btns.forEach( async (btnElement) => {
      const {id} = btnElement.dataset;
      btnElement.addEventListener('click', async () => {
        const { data } = await getByCategory(id);
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
                    <p class="text-sm">${element.desc}</p>
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
          // console.log({keyword});
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
                      <p class="text-sm">${element.desc}</p>
                  </div>
              </div>
            `
            
          });
          document.querySelector('#key').innerHTML =`Sản phẩm hiển thị cho từ khóa: <p class="font-bold">${keyword}</p> ` ;
          document.querySelector('.products').innerHTML = showProducts;
        })
      }
    }
    });
  },
};
export default Products;
