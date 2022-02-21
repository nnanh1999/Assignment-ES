import $ from 'jquery';
import validate  from 'jquery-validation';
import { signup } from "../../../api/user";
import Header from "../../components/header";

const SignUpPage = {
    render(){
        return /* html */`
      <div class="container w-full mx-auto max-h-full ">  
        ${Header.render()}   
        <div class="px-52 pt-20">
          <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"></div>
          </div>
        </div>
        
        <div class="mt-10 sm:mt-0 ">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Đăng ký</h3>
                <p class="mt-1 text-sm text-gray-600">
                  Nhập đầy đủ thông tin bên dưới
                </p>
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form action="" id="formSignup" method="POST">
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-3">
                        <label for="first-name" class="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" value="" name="username" id="username" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      </div>

        
                      <div class="col-span-6 sm:col-span-4">
                        <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                        <input type="text" value="" name="email" id="email" autocomplete="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      </div>
        
                      <div class="col-span-6 sm:col-span-4">
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" value="" name="password" id="password" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                      </div>
                     
                  </div>
                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Gửi
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <footer class="bg-purple-900 h-12 flex items-center justify-center mt-52">
            <span class="text-white font-xs">Nguyễn Nhật Anh</span>
        </footer>
      </div>
        `
    },
    afterRender(){
      Header.afterRender();
      const formSignup = $("#formSignup");
      formSignup.validate({
        rules : {
            "email" : {
                required: true,
                email: true,
                minlength: 10
            },
            "password" : {
                required : true,
                minlength: 6
            },
            "username" :{
              required : true,
              minlength: 6
            }
           
        },
        messages : {
            "email" : {
                required : "Bạn chưa email",
                email : "Chưa đúng định dạng email",
                
                minlength: "Email cần điền trên 10 kí tự"
            },  
            "password" : {
                required : "Mời nhập password",
                minlength: "Bạn cần điền ít nhất 5 kí tự"
            },
            "username" :{
              required : "Mời nhập user",
              minlength: "Bạn cần điền ít nhất 5 kí tự"
            }
        },
        submitHandler() {
            async function SignUp(){
              await signup ({
                    "username" : document.querySelector("#username").value,
                    "email" : document.querySelector("#email").value,
                    "password" : document.querySelector("#password").value,
                  })
            }
            SignUp();
          }
    })
  }
}
export default SignUpPage;