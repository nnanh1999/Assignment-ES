import toastr from 'toastr';
import { filterKeyword, getAll, remove } from '../../../../api/posts';
import reRender from '../../../../ultis/reRender';
import headerAdmin from '../../../components/headerAdmin';
import "toastr/build/toastr.min.css"

const NewsPage = {
    async render(){
        const {data} = await getAll();
        return /* html */ ` 
            <div class="min-h-full">
                <!--nav-->
                ${await headerAdmin.render()}
                <header class="bg-white shadow">
                    <div class="header-d max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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
                    <div> <a class="text-indigo-600 hover:text-indigo-900" href="/admin/news/add">Thêm Mới</a> </div>
                    <div class="px-4 py-6 sm:px-0">
                        <div class="border-4 border-dashed border-gray-200 rounded-lg">
                            <div class="p-5">
                                <h3 class="text-xl font-bold text-black">Danh Sách bài viết</h3>
                                <div class="card">
                                    <table class="min-w-full divide-y divide-gray-200 ">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>                 
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Decs</th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" colspan = "2">Chức năng</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                        ${data
                                            .map(
                                            (post) => `
                                            <tr>
                                        
                                                <td class="whitespace-nowrap">${post.id}</td>
                                                <td class="px-6 py-4 text-sm text-gray-500">${post.title}</td>                 
                                                <td class="px-6 py-4 text-sm text-gray-500"><img src="${post.img}" class="w-32" /></td>
                                                <td class="px-6 py-4 text-sm text-gray-500">${post.desc}</td>
                                                <td class="px-6 py-4 text-sm text-gray-500">${post.createdAt}</td>
                                                <td class="px-6 py-4 text-sm  text-indigo-600 hover:text-indigo-900"><button data-id="${post.id}" class="btn btn-delete">Xóa</button></td>
                                                <td class="px-6 py-4 text-sm text-red-600 hover:text-indigo-900"><a href="/admin/news/${post.id}/edit">Sửa</a></td>
                                            </tr>
                                            `).join('')
                                        }
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
        const btns =document.querySelectorAll(".btn");
        btns.forEach((buttonElement) => {
            const {id} = buttonElement.dataset;
            buttonElement.addEventListener('click', ()=>{
                const confirm = window.confirm("Bạn chắc chắn xóa?")
                if(confirm) remove(id).then(()=>{
                    reRender(NewsPage,"#app");
                    toastr.success("Xóa sản phẩm thành công");
                });
                
            })
        });
        //
        const btnSearch = document.querySelector("#search-toggle");
        btnSearch.onkeydown = (event) => {
            
          if(event.keyCode === 13){
            const keyword = event.target.value;
            const dataPromise =  filterKeyword(keyword);
            event.preventDefault();
            dataPromise.then( ({data}) =>{
                
                document.querySelector("tbody").innerHTML = `
                ${data
                    .map(
                    (post) =>  `
                    <tr>
                        <td class="whitespace-nowrap">${post.id}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">${post.title}</td>                 
                        <td class="px-6 py-4 text-sm text-gray-500"><img src="${post.img}" class="w-32" /></td>
                        <td class="px-6 py-4 text-sm text-gray-500">${post.desc}</td>
                        <td class="px-6 py-4 text-sm text-gray-500">${post.createdAt}</td>
                        <td class="px-6 py-4 text-sm  text-indigo-600 hover:text-indigo-900"><button data-id="${post.id}" class="btn btn-delete">Xóa</button></td>
                        <td class="px-6 py-4 text-sm text-red-600 hover:text-indigo-900"><a href="/admin/news/${post.id}/edit">Sửa</a></td>
                    </tr>
                    `).join('')
                };
                `;
            });
           
          };
        };
        

    }, 
};
export default NewsPage;