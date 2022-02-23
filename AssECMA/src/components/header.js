import reRender from "../../ultis/reRender";

const Header = {
    render(){
        return /* html */`
        <header class="">
            <div class=" h-28 ">
            <div class="text-center bg-slate-300 p-1">
                <a class="font-serif text-xs">Miễn phí giao hàng</a>
            </div>
            <div class="flex flex-row items-center justify-between px-20">
                <a href=""><img src="https://i0.wp.com/wellbredstore.com/wp-content/uploads/2021/11/WB_NEW_LOGO_smaller.png?w=1000&ssl=1"
                class="w-24 h-24"
                /></a>
                <nav id="nav" class="">
                    <ul class="h-10 font-serif uppercase flex  items-center text-black text-xs">
                        <li class="p-5 ">
                            <a href="/#/" class="text-lg hover:border-b border-white">Trang chủ</a>
                        </li>
                        <li class="p-5">
                            <a href="/about" class="text-lg hover:border-b border-white" >Liên hệ</a>
                        </li>
                        <li class="p-5">
                            <a href="/edu" class="text-lg hover:border-b border-white">Tin tức</a>
                        </li>
                        <li class="p-5">
                            <a href="/#/products" class="text-lg hover:border-b">Sản phẩm</a>
                        </li>
                        <li class="p-5">
                            <a href="/admin/news" class="text-lg hover:border-b border-white">Admin</a>
                        </li>
                            
                    </ul>
                </nav>
                <div class="flex flex-row">
                   <div>
                        <form action="" class="inline relative bottom-0 left-10  ">
                            <input type="text" id="search1" class="border-2 text-sm h-7 pl-5 border-slate-500 outline-none rounded-xl w-72
                                class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Tìm kiếm sản phẩm..."
                            >
                        </form>
                        <ion-icon name="search"  class="text-2xl cursor-pointer text-black relative top-1"></ion-icon>
                   </div>
                    <div id="" class="text-right">
                        <span id="account" class="p-5 text-black "></span>
                        
                        ${(localStorage.getItem('user')) 
                        ? '<button id="logout" class="text-black "><ion-icon class="text-2xl mr-5 mt-1 "name="log-out"></ion-icon></button>'  
                        : '<a id="login" href="/signin"> <ion-icon class="text-2xl mr-5 mt-1" name="contact"></ion-icon></a>'}
                    </div>
                    <div> 
                    ${(localStorage.getItem('cart')) ?'<a  href="/my-cart"><ion-icon class="text-3xl text-black  border-black" name="cart"></ion-icon>  <p class="cart-quantity absolute top-12 border-2 border-black rounded-full  bg-white"></p></a> ': '<a  href="null-cart"><ion-icon class="text-3xl text-black  border-black" name="cart"></ion-icon>  <p class="cart-quantity absolute top-12 border-2 border-black rounded-full  bg-white"></p></a> '}
                    
                        
                       
                    </div>
                </div>
            </div>     
            </div>      
        </header>
        `
    },
    afterRender(){

        // const account = document.querySelector("#account");
        const btnLogout = document.querySelector("#logout")
        if(localStorage.getItem('user')){
            // account.innerHTML = JSON.parse(localStorage.getItem('user')).email;
            btnLogout.addEventListener('click' , () => {
                localStorage.removeItem('user');
                reRender(Header, "#header");
                
            })
        }
        // cart-quantity   
        if(localStorage.getItem('cart')){
            const numCart = JSON.parse(localStorage.getItem('cart')).length;
            document.querySelector(".cart-quantity").innerHTML = numCart;  
        }else{
            document.querySelector(".cart-quantity").innerHTML = 0; 
        }
    }
}
export default Header;