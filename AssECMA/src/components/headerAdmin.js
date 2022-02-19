const headerAdmin  = {
    render(){
        return /* html */`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
        </head>
        <body class="flex  h-screen bg-gray-100 font-sans">
            <div id="sidebar" class="h-screen w-16 menu bg-white text-white px-4 flex items-center nunito static fixed shadow">

                <ul class="list-reset ">
                    <li class="my-2 md:my-0">
                        <a href="/#/admin/dashboard" class="block py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400">
                            <i class="fas fa-home fa-fw mr-3"></i><span class="w-full inline-block pb-1 md:pb-0 text-sm">Home</span>
                        </a>
                    </li>
                    <li class="my-2 md:my-0">
                        <a href="/#/admin/news" class="block py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400">
                        <i class="fa-solid fa-rss"></i><span class="w-full inline-block pb-1 md:pb-0 text-sm">News</span>
                        </a>
                    </li>
                    <li class="my-2 md:my-0">
                        <a href="/#/admin/products" class="block py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400">
                        <i class="fa-solid fa-rss"></i><span class="w-full inline-block pb-1 md:pb-0 text-sm">Prds</span>
                        </a>
                    </li>
                    
                </ul>
            </div>
            `
    }
}
export default headerAdmin;