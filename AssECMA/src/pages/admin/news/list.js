import { remove } from '../../../../api/posts';
import navAdmin from '../../../components/navAdmin';

const NewsPage = {
    render(){
        return fetch("http://localhost:3001/posts" , {
        })
        .then((response) => response.json())
        .then((data)=> /* html */ ` 
            <div class="min-h-full">
                <!--nav-->
                ${navAdmin.render()}
                <header class="bg-white shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold text-gray-900">
                    News
                    </h1>
                </div>
                </header>
                <main>  
                <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
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
    
                            </div>
                        </div>  
                    </div>
                    
                </div>
                </main>
            </div>
        `);
    },
    afterRender(){
        const btns =document.querySelectorAll(".btn");
    
        btns.forEach((buttonElement) => {
            const {id} = buttonElement.dataset;
            buttonElement.addEventListener('click', ()=>{
                const confirm = window.confirm("Bạn chắc chắn xóa?")
                if(confirm) remove(id).then(()=>{
                    // sau đó...
                });
            })
        });
    } 
};
export default NewsPage;