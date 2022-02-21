import News from "../../components/news";
import Header from "../../components/header";
import Products from "../../components/products";

const HomePage = {
    async render() {
        
        return /* html */ `
        <div class="container w-full mx-auto max-h-full">  
            <div id="header" >
                ${Header.render()}
            </div>  
            <div class="banner my-2">
                <a href="">
                    <img class="w-full" src="https://i.pinimg.com/originals/7d/83/a4/7d83a4778ee46abdb03d1fe443533128.jpg"/> 
                </a>
            </div>
            <div class="content px-24">
            
                ${await News.render()}
                ${await Products.render()}
                
            </div>
            <footer class="bg-black h-12 flex items-center justify-center mt-4">
            <span class="text-white font-xs">Nguyễn Nhật Anh</span>
            </footer>
        </div>
        `
    },
    afterRender(){
        Header.afterRender();
        // eslint-disable-next-line no-unused-vars
        const header = document.querySelector("#header")
        News.afterRender();
       
        Products.afterRender(); 
      
    }
};
export default HomePage;