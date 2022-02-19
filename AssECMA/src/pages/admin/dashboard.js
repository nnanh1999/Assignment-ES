import headerAdmin from "../../components/headerAdmin";

const DashBoardPage = {
    async render(){
        return /* html */`
        ${await headerAdmin.render()}

                <div id="main-content" class="w-full flex-1">

                    <div class="">
                        
                    </div>
                </div>
            </div>
        </body>

        </html>
        `
    }
}
export default DashBoardPage;