// npm i navigo
import Navigo from "navigo";
// client
import HomePage from "./pages/client/home";
import DetailNewsPage from "./pages/client/detail-news";
import Products from "./pages/client/products/list";
import Categories from "./pages/client/categories/list";
import productDetailPage from "./pages/client/products/detail";
// login
import SignUpPage from "./pages/client/sign-up";
import SignInPage from "./pages/client/sign-in";
// admin
import DashBoardPage from "./pages/admin/dashboard";
import NewsPage from "./pages/admin/news/list";
import AddNewPage from "./pages/admin/news/add";
import EditNewsPage from "./pages/admin/news/edit";
import cartList from "./pages/client/cart/list";
import productsPage from "./pages/admin/products/list";
import ProductEditPage from "./pages/admin/products/edit";
import productAddForm from "./pages/admin/products/add";
import cartPayments from "./pages/client/cart/pay";
import nullCart from "./pages/client/cart/null-cart";
import CategoriesUploadPage from "./pages/admin/categories/add";
import CategoriesPage from "./pages/admin/categories/list";
import CartsPage from "./pages/admin/cart/list";
import EditCategoryPage from "./pages/admin/categories/edit";




const router = new Navigo("/", { linksSelector: "a", hash : true });
const print = async (content,id) => {
    document.getElementById("app").innerHTML = await content.render(id);
    if(content.afterRender) content.afterRender(id);
};

router.on("/admin/*" , () => {}, {
    before(done){
        // do something
        if(localStorage.getItem('user')){
            const userId = JSON.parse(localStorage.getItem('user')).id;
            // console.log(userId);
            if(userId === 1){
                done();
            }else{
                document.location.href = "/";
            }
        }else{
            document.location.href = "/";
        }
        done();
    }
}
);

router.on({
    "/": () => {
        print(HomePage);
    },

    "/news/:id": (value) => {
       print(DetailNewsPage,value.data.id);
    },

    "/products" : ()=>{
        print(Products);
    },
    "/product-detail/:id": (value) => {
        print(productDetailPage,value.data.id);

    },
    "/categories" : ()=>{
        print(Categories);
    },
    // cart
    "/my-cart" : ()=>{
        print(cartList);
    },
    "/paying" : () =>{
        print(cartPayments);
    },
    "/null-cart" : () =>{
        print(nullCart);
    },
    // login
    
    "/signup": ()=> {
        print(SignUpPage);
    },
    "/signin": ()=> {
        print(SignInPage);
    },

    // admin

    "/admin/dashboard":() => {
        print(DashBoardPage);
    },

    "/admin/news":() => {
        print(NewsPage);
    },
    "/admin/news/add": () => {
        print(AddNewPage);
    },
    "/admin/news/:id/edit": (value) => {
        print(EditNewsPage,value.data.id);

    },
    "/admin/products":() => {
        print(productsPage);
    },
    "/admin/products/add":() => {
        print(productAddForm);
    },
    "/admin/products/:id/edit":({data}) => {
        print(ProductEditPage, data.id);
    },
    "/admin/categories/add":() => {
        print(CategoriesUploadPage);
    },
    "/admin/categories":() => {
        print(CategoriesPage);
    },
    "admin/cart" :() =>{
        print(CartsPage)
    },
    "admin/categories/:id/update" :({data}) =>{
        print(EditCategoryPage, data.id)
    }
    
    
});
router.notFound(() => print("Not Found Page"));

router.resolve()


// // Chờ scipt load thư viện thành công thì sẽ hiển thị ra câu lệnh 
// function loadScript(src, callback) {
//     const script = document.createElement("script");
//     script.src = src;
  
//     // Chờ load thư viện thành công
//     script.onload = () => {
//       callback();
//     };
//     document.head.append(script);
//   }
//   loadScript(
//     "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
//     () => {
//       console.log("script loaded");
//     }
//   ); // newFunction nó nằm trong đường thư viện index.js

// function resolveAfter2s(){
//     return new Promise((resolve,reject) => {
//         setTimeout(()=>{
//             try {
//                 resolve(["Thầy", "Đạt"])
//             } catch (error) {
//                 reject("Lỗi rồi e bu ơi");
//             }
//         });
//     });
// }
// const getData = resolveAfter2s();
// getData.then(result => [...result,"Thầy đạt vê lót"])
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error));

// //
// async function getData2(){
//     const result = await resolveAfter2s();
//     const data = await [...result,'Nhung'];
//     console.log(data);
// }
// getData2();