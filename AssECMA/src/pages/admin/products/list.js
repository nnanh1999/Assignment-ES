
import toastr from 'toastr';
import "toastr/build/toastr.min.css"
import { filterKeyword, getAll, remove } from '../../../../api/products';
import reRender from '../../../../ultis/reRender';
import headerAdmin from '../../../components/headerAdmin';


const productsPage = {
  async render() {
    const { data } = await getAll();
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
                                        <tbody class="bg-white divide-y divide-gray-200">
                                            ${data.map(
                                            (product) =>
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
                                                `
                                            ).join('')}
                                                
                                            </tbody>
                                    </table>
                                </div>
                                <div class="text-right mr-5">
                                        <a href="#">1 . 2 . 3 . 4 . 5 >></a>
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

    const btnSearch = document.querySelector("#search-toggle");
    btnSearch.onkeydown =  (event) => {
      if(event.keyCode === 13){
        const keyword = event.target.value;
        const dataPromise =  filterKeyword(keyword);
        event.preventDefault();
    //    console.log(dataPromise);
        dataPromise.then( ({data})  =>{
            let showProducts = ``;       
            data.forEach(  product => {   
                showProducts += /* html */`
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

                        <td class="px-6 py-4 text-sm text-gray-500">
                            <span class="text-sm bg-green-500 text-white rounded-full px-2 py-1">Active</span>
                        </td>
                        <td class="text-center py-4">
                            <a href="/#/admin/products/${product.id}/edit"><span class="fill-current text-green-500 material-icons">Edit</span></a>
                            <a href="#"><span class="fill-current text-red-500 material-icons">Delete</span></a>
                        </td>
                    </tr>  
              `
                 
            });
            document.querySelector('tbody').innerHTML = showProducts;
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
