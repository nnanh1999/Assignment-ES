// eslint-disable-next-line prefer-const
let para = document.createElement("input");
const addSize = {
    
    render(){
        return `
           <div id="nodePar">
                <button id="create_size" type="text"> Thêm </button>
           </div>
        `
    },  
    afterRender(){
        
        // const create_size = document.querySelector("#create_size");
        // create_size.addEventListener("click", ()=>{
          
        // ch
        //     // Append to body:
        //     document.body.appendChild(para);
        // })
    }
}
export default addSize;