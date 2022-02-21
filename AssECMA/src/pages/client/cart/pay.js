import { add } from "../../../../api/carts";
import Header from "../../../components/header";
import toastr from 'toastr';
import "toastr/build/toastr.min.css"
// eslint-disable-next-line import/order
import $ from 'jquery';
// eslint-disable-next-line import/order
import validate  from 'jquery-validation';
// eslint-disable-next-line no-unused-vars
let priceCarts = 0;
// eslint-disable-next-line prefer-const


const cartPayments = {
    render(){
        if(localStorage.getItem('cart')){
            const data = JSON.parse(localStorage.getItem('cart'));
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
            <div class="container flex justify-center w-full mx-auto max-h-full px-24"> 
            <form id="done-paying"> 
            <div class="flex flex-row">
                
                <div class="py-12 ">
                    <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl mx-2">
                        <div class="md:flex ">
                            <div class="w-full p-4 px-5 py-5">
                                <div class="flex  flex-row ">
                                    
                                    <h2 class="text-3xl text-green-400 font-semibold">  Thông tin giao hàng</h2>
                                </div>
                                <div class="flex  flex-row pt-2 text-xs pt-6 pb-5"> 
                                </div> 
                                <span>Customer Information</span>
                                <div class="relative pb-5"> 
                                    <input id="email" type="text" name="email" class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="E-mail">
                                    <span class="absolute text-blue-500 right-2 top-4 font-medium text-sm">Log out</span> 
                                </div> 
                                <div class="relative pb-5"> 
                                    <input id="phone" type="text" name="phone" class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 text-sm" placeholder="Phone number *">
                                </div> 
                                <span>Shipping Address</span>
                                    <input id="name" type="text" name="name" class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Name*"> 
                            
                                <input id="address" type="text" name="address" class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Địa chỉ nhận hàng*">
                                <input id="note" type="text" name="mail" class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Ghi chú">
                            
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-12">
                    <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl mx-2">
                        <div class="md:flex ">
                            <div class="w-full p-4 px-5 py-5">
                                ${
                                    data.map((cart)=>`
                                    <div class="flex flex-row justify-between items-center my-5 ">
                                        <div >
                                            <img  src="${cart.image}" class="inline rounded-2xl w-16"/> <span>sl : ${ cart.quantity}</span>
                                        </div>  
                                        <div>
                                            <p>${cart.sale?(cart.price * cart.quantity)*((100 - cart.sale)/100) : cart.price*cart.quantity} VNĐ </p>
                                        </div>  
                                    </div>
                                    <hr>    
                                    `).join('')
                                }

                               
                                <div class="text-center">
                                <h2 class="font-bold my-5 uppercase">Tổng cộng: <p class="inline font-bold my-5 text-red-500">${priceCarts} VNĐ</p></h2>
                               </div>
                               <div> <p class="font-bold mt-5"> Phương thức thanh toán </p> 
                                    <label>Zalo</label>
                                        <input id="pttt" type="radio" value="1" name="pttt" class="border rounded h-5  focus:outline-none focus:border-green-200 mt-2 text-sm"> 
                                    <br>
                                    <label>Thanh toán khi nhận hàng</label>
                                    <input id="pttt" type="radio" value="2" name="pttt" class="border rounded h-5  focus:outline-none focus:border-green-200 mt-2 text-sm"> 
                                </div>
                                <div class="flex justify-between items-center pt-2"><a href="/my-cart" class="h-12 w-24 text-blue-500 text-xs font-medium p-3">Về giỏ hàng </a>
                                <button type="submit" class="h-12 w-48 rounded font-medium text-xs bg-blue-500 text-white">Hoàn tất thanh toán</button> </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            </form>
        </div>
    </div>
        `
    }
    },
    afterRender(){
        Header.afterRender()
        const donePaying = $("#done-paying");
  
        donePaying.validate({
            rules : {
                "phone" : {
                    required : true,
                    minlength: 10
                },
                "name" : {
                    required : true,
                },
                "address" : {
                    required : true,
                },
                pttt: "required"
            },
            messages : {
                "phone" : {
                    required : "Bạn chưa điền số điện thoại",
                    minlength: "Số điện thoại cần điền trên 10 kí tự"
                },  
                "name" : {
                    required : "Bạn chưa điền tên",
                },
                "address" : {
                    required : "Bạn chưa điền số điện thoại",
                    minlength: "Address cần điền trên 10 kí tự"
                },
                pttt: "Mời chọn phương thức thanh toán"
            },
            // eslint-disable-next-line object-shorthand
            submitHandler :  function() {
                async function donePaying(){
                    const emailValue = document.querySelector("#email").value;
                    const phoneValue = document.querySelector("#phone").value;
                    const nameValue = document.querySelector("#name").value;
                    const addressValue = document.querySelector("#address").value;
                    const ptttValue = document.querySelector("#pttt").value;
                    const noteValue = document.querySelector("#note").value;
                    const today = new Date();
                    const date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
                    const time = `${today.getHours()  }:${  today.getMinutes()  }:${  today.getSeconds()}`;
                    const dateTime = `${date} ${time}`;
                    // note : noteValue,
        
                    add({
                        email : emailValue,
                        phone : phoneValue,
                        name : nameValue,
                        address : addressValue,
                        pttt : ptttValue,
                        createAt : dateTime,
                        totalPrice : priceCarts,    
                    })
                    
                }
                toastr.success("Đặt hàng thành công;")
                localStorage.removeItem("cart");
                donePaying();
            }
        })

        // donePaying.addEventListener('submit', ()=>{
            
            
            
             
            

        // })
    }
}
export default cartPayments;