/* eslint-disable no-var */
import toastr from 'toastr';
import increaseQuantity, { decreaseQuantity, DeleteCart} from "../../../../ultis/cart";
import reRender from "../../../../ultis/reRender";
import Header from "../../../components/header";
import "toastr/build/toastr.min.css"



// eslint-disable-next-line prefer-const
var priceCarts = 0;
const cartList = {
   
        render(){
            // eslint-disable-next-line prefer-const
            let sumCarts = 0;
            
            if(localStorage.getItem('cart')){
                const data = JSON.parse(localStorage.getItem('cart'));
              
                    data.forEach(element => {
                        sumCarts += element.quantity; 
                    })
                    data.forEach((element)=>{
                        if(element.sale && element.sale>0){
                            priceCarts += ((element.price * element.quantity)*((100 - element.sale)/100));
                        }else{
                            priceCarts += (element.price * element.quantity);
                        }
                      
                    })
               
            return /* html */`
        <div class="container w-full mx-auto max-h-full"> 
        <div id="header">
                ${Header.render()}
            </div>
            <div class="container w-full mx-auto max-h-full px-24">  
            
                <div class="container pb-8 mx-auto mt-12 bg-white">
                    <div class="w-full overflow-x-auto">
                        <div class="my-2">
                        <h3 class="text-xl font-bold tracking-wider">Giỏ hàng</h3>
                        </div>
                        <table class="w-full shadow-inner">
                        <thead>
                            <tr class="bg-gray-100">
                            <th class="px-6 py-3 font-bold whitespace-nowrap">Sản phẩm</th>
                            <th class="px-6 py-3 font-bold whitespace-nowrap">Số lượng</th>
                            <th class="px-6 py-3 font-bold whitespace-nowrap">Đơn giá</th>
                            <th class="px-6 py-3 font-bold whitespace-nowrap">Khuyễn mãi</th>
                            <th class="px-6 py-3 font-bold whitespace-nowrap">Giá</th>
                            <th class="px-6 py-3 font-bold whitespace-nowrap">Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        ${data
                            .map(
                              (post) =>
                              
                              
                              `
                                    <tr>
                                    <td class="p-4 px-6 text-center whitespace-nowrap">${post.name}</td>
                                    <td class="p-4 px-6 text-center whitespace-nowrap">
                                        <div>
                                        <button  data-id="${post.id}" class="btn btn-decrease px-2 py-0 shadow">-</button>
                                        <input
                                            type="text"
                                            name="qty"
                                            value="${post.quantity}"
                                            class="w-12 text-center bg-gray-100 outline-none"
                                        />
                                        <button data-id="${post.id}" class="btn btn-increase px-2 py-0 shadow">+</button>
                                        </div>
                                    </td>
                                    <td class="p-4 px-6 text-center whitespace-nowrap">${post.price} $</td>
                                    <td class="p-4 px-6 text-center whitespace-nowrap">${post.sale?post.sale:'0'} %</td>
                                    <td class="p-4 px-6 text-center whitespace-nowrap">${post.sale?(post.price * post.quantity)*((100 - post.sale)/100) : post.price*post.quantity} $</td>
                                    <td class="p-4 px-6 text-center whitespace-nowrap">
                                        <button  data-id="${post.id}" class="btn btn-delete px-2 py-0 text-red-100 bg-red-600 rounded">
                                        Xóa
                                        </button>
                                    </td>
                                </tr>
                               `).join('')
                           }
                           
                            <tr>
                            <td class="p-4 px-6 text-center whitespace-nowrap"></td>
                            
                            <td class="p-4 px-6 text-center whitespace-nowrap">
                                <div class="font-bold">${
                                    sumCarts
                                   }</div>
                            </td>
                            <td class="p-4 px-6 text-center whitespace-nowrap"></td>
                            <td class="p-4 px-6 text-center whitespace-nowrap"></td>
                            <td id="priceCarts" class="p-4 px-6 font-extrabold text-center whitespace-nowrap"> 
                                
                                ${
                                    priceCarts
                                }
                            </td>
                            <td class="p-4 px-6 text-center whitespace-nowrap">
                                <button   class="btn btn-clearall px-4 py-1 text-red-600 bg-red-100">
                                    Clear All
                                </button>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                        <div class="flex justify-end mt-4 space-x-2">
                      
                        <button
                        class="
                        px-6
                        py-3
                        text-sm text-gray-800
                        bg-gray-200
                        hover:bg-gray-400
                        "
                    >
                        Cannel
                    </button>
                    <button id="cartPayments"
                        class="
                        px-6
                        py-3
                        text-sm text-white
                        bg-indigo-500
                        hover:bg-indigo-600
                        "
                    >
                        <a href="/#/paying">Thanh toán</a>
                    </button>
                       
                        </div>
                    </div>
                </div>
                <footer class="bg-purple-900 h-12 flex items-center justify-center mt-4">
                    <span class="text-white font-xs">Nguyễn Nhật Anh</span>
                </footer>
            </div>
        </div>
            `
        // eslint-disable-next-line no-else-return
        }
    },
        afterRender(){
           
            Header.afterRender();
            const btns = document.querySelectorAll('.btn');
            btns.forEach(btn => {
                const {id} = btn.dataset;
       
                btn.addEventListener('click' , () => {
                    if(btn.classList.contains('btn-increase')){
                        increaseQuantity(id , ()=>{reRender(cartList,"#app")});
                        location.reload();
                        
                    }else if(btn.classList.contains('btn-decrease')){
                        decreaseQuantity(id , ()=>{reRender(cartList,"#app")});
                        location.reload();
            
                    }else if(btn.classList.contains('btn-delete')){

                        const confirm = window.confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng?");
                        if(confirm){
                            DeleteCart(id, ()=> reRender(cartList,"#app"))
                            toastr.success("Xóa thành công");
                        }
                        
              
                    }else if(btn.classList.contains('btn-clearall')){
                        const confilm = window.confirm("Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?")
                        if(confilm) localStorage.removeItem('cart')
                        reRender(cartList,"#app")      
                    }
                    
                })
                
            });      
            
       }
}
export default cartList;
