import {  getAll } from "../../../../api/carts";
import { get } from "../../../../api/products";
import { addToCart } from "../../../../ultis/cart";
import reRender from "../../../../ultis/reRender";
import Header from "../../../components/header";

const productDetailPage = {
    async render(id){
        const {data} = await get(id);
        return /* html */`
        <div class="container w-full mx-auto max-h-full">  
        <div id="header">
                ${ Header.render()}
            </div>  
            <div class="md:flex items-start justify-between py-12 2xl:px-20 md:px-6 px-4">
            <div class="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
                <img class="w-full" id="image" alt="image of a girl posing" src="${data.image}" />
            </div> 
            <div class="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                <div class="border-b border-gray-200 pb-6">
                    <h1 class="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">${data.name}</h1>
                </div>
                <div class="py-4 border-b border-gray-200 flex items-center justify-between">
                    <p class="text-base leading-4 text-gray-800 dark:text-gray-300">Option</p>
                    <div class="flex items-center justify-center">
                    <select id="color" class=" right-24 top-4 h-12 mt-1 text-sm text-pink-700 w-200 rounded-lg cursor-pointer outline-none ">
                        <option class=" hidden">Màu</option>
                        <option value="yellow" class="w-5 bg-yellow-400"></option>
                        <option value="red" class="w-5 bg-red-400"></option>
                    </select>

                       
                    </div>
                </div>
                <div class="py-4 border-b border-gray-200 flex items-center justify-between">
                    <p class="text-base leading-4 text-gray-800 dark:text-gray-300">Option</p>
                    <div class="flex items-center justify-center" >
                    <select id="size" class=" right-24 top-4 h-12 mt-1 text-sm text-pink-700 w-200 rounded-lg cursor-pointer outline-none ">
                        <option class=" hidden">Kích cỡ</option>
                        <option value="asc">X</option>
                        <option value="desc">XL</option>
                    </select>
                        
                    </div>
                </div>
                <div>
                    <button  data-id="${data.id}" class="btn btn-decrease px-2 py-0 shadow">-</button>
                        <input
                            type="number"
                            name="qty"
                            value="1"
                            min="1"
                            class="w-12 text-center bg-gray-100 outline-none my-5"
                            id="qty"
                        />
                        <button data-id="${data.id}" class="btn btn-increase px-2 py-0 shadow">+</button>
                        </div>
                    <button data-id="${data.id}" class="btn btn-add-cart dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 ">
                    Thêm giỏ hàng
                </button>
                <div>
                    
                    <p class="md:w-96 text-base leading-normal text-gray-600 dark:text-gray-300 mt-4">${data.desc}</p>
                </div>
                <div>
                    <div class="border-t border-b py-4 mt-7 border-gray-200">
                        <div data-menu class="flex justify-between items-center cursor-pointer">
                            <p class="text-base leading-4 text-gray-800 dark:text-gray-300">Giao hàng & Đổi trả</p>
                            <button class="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded" role="button" aria-label="show or hide">
                                <img class="transform dark:hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg4.svg" alt="dropdown">
                                <img class="transform hidden dark:block" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg4dark.svg" alt="dropdown">
                            </button>
                        </div>
                        <div class="hidden pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 dark:text-gray-300" id="sect">Abc gì gì đó</div>
                    </div>
                </div>
                <div>
                    <div class="border-b py-4 border-gray-200">
                        <div data-menu class="flex justify-between items-center cursor-pointer">
                            <p class="text-base leading-4 text-gray-800 dark:text-gray-300">Contact us</p>
                            <button class="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded" role="button" aria-label="show or hide">
                                <img class="transform dark:hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg4.svg" alt="dropdown">
                                <img class="transform hidden dark:block" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/productDetail3-svg4dark.svg" alt="dropdown">
                            </button>
                        </div>
                        <div class="hidden pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 dark:text-gray-300" id="sect">Mail <br> SDT</div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="bg-purple-900 h-12 flex items-center justify-center mt-4">
            <span class="text-white font-xs">Nguyễn Nhật Anh</span>
            </footer>
        </div>
        `
    },
    afterRender(id){

   
        function changeSize(){
            console.log('a');
            
        }
 


        Header.afterRender();

        const elements = document.querySelectorAll("[data-menu]");
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < elements.length; i++) {
            const main = elements[i];
            main.addEventListener("click", () => {
                const element = main.parentElement.parentElement;
                const andicators = main.querySelectorAll("img");
                const child = element.querySelector("#sect");
                child.classList.toggle("hidden");
                andicators[0].classList.toggle("rotate-180");
            });
        }
        
        
       
  
        const btnAddCart = document.querySelector('.btn-add-cart');
        btnAddCart.addEventListener('click' ,async ()=>{
            const {data} = await get(id);
            addToCart({...data, quantity : +document.querySelector("#qty").value },()=>
            {reRender(productDetailPage,"#header")})
            location.reload();
           
        })
    }
}
export default productDetailPage;