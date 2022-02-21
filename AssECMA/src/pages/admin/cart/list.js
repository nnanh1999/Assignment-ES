
import { getAll } from "../../../../api/carts";
import headerAdmin from "../../../components/headerAdmin";

const CartsPage = {
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
              <div> <a class="text-indigo-600 hover:text-indigo-900" href="/admin/categories/add">Thêm Mới</a> </div>
              <div class="px-4 py-6 sm:px-0">
                  <div class="border-4 border-dashed border-gray-200 rounded-lg">
                      <div class="p-5">
                        
                          <div class="card">
                              <table class="min-w-full divide-y divide-gray-200 ">
                                  <thead class="bg-gray-50">
                                      <tr>
                                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th> 
                                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>                 
                                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th> 
                                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>                 

                                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pttt</th>                 
                                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>                 
                                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>                 

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
                                                  <td class="px-6 py-4 text-sm text-gray-500">${product.email}</td>
                                                  <td class="px-6 py-4 text-sm text-gray-500">${product.phone}</td>
                                                  <td class="px-6 py-4 text-sm text-gray-500">${product.address}</td>
                                                  <td class="px-6 py-4 text-sm text-gray-500">${product.pttt}</td>
                                                  <td class="px-6 py-4 text-sm text-gray-500">${product.createAt}</td>
                                                  <td class="px-6 py-4 text-sm text-gray-500">${product.totalPrice}</td>



                                                  
                                                  <td class="text-center py-4">
                                                            <a href="/#/${product.id}/edit"><span class="fill-current text-green-500 material-icons">Chi tiết</span></a>
                                                            <button data-id="${product.id}" class="btn btn-delete fill-current text-red-500 material-icons">Xóa</button></a>
                                                        </td>
                                              </tr>  
                                          `
                                      ).join('')}
                                          
                                      </tbody>
                              </table>
                          </div>
                          <div class="text-right mr-5">
                                 
                          </div>
                      </div>
                  </div>  
              </div>
              
          </div>
          </main>
      </div>
      
         `
    }
}
export default CartsPage;