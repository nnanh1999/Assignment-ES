import axios from "axios";
import toastr from 'toastr';
import { get, update } from "../../../../api/posts";
import headerAdmin from "../../../components/headerAdmin";
import "toastr/build/toastr.min.css"

const EditNewsPage = {
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
                                      <label class="block mb-1 font-bold text-gray-500">Title</label>
                                      <input id="title"
                                      value="${data.title}" type="text" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                                  </div>
                                  <div>
                                      <label class="block mb-1 font-bold text-gray-500">Image</label>
                                      <input id="image"
                                      type="File" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                                      <img id="imgHide" src="${data.img}" class="w-24">
                                  </div>
                                  <div>
                                      <label class="block mb-1 font-bold text-gray-500">Create At</label>
                                      <input id="createdAt"
                                      value="${data.createdAt}" type="text" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                                  </div>
                                  <div>
                                      <label class="block mb-1 font-bold text-gray-500">Desc</label>
                                      <input id="desc" 
                                      value="${data.desc}"  class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"/>
                                  </div>
                                  <button id="update" class="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300">Cập nhật</button>
                                </form>
                              </div>
                                  
                          </div>
                      </div> 
              </div>


          `;
    },
    afterRender(id){
        const API = 'https://api.cloudinary.com/v1_1/ph-th/image/upload';
        const preset = 'rjbb3yjz';
        const image = document.querySelector("#image");
        let imgLink = '';
        const imgHide = document.querySelector("#imgHide");

        image.addEventListener('change' , async (e)=>{
            e.preventDefault(); 
            imgHide.src = URL.createObjectURL(e.target.files[0])
        });

        const formEdit = document.querySelector("#formEdit");
            formEdit.addEventListener('submit' ,async (ev) => {
            ev.preventDefault();
                const file = image.files[0];
                const formData = new FormData();
                formData.append('file',file);
                formData.append("upload_preset", preset)
                // call api
                const {data} =  await axios.post( API ,formData,{
                    headers: {
                        "Content-Type" : "application/form-data",
                    } 
                });
                imgLink = data.url;
                update({
                    id,
                    img :imgLink || imgHide.src,
                    title : document.querySelector("#title").value,
                    createdAt :document.querySelector("#createdAt").value,
                    desc : document.querySelector("#desc").value
                });
                toastr.success("Cập nhật sản phẩm thành công")
            });
    
    },
  };
  
export default EditNewsPage;