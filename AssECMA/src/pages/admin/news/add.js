import axios from "axios";
import navAdmin from "../../../components/navAdmin";

import { add } from "../../../../api/posts";

const AddNewPage = {
  render() {
    return /* html */ `
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
                <div> <a class="text-indigo-600 hover:text-indigo-900" href="/admin/news">Quay lại</a> </div>
                <div class="px-4 py-6 sm:px-0">
                    <div class="border-4 border-dashed border-gray-200 rounded-lg">
                        <div class="p-5">
                            <h3 class="text-xl font-bold text-black">Thêm mới bài viết</h3>
                            <div class="card">
                                <form class="space-y-5" id="form-add">

                                <div>
                                    <label class="block mb-1 font-bold text-gray-500">Title</label>
                                    <input id="title" value=""
                                    type="text" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                                </div>
                        
                                <div>
                                    <label class="block mb-1 font-bold text-gray-500">Image</label>
                                    <input id="image"
                                    type="File" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                                </div>
                        
                                <div>
                                    <label class="block mb-1 font-bold text-gray-500">Desc</label>
                                    <textarea id="desc" value=""
                                    type="text" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"></textarea>
                                </div>
                        
                                <button id="btn"
                                class="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300">Thêm</button>

                                <a class="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300 text-center" href="/admin/news"> Danh sách</a>

                            </form>
                            </div>
                                
                        </div>
                    </div>  
               
                
            </div>
            </main>
        </div>
        `;
  },

    afterRender(){
      const formAdd = document.querySelector("#form-add");
      const image = document.querySelector("#image");
      image.addEventListener('change', async (e)=>{

        const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/ph-th/image/upload";

        const file = e.target.files[0];

        const formData = new FormData();

        formData.append('file',file);
        formData.append("upload_preset","rjbb3yjz")

        // call api
        const response =  await axios.post( CLOUDINARY_API ,formData,{
           headers: {
               "Content-Type" : "application/form-data",
           } 
        });
        
        // eslint-disable-next-line no-console
        console.log(response.data.url);
        formAdd.addEventListener("submit", (ev) => {
            ev.preventDefault();
            add ({
                title: document.querySelector("#title").value,
                img: response.data.url,
                desc: document.querySelector("#desc").value
            });
          });
        
    });
    
  },
};
export default AddNewPage;
