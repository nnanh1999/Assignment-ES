
import toastr from 'toastr';
import "toastr/build/toastr.min.css"
import { filterKeyword, getAll, remove } from '../../../../api/products';
import reRender from '../../../../ultis/reRender';
import headerAdmin from '../../../components/headerAdmin';

// eslint-disable-next-line prefer-const
let perPage = 6;
let currentPage = 1;
let start = 0;
let end = perPage;

const { data } = await getAll();
const numPage = Math.ceil(data.length / perPage);

const productsPage = {
  async render() {
    
    return /* html */ `
            ${await headerAdmin.render()}
            <header class="bg-white shadow">
                    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 class="text-3xl font-bold text-gray-900">
                            Danh sách bài viết
                        </h1>
                        <form>
                            <input class="shadow appearance-none border rounded w-200 py-2 px-3 
                            text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="search-toggle" type="text" placeholder="Tìm kiếm">
                        </form>
                    </div>
            </header>
            <main>  
                <div class="max-w-max mx-auto py-6 sm:px-6 lg:px-8">
                    <!-- Replace with your content -->
                    <div> <a class="text-indigo-600 hover:text-indigo-900" href="/admin/products/add">Thêm Mới</a> </div>
                    <div class="px-4 py-6 sm:px-0">
                        <div class="border-4 border-dashed border-gray-200 rounded-lg">
                            <div class="p-5">
                              
                                <div class="card">
                                    <table class="min-w-full divide-y divide-gray-200 ">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>                 
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Desc</th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantiy</th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CategoryId</th>
                                              
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" colspan = "2">Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody class="products bg-white divide-y divide-gray-200">
                                            ${data.map(
                                            (product , index) => (index >= start && index< end) ?
                                                `
                                                    <tr>
                                                        
                                                        <td class="px-6 py-4 text-sm text-gray-500">${product.id}</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500">${product.name}</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500">
                                                            <img class="h-6 w-6 rounded-full"
                                                                src="${product.image}">
                                                        </td>
                                                        <td class="px-6 py-4 text-sm text-gray-500">${product.price}</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500">${product.desc}</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500">${product.quantity}</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500">${product.createdAt}</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500">${product.categoryId}</td>

                                               
                                                        <td class="text-center py-4">
                                                            <a href="/#/admin/products/${product.id}/edit"><span class="fill-current text-green-500 material-icons">Edit</span></a>
                                                            <button data-id="${product.id}" class="btn btn-delete fill-current text-red-500 material-icons">Xóa</button></a>
                                                        </td>
                                                    </tr>  
                                                ` :''
                                            ).join('')}
                                                
                                            </tbody>
                                    </table>
                                </div>
                                <div class="text-right mr-5">
                                    <p class="cursor-pointer" id="btn-prev"><a><<<a></p>
                                    <div id="page-number">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <p class="cursor-pointer" id="btn-next"><a>>><a></p>
                                </div>
                            </div>
                        </div>  
                    </div>
                    
                </div>
                </main>
            </div>
        `;
  },
  afterRender(){

    function renderProduct(){
        document.querySelector(".products").innerHTML = `
        ${data.map(
            (product , index) => (index >= start && index< end) ?
                `
                    <tr>
                        
                        <td class="px-6 py-4 text-sm text-gray-500">${product.id}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">${product.name}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">
                            <img class="h-6 w-6 rounded-full"
                                src="${product.image}">
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500">${product.price}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">${product.desc}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">${product.quantity}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">${product.createdAt}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">${product.categoryId}</td>

               
                        <td class="text-center py-4">
                            <a href="/#/admin/products/${product.id}/edit"><span class="fill-current text-green-500 material-icons">Edit</span></a>
                            <button data-id="${product.id}" class="btn btn-delete fill-current text-red-500 material-icons">Xóa</button></a>
                        </td>
                    </tr>  
                ` :''
            ).join('')}
    `
    }
    function getCurrentPage(currentPage){
        start = (currentPage - 1) * perPage;
        end  = currentPage  * perPage;
    }
    function prevPage(){
        document.querySelector("#btn-prev").addEventListener('click',()=>{
            currentPage--;
            if(currentPage <= 1){
                currentPage = 1;
            }
            getCurrentPage(currentPage);
            renderProduct();
        })
    }
    function nextPage(){
        document.querySelector("#btn-next").addEventListener('click',()=>{
            currentPage++;
            if(currentPage > perPage){
              currentPage = perPage;
            }
            getCurrentPage(currentPage);
            renderProduct();
        })
    }

    function renderListPage(){
        let content = '';
        content += `<span class="cursor-pointer">${1}</span>-`;
        for (let index = 2; index <= numPage; index++) {
          content += `<span class="cursor-pointer">${index}</span>-`;
        }
  
        document.querySelector("#page-number").innerHTML = content;
      }
      renderListPage();

      function changePage () {
        const currentPages =document.querySelectorAll("#page-number span")
  
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




    nextPage();
    prevPage();
    


    const btnSearch = document.querySelector("#search-toggle");
    btnSearch.onkeydown =  (event) => {
      if(event.keyCode === 13){
        const keyword = event.target.value;
        const dataPromise =  filterKeyword(keyword);
        event.preventDefault();
    //    console.log(dataPromise);
        dataPromise.then( ({data})  =>{
            document.querySelector(".products").innerHTML = `
        ${data.map(
            (product , index) => (index >= start && index< end) ?
                `
                    <tr>
                        
                        <td class="px-6 py-4 text-sm text-gray-500">${product.id}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">${product.name}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">
                            <img class="h-6 w-6 rounded-full"
                                src="${product.image}">
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500">${product.price}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">${product.desc}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">${product.quantity}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">${product.createdAt}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">${product.categoryId}</td>

               
                        <td class="text-center py-4">
                            <a href="/#/admin/products/${product.id}/edit"><span class="fill-current text-green-500 material-icons">Edit</span></a>
                            <button data-id="${product.id}" class="btn btn-delete fill-current text-red-500 material-icons">Xóa</button></a>
                        </td>
                    </tr>  
                ` :''
            ).join('')}
    `
        });
      };
    };
    const btns = document.querySelectorAll(".btn");
    btns.forEach((btn)=>{
        const {id} = btn.dataset;
        // console.log(id); 
        btn.addEventListener('click' , ()=>{
            const confilm  =window.confirm("Bạn chắc chắn xóa");
            if(confilm) remove(id) .then(()=>{
                reRender(productsPage,"#app");
                toastr.success("Xóa sản phẩm thành công");
            });
        })
    })
  },
};
export default productsPage;
