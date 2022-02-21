import axios from 'axios';
import toastr from 'toastr';
import { get, update } from '../../../../api/products';
import headerAdmin from '../../../components/headerAdmin';
import "toastr/build/toastr.min.css"

const ProductEditPage = {
  async render(id) {
    const { data } = await get(id);

    return /* html */ `
        <div class="min-h-full">
        ${await headerAdmin.render()}
                <header class="bg-white shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold text-gray-900">
                        Cập nhật sản phẩm
                    </h1>
                </div>
                </header>
                <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <!-- Replace with your content -->
                <div> <a class="text-indigo-600 hover:text-indigo-900" href="/admin/products/add">Thêm Mới</a> </div>
                <div class="px-4 py-6 sm:px-0">
                    <div class="border-4 border-dashed border-gray-200 rounded-lg">
                        <div class="p-5">
                            <h3 class="text-xl font-bold text-black">Cập nhật bài viết</h3>
                            <div class="card">
                <form class="space-y-5" id="formEdit">
                    <div>
                    <label class="block mb-1 font-bold text-gray-500">ID</label>
                    <input id="id"
                    value="${
                      data.id
                    }" readonly type="text" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                    </div>
                    <div>
                        <label class="block mb-1 font-bold text-gray-500">Name</label>
                        <input id="name"
                        value="${
                          data.name
                        }" type="text" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                    </div>
                    <div>
                        <label class="block mb-1 font-bold text-gray-500">Image</label>
                        <input id="image"
                        type="File" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                        <img id="imgHide" src="${data.image}" class="w-24">
                    </div>
                    <div>
                        <label class="block mb-1 font-bold text-gray-500">Create At</label>
                        <input id="createdAt"
                        value="${
                          data.createdAt
                        }" type="text" class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500">
                    </div>
                    <div>
                        <label class="block mb-1 font-bold text-gray-500">Price</label>
                        <input id="price" 
                        value="${
                          data.price
                        }"  class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"/>
                    </div>
                    <div>
                        <label class="block mb-1 font-bold text-gray-500">Desc</label>
                        <input id="desc" 
                        value="${
                          data.desc
                        }"  class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"/>
                    </div>
                    <div>
                        <label class="block mb-1 font-bold text-gray-500">Quantity</label>
                        <input id="quantity" 
                        value="${
                          data.quantity
                        }"  class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"/>
                    </div>  
                    <div>
                        <label class="block mb-1 font-bold text-gray-500">categoryId</label>
                        <input id="categoryId" 
                        value="${
                          data.categoryId
                        }"  class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"/>
                    </div>
                    <button id="update" class="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300">Cập nhật</button>
                </form>
                </div>
            </div>
            </div>
            </div>
            </div>
        </div>
        `;
  },
  afterRender() {

    const formEdit = document.querySelector('#formEdit');
    const API = 'https://api.cloudinary.com/v1_1/ph-th/image/upload';
    const preset = 'rjbb3yjz';
    const image = document.querySelector("#image");
    const imgHide = document.querySelector("#imgHide");
    let imgLink = '';
    image.addEventListener('change' , async (e)=>{
      e.preventDefault();
          imgHide.src = URL.createObjectURL(e.target.files[0])
    });

    
    formEdit.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      
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
      } 

      
      
      update({
        id: document.querySelector('#id').value,
        name: document.querySelector('#name').value,
        image: imgLink || imgHide.src,
        createdAt: document.querySelector('#createdAt').value,
        price: document.querySelector('#price').value,
        desc: document.querySelector('#desc').value,
        quantity: document.querySelector('#quantity').value,
        categoryId: document.querySelector('#categoryId').value,
      });
      toastr.success("Sửa sản phẩm thành công ")
    });
   
    
  },
};
export default ProductEditPage;
