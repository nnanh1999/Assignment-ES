import Header from "../../../components/header"

const nullCart = {
        render(){
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
                        
                            
                        </tbody>
                        </table>
                        <div class="text-center mt-4 space-x-2">
                                <p>Giỏ hàng trống. Mời vào trang <a class="font-bold" href="/#/products"> sản phẩm</a></p>
                                
                       
                        </div>
                    </div>
                </div>
                <footer class="bg-purple-900 h-12 flex items-center justify-center mt-4">
                    <span class="text-white font-xs">Nguyễn Nhật Anh</span>
                </footer>
            </div>
        </div>
        `
        }
    }


export default nullCart;