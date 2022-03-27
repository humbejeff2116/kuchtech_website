









let form = document.getElementById('signup-form');
let btn = document.getElementById('submit');

let formDataArray =  [];

const signupData =localStorage.getItem('signupData')
  ? JSON.parse(localStorage.getItem('signupData'))
  : []
  
  const saveFormData =( )=>  {
        let fullname = document.getElementById('fullname');
        let username = document.getElementById('username');
        let bio= document.getElementById('bio');
        let password =document.getElementById('password') ;
        let password2 =document.getElementById('password2');
             
        formDataArray.push({fullname:fullname.value, username:username.value, bio:bio.value,
             password:password.value,password2:password2.value});
        
        console.log('form data',formDataArray)
    
        localStorage.setItem('signupData', JSON.stringify(formDataArray))
    
         console.log('local storage data',signupData) 

}

form.onsubmit = function (e) {
        
        saveFormData();
};

const populateForm = ( ) =>{
    
    let fullname = document.getElementById('fullname');
    let username= document.getElementById('username');
    let bio = document.getElementById('bio');
    let password =document.getElementById('password') ;
    let password2 =document.getElementById('password2');
    signupData.map(data=>{
       fullname.value = data.fullname;
       username.value = data.username;
       bio.value = data.bio;
       password.value = data.password;
       password2.value = data.password2;
    })

}


window.onload = populateForm()


