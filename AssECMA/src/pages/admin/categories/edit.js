import { data } from "autoprefixer";
import toastr from 'toastr';
import { get, update } from "../../../../api/categories";
import headerAdmin from "../../../components/headerAdmin";
import "toastr/build/toastr.min.css"

const EditCategoryPage = {
    async render(id) {
        const {data} = await get(id);
      return /* html */ `

            <!--nav-->
            ${await headerAdmin.render()}
            <header class="bg-white shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold text-gray-900">
                        Cập nhật
                    </h1>
                </div>
                </header>
              <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                  <!-- Replace with your content -->
                  <div> <a class="text-indigo-600 hover:text-indigo-900" href="/admin/news/add">Thêm Mới</a> </div>
                  <div class="px-4 py-6 sm:px-0">
                      <div class="border-4 border-dashed border-gray-200 rounded-lg">
                          <div class="p-5">
                              <h3 class="text-xl font-bold text-black">Cập nhật bài viết</h3>
                              <div class="card">
                                  <form class="space-y-5" id="formEdit">
                                  <div>
                                    <label class="block mb-1 font-bold text-gray-500">ID</label>
                                    <input id="id"
                                    value="${data.id}" readonly type="text" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                                  </div>
                                  <div>
                                      <label class="block mb-1 font-bold text-gray-500">Name</label>
                                      <input id="name"
                                      value="${data.name}" type="text" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                                  </div>

                                  <button id="update" class="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300">Cập nhật</button>
                                </form>
                              </div>
                                  
                          </div>
                      </div> 
              </div>
              `
    },afterRender(id){

        const formEdit = document.querySelector("#formEdit");
        formEdit.addEventListener('submit' , ()=>{
            update({
                id,
                name : document.querySelector("#name").value
            })
            toastr.success("Sửa danh mục thành công");
        })
    }
}
export default EditCategoryPage;