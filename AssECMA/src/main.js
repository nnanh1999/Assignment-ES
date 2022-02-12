// npm i navigo
import Navigo from "navigo";
// client
import HomePage from "./pages/client/home";
import DetailNewsPage from "./pages/client/detail-news";
// login
import SignUpPage from "./pages/client/sign-up";
import SignInPage from "./pages/client/sign-in";
// admin
import DashBoardPage from "./pages/admin/dashboard";
import NewsPage from "./pages/admin/news/list";
import AddNewPage from "./pages/admin/news/add";
import EditNewsPage from "./pages/admin/news/edit";

const router = new Navigo("/", { linksSelector: "a" });
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