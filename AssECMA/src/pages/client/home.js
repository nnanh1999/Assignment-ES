import News from "../../components/news";
import Header from "../../components/header";

const HomePage = {
    async render() {
        return /* html */ `
        <div class="container max-w-5xl mx-auto max-h-full">  
            <div id="header">
                ${Header.render()}
            </div>  
            <div class="banner my-2">
                <a href=""><img src="https://caodang.fpt.edu.vn/wp-content/uploads/Banner-PC-1.png" class="" alt="abc"></a>
            </div>
            <div class="content">
                ${await News.render()}
            </div>
            <footer class="bg-purple-900 h-12 flex items-center justify-center mt-4">
            <span class="text-white font-xs">Nguyễn Nhật Anh</span>
            </footer>
        </div>
        `
    },
    afterRender(){
        Header.afterRender();
        // eslint-disable-next-line no-unused-vars
        const header = document.querySelector("#header")
    }
};
export default HomePage;