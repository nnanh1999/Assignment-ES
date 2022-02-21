import axios from "axios";
import validate  from 'jquery-validation';
import $ from 'jquery';
import toastr from 'toastr';
import { getAll } from "../../../../api/categories";
import { add } from "../../../../api/products";
import headerAdmin from "../../../components/headerAdmin"
import "toastr/build/toastr.min.css"

const productAddForm = {
    async render(){
        
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
                                <h3 class="text-xl font-bold text-black">Thêm mới bài viết</h3>
                                <div class="card">
                                    <form class="space-y-5" id="form-add">

                                    <div>
                                        <label class="block mb-1 font-bold text-gray-500">Name</label>
                                        <input id="name" value="" name="name"
                                        type="text" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                                    </div>
                            
                                    <div>
                                        <label class="block mb-1 font-bold text-gray-500">Image</label>
                                        <input id="image"
                                        type="File" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                                        <img class="w-20" src="http://res.cloudinary.com/ph-th/image/upload/v1645176656/f67vguycjxymtm8dctt4.gif"
                                        id="imgHide" />
                                        </div>
                                        <p id="error_alert"></p>
                                    <div>
                                        <label class="block mb-1 font-bold text-gray-500">price</label>
                                        <input id="price" value="" name="price"
                                        type="number" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"/>
                                    </div>
                                   
                                    <div>
                                        <label class="block mb-1 font-bold text-gray-500">Khuyến mãi</label>
                                        <input id="sale" value="" name="sale"
                                        type="number" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                                    </div>
                                    <div>
                                        <label class="block mb-1 font-bold text-gray-500">Quantity</label>
                                        <input id="quantity" value="" name="quantity"
                                        type="text" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                                    </div>
                                    <div>

                                        <label class="block mb-1 font-bold text-gray-500">CategoryId</label>
                                        <select id="categoryId" name="categoryId"  class="  h-12 mt-1 text-sm text-pink-700 w-full rounded-lg cursor-pointer border-2 outline-none ">
                                            <option class=" hidden">CategoryId</option>
                                        
                                        </select>
                                    </div>
                                    <div>
                                    <label class="block mb-1 font-bold text-gray-500">Desc</label>
                                    <textarea id="desc" value="" name="desc"
                                    type="text" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"></textarea>
                                </div>
                            
                                    <button id="btn"
                                    class="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300">Thêm</button>

                                    <a class="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300 text-center" href="/admin/products"> Danh sách</a>

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
        
        
        const formAdd = $("#form-add");
        const image = document.querySelector("#image");
        const imgHide = document.querySelector("#imgHide");
        let imgLink = '';
        // api
        const API = 'https://api.cloudinary.com/v1_1/ph-th/image/upload';
        const preset = 'rjbb3yjz';

        image.addEventListener('change', async (e)=>{
            imgHide.src = URL.createObjectURL(e.target.files[0])
            
          });


          formAdd.validate({
            rules : {
                "name" : {
                    required: true,
                    minlength: 5
                },
                "price" : {
                    required : true,
                    minlength: 1,
                    number: true
                },
                "quantity" : {
                    required : true,
                    minlength: 1,
                    number: true
                },

                "desc" : {
                    required : true,
                    minlength: 6
                },
               
            },
            messages : {
                "name" : {
                    required : "Bạn chưa nhập tên sản phẩm",
                    minlength: "Tên sản phẩm cần điền trên 4 kí tự"
                }, 
                "price" : {
                    required : "Bạn chưa nhập giá",
                    minlength: "Gía cần điền ít nhất 1 chữ số",
                    number: "Giá chỉ bao gồm 0-9"
                }, 
                "quantity" : {
                    required : "Bạn chưa nhập số lương",
                    minlength: "Số lượng cần điền ít nhất 1 chữ số",
                    number: "Số lượng chỉ bao gồm 0-9"
                },
                "desc" : {
                    required : "Bạn chưa nhập desc",
                    minlength: "Desc cần điền trên 10 kí tự"
                }, 
            },
             submitHandler() {
                async function productUpload(){
                    const file = image.files[0];

                    if(file){
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
        
                        const today = new Date();
                        const date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
                        const time = `${today.getHours()  }:${  today.getMinutes()  }:${  today.getSeconds()}`;
                        const dateTime = `${date} ${time}`;
                        add({
                            name : document.querySelector("#name").value,
                            image : imgLink || 'http://res.cloudinary.com/ph-th/image/upload/v1645176656/f67vguycjxymtm8dctt4.gif',
                            sale : document.querySelector("#sale").value,
                            price : document.querySelector("#price").value,
                            desc : document.querySelector("#desc").value,
                            quantity : document.querySelector("#quantity").value,
                            createdAt: dateTime,
                            categoryId : +document.querySelector("#categoryId").value
                        });
                        toastr.success("Thêm sản phẩm thành công");
                    }else{
                        document.querySelector("#error_alert").innerHTML = "Bạn chưa up ảnh kìa"
                    }

                }
                productUpload();
            }
        })

        // formAdd.addEventListener('submit' , async (ev)=>{
        //     ev.preventDefault();

            
        // })

        const Categories = getAll()
        .then(({data})=>{
            const CategoryId = data.map((post)=>`
                <option value="${post.id}">${post.name}</option>
            `)
          const a = document.querySelector('#categoryId');
          a.innerHTML = CategoryId;
        })


    }
}
export default productAddForm;