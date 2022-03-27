






let form = document.getElementsByTagName('form')[0];
let email = document.getElementById('email');
let errorMssg = document.getElementById('error-messg');
  
   email.addEventListener('input' ,function(e){
       if(email.validity.valid){
           errorMssg.innerHTML = '';
        //    email.className='login';

       }else{
           mssgError();
       }

   });
   form.addEventListener('submit', function (e) {
if(!email.validity.valid) {
mssgError();
e.preventDefault();

}
});
function mssgError() {
if(email.validity.valueMissing) {

errorMssg.textContent = 'You need to enter an e-mail address.';

} else if(email.validity.typeMismatch) {

errorMssg.textContent = 'Entered value needs to be an e-mail address.';

} else if(email.validity.tooShort) {

errorMssg.textContent = `Email should be at least ${ email.minLength } characters; you entered ${ email.value.length }.`;
}

// Set the styling appropriately
errorMssg.className = 'error active';

}