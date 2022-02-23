import { get } from "../../../../api/cartDetails";
import headerAdmin from "../../../components/headerAdmin";

const detailCarts = {
    async render(id){
        const { data } = await get(id);
        console.log(data.detailCart);
        
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
                                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>                 
                                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th> 
                                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>                 

                                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale</th>                                  

       
                                      </tr>
                                  </thead>
                                  <tbody class="bg-white divide-y divide-gray-200">
                                  ${
                                    
                                    data.detailCart.map((detail)=>
                                    
                                              `
                                              <tr>
                                                  
                                                  <td class="px-6 py-4 text-sm text-gray-500">${detail.id}</td>
                                                  <td class="px-6 py-4 text-sm text-gray-500">${detail.name}</td>
                                                  <td class="px-6 py-4 text-sm text-gray-500"><img src="${detail.image}" class="w-10"/></td>
                                                  <td class="px-6 py-4 text-sm text-gray-500">${detail.price}</td>
                                                  <td class="px-6 py-4 text-sm text-gray-500">${detail.quantity}</td>
                                                  <td class="px-6 py-4 text-sm text-gray-500">${detail.sale || '0' }%</td>
                                               
                                              </tr> 
                                              `
                                              ) .join('')
                                         
                                
                                }      
                                      </tbody>
                              </table>
                          </div>
                          <div class="text-right mr-5">
                                 <p>Total Price: ${data.cart.totalPrice}</p>
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
export default detailCarts;