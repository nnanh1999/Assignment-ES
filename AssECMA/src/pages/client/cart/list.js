import increaseQuantity, { decreaseQuantity, DeleteCart} from "../../../../ultis/cart";
import reRender from "../../../../ultis/reRender";
import Header from "../../../components/header";


const cartList = {
        render(){
            if(localStorage.getItem('cart')){
                const data = JSON.parse(localStorage.getItem('cart'));
            return /* html */`
            <div class="container max-w-5xl mx-auto max-h-full">  
            <div id="header">
                ${Header.render()}
            </div>
                <div class="container pb-8 mx-auto mt-12 bg-white">
                    <div class="w-full overflow-x-auto">
                        <div class="my-2">
                        <h3 class="text-xl font-bold tracking-wider">Shopping Cart x item</h3>
                        </div>
                        <table class="w-full shadow-inner">
                        <thead>
                            <tr class="bg-gray-100">
                            <th class="px-6 py-3 font-bold whitespace-nowrap">Product</th>
                            <th class="px-6 py-3 font-bold whitespace-nowrap">Qty</th>
                            <th class="px-6 py-3 font-bold whitespace-nowrap">Price</th>
                            <th class="px-6 py-3 font-bold whitespace-nowrap">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        ${data
                            .map(
                              (post) => `
                                    <tr>
                                    <td class="p-4 px-6 text-center whitespace-nowrap">${post.name}</td>
                                    <td class="p-4 px-6 text-center whitespace-nowrap">
                                        <div>
                                        <button  data-id="${post.id}" class="btn btn-decrease px-2 py-0 shadow">-</button>
                                        <input
                                            type="number"
                                            name="qty"
                                            value="${post.quantity}"
                                            class="w-12 text-center bg-gray-100 outline-none"
                                        />
                                        <button data-id="${post.id}" class="btn btn-increase px-2 py-0 shadow">+</button>
                                        </div>
                                    </td>
                                    <td class="p-4 px-6 text-center whitespace-nowrap">${post.price*post.quantity} $</td>
                                    <td class="p-4 px-6 text-center whitespace-nowrap">
                                        <button  data-id="${post.id}" class="btn btn-delete px-2 py-0 text-red-100 bg-red-600 rounded">
                                        Xóa
                                        </button>
                                    </td>
                                </tr>
                               `)
                           }

                            <tr>
                            <td class="p-4 px-6 text-center whitespace-nowrap"></td>
                            <td class="p-4 px-6 text-center whitespace-nowrap">
                                <div class="font-bold">Total Qty - 4</div>
                            </td>
                            <td class="p-4 px-6 font-extrabold text-center whitespace-nowrap">
                                Total - 40,00 (include tax)
                            </td>
                            <td class="p-4 px-6 text-center whitespace-nowrap">
                                <button  class="px-4 py-1 text-red-600 bg-red-100">
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
                        <button
                            class="
                            px-6
                            py-3
                            text-sm text-white
                            bg-indigo-500
                            hover:bg-indigo-600
                            "
                        >
                            Proceed to Checkout
                        </button>
                        </div>
                    </div>
                </div>
                <footer class="bg-purple-900 h-12 flex items-center justify-center mt-4">
                    <span class="text-white font-xs">Nguyễn Nhật Anh</span>
                </footer>
            </div>
            `
        }},
        afterRender(){
            Header.afterRender();
            const btns = document.querySelectorAll('.btn');
            btns.forEach(btn => {
                const {id} = btn.dataset;
                btn.addEventListener('click' , () => {
                    if(btn.classList.contains('btn-increase')){
                        increaseQuantity(id , ()=>{reRender(cartList,"#app")});
                    }else if(btn.classList.contains('btn-decrease')){
                        decreaseQuantity(id , ()=>{reRender(cartList,"#app")});
            
                    }else if(btn.classList.contains('btn-delete')){
                        DeleteCart(id, ()=> reRender(cartList,"#app"))
                    }else{
                        console.log('del-all');
                    }
                })
            });
       }
}
export default cartList;
