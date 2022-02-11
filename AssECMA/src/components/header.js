const Header = {
    render(){
        return /* html */`
        <header>
            <div class="bg-purple-900 h-24 flex items-center justify-center">
            <a href=""
                ><img
                src="./images/favpng_fpt-polytechnic-logo-image-symbol.png"
                class="w-30 h-24"
            /></a>
            <span>
            
            </div>
            <div id="" class="text-right bg-blue-700">
                <span id="account" class="p-5 text-white"></span>
                <button id="logout" class="px-5 text-white">Log out</button>
            </div>
            <nav id="nav" class="bg-orange-400">
            <ul
                class="h-10 flex flex-row justify-around items-center text-white text-xs"
            >
                <li>
                <a href="/" class="hover:border-b border-white">Trang chủ</a>
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
                <a href="/student" class="hover:border-b border-white"
                    >Sản phẩm</a
                >
                </li>
                <li>
                <a href="/add" class="hover:border-b border-white">Chi tiết sản phẩm</a>
                </li>
                <form action="" class="relative left-4">
                <input
                    class="bg-white h-7 w-64 outline-none text-gray-500 text-xs"
                    type="text"
                />
                <button
                    class="bg-purple-900 h-7 w-28 ml-2 hover:border border-white"
                >
                    Tìm kiếm
                </button>
                </form>
            </ul>
            </nav>
        </header>
        `
    },
    afterRender(){
        const account = document.querySelector("#account");
        const btnLogout = document.querySelector("#logout")
        account.innerHTML = JSON.parse(localStorage.getItem('user')).email;

        btnLogout.addEventListener('click' , () => {
            localStorage.removeItem('user');
        })
       
    }
}
export default Header;