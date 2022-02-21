let cart = [];
if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'));
}

export const addToCart = (newProduct,reRen) =>{
    const existProduct  = cart.find( item => item.id === newProduct.id);
    if(!existProduct){
        cart.push(newProduct);
    }else{
        existProduct.quantity +=  newProduct.quantity;
    }
    localStorage.setItem('cart',JSON.stringify(cart));
    reRen();
}

const increaseQuantity = (id,reRen) => {
    cart.find(item => item.id === +id).quantity+=1;
    localStorage.setItem('cart' , JSON.stringify(cart))
    reRen();
}
export const decreaseQuantity = (id) => {
    const currentProduct =  cart.find(item => item.id === +id);
    currentProduct.quantity-=1;
    if(currentProduct.quantity < 1){
        const confirm = window.confirm("Xóa?");
        if(confirm){
            cart = cart.filter(item => item.id !== +id)
        }else{
            cart.find(item => item.id === +id).quantity = 1;
        }
    }
    localStorage.setItem('cart' , JSON.stringify(cart));
   
}
export const DeleteCart = (id,reRen) => {
  
        cart = cart.filter(item => item.id !== +id)
        
   

    localStorage.setItem('cart' , JSON.stringify(cart));
    reRen();
}
export default increaseQuantity;
