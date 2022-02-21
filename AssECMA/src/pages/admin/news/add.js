import axios from "axios";
import toastr from 'toastr';
import "toastr/build/toastr.min.css"
import validate  from 'jquery-validation';
import $ from 'jquery';
import { add } from "../../../../api/posts";
import headerAdmin from "../../../components/headerAdmin";

const AddNewPage = {
  async render() {
    return /* html */ `
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
                <div> <a class="text-indigo-600 hover:text-indigo-900" href="/admin/news">Quay lại</a> </div>
                <div class="px-4 py-6 sm:px-0">
                    <div class="border-4 border-dashed border-gray-200 rounded-lg">
                        <div class="p-5">
                            <h3 class="text-xl font-bold text-black">Thêm mới bài viết</h3>
                            <div class="card">
                                <form class="space-y-5" id="form-add">

                                <div>
                                    <label class="block mb-1 font-bold text-gray-500">Title</label>
                                    <input id="title" value="" name="title"
                                    type="text" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                                </div>
                        
                                <div>
                                    <label class="block mb-1 font-bold text-gray-500">Image</label>
                                    <input id="image"
                                    type="File" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                                    <img class="w-20" src="http://res.cloudinary.com/ph-th/image/upload/v1645176656/f67vguycjxymtm8dctt4.gif"
                                     id="imgHide" />
                                     <p id="error_alert"></p>
                                </div>
                        
                                <div>
                                    <label class="block mb-1 font-bold text-gray-500">Desc</label>
                                    <textarea id="desc" value="" name="desc"
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
      const formAdd = $("#form-add");
      const image = document.querySelector("#image");
      const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/ph-th/image/upload";
      const preset = "rjbb3yjz";
      const imgHide = document.querySelector("#imgHide");
      let imgLink = "";
      
      image.addEventListener('change', async (e)=>{
        imgHide.src = URL.createObjectURL(e.target.files[0])
        
      });
        
      formAdd.validate({
        rules : {
            "title" : {
                required: true,
                minlength: 10
            },
            "desc" : {
                required : true,
                minlength: 6
            },
           
        },
        messages : {
            "title" : {
                required : "Bạn chưa nhập title",
                minlength: "Email cần điền trên 10 kí tự"
            }, 
            "desc" : {
                required : "Bạn chưa nhập desc",
                minlength: "Desc cần điền trên 10 kí tự"
            }, 
        },
        submitHandler() {
            async function newCreate(){
                const today = new Date();
                const date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
                const time = `${today.getHours()  }:${  today.getMinutes()  }:${  today.getSeconds()}`;
                const dateTime = `${date} ${time}`;
               //
                const file = image.files[0];
                if(file){
                    const formData = new FormData();
                    formData.append('file',file);
                    formData.append("upload_preset",preset)
                    // call api
                    const {data} =  await axios.post( CLOUDINARY_API ,formData,{
                        headers: {
                            "Content-Type" : "application/form-data",
                        }
                    });
                    imgLink = data.url;
                    add ({
                        title: document.querySelector("#title").value,
                        img: imgLink || 'http://res.cloudinary.com/ph-th/image/upload/v1645176656/f67vguycjxymtm8dctt4.gif',
                        desc: document.querySelector("#desc").value,
                        createdAt : dateTime
                    });
                    toastr.success("Thêm sản phẩm thành công");
                }else{
                    document.querySelector("#error_alert").innerHTML = "Bạn chưa up ảnh kìa"
                }
            }
            newCreate();
    
        }


        })

  },
};
export default AddNewPage;
