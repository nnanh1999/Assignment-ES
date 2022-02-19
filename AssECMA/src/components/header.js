import reRender from "../../ultis/reRender";

const Header = {
    render(){
        return /* html */`
        <header>
            <div class="bg-white h-24 flex items-center justify-center">
            <a href=""
                ><img
                src=""
                class="w-30 h-24"
            /></a>
            <span>
            
            </div>
            
            <nav id="nav" class="bg-black">
            <ul
                class="h-10 flex flex-row justify-around items-center text-white text-xs"
            >
                <li>
                <a href="/#/" class="hover:border-b border-white">Trang chủ</a>
                </li>
                <li>
                <a href="/about" class="hover:border-b border-white"
                    >Liên hệ</a
                >
                </li>
                <li>
                <a href="/edu" class="hover:border-b border-white"
                    >Tin tức</a
                >
                </li>
                <li>
                <a href="/#/products" class="hover:border-b"
                    >Sản phẩm</a
                >
                </li>
                <li>
                <a href="/admin/news" class="hover:border-b border-white">Admin</a>
                </li>
                <form action="" class="relative left-4">
                <input
                    class="bg-white h-7 w-64 outline-none text-gray-500 text-xs"
                    type="text"
                />
                
                </form>
                <div id="" class="text-right">
                    <span id="account" class="p-5 text-white"></span>
                    
                    ${(localStorage.getItem('user')) 
                    ? '<button id="logout" class="text-white "><ion-icon class="text-xl"name="log-out"></ion-icon></button>'  
                    : '<a id="login" href="/signin"> <ion-icon class="text-xl" name="contact"></ion-icon></a>'}
                </div>
                <div> 
                    <a  href="/my-cart"><ion-icon class="text-xl" name="cart"></ion-icon></a> 
                </div>
            </ul>
            </nav>
        </header>
        `
    },
    afterRender(){
        const account = document.querySelector("#account");
        const btnLogout = document.querySelector("#logout")
        if(localStorage.getItem('user')){
            account.innerHTML = JSON.parse(localStorage.getItem('user')).email;
            btnLogout.addEventListener('click' , () => {
                localStorage.removeItem('user');
                reRender(Header, "#header");
                
            })
        }
        
        
       
    }
}
export default Header;