import navAdmin from "../../components/navAdmin";

const DashBoardPage = {
    render(){
        return /* html */`
        <div class="min-h-full">
        <!--nav-->
        ${navAdmin.render()}
        <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold text-gray-900">
                Quản lý
            </h1>
            <br/>
            <div class="">
                <a href="news">News</a>
                <a href="news"  class="p-10">abc</a>
            </div>
        </div>
        </header>
        <main>  
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <!-- Replace with your content -->
            <div class="px-4 py-6 sm:px-0">
            <div class="border-4 border-dashed border-gray-200 rounded-lg"></div>
            </div>
            <!-- /End replace -->
        </div>
        </main>
        
    </div>
        `
    }
}
export default DashBoardPage;