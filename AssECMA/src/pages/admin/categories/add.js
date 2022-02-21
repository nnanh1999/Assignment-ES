import toastr from 'toastr';
import { add } from "../../../../api/categories";
import headerAdmin from "../../../components/headerAdmin"
import "toastr/build/toastr.min.css"

const CategoriesUploadPage = {
    async render (){
        return /* html */`
            <div class="min-h-full">
                <!--nav-->
                ${await headerAdmin.render()}
                <header class="bg-white shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold text-gray-900">
                        Thêm Mới
                    </h1>
                </div>
                </header>
                
                <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <main> 
                    <!-- Replace with your content -->
                    <div> <a class="text-indigo-600 hover:text-indigo-900" href="/admin/products">Quay lại</a> </div>
                    <div class="px-4 py-6 sm:px-0">
                        <div class="border-4 border-dashed border-gray-200 rounded-lg">
                            <div class="p-5">
                                <h3 class="text-xl font-bold text-black">Thêm mới danh mục</h3>
                                <div class="card">
                                    <form class="space-y-5" id="form-add">

                                    <div>
                                        <label class="block mb-1 font-bold text-gray-500">Name</label>
                                        <input id="name" value="" name="name"
                                        type="text" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                                    </div>
                                    <button id="btn"
                                    class="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300">Thêm</button>

                                    <a class="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300 text-center" href="/#/admin/categories"> Danh sách</a>

                                </form>
                                </div>
                                    
                            </div>
                        </div>  
                </div>
                </main>
            </div>
        `
    },
    afterRender(){
       const formAdd =  document.querySelector("#form-add");
       formAdd.addEventListener('submit' , ()=>{
            add({name: document.querySelector("#name").value})
            toastr.success("Thêm danh mục thành công");
       })
    }
}
export default CategoriesUploadPage;