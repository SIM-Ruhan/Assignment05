document.getElementById("login-btn").addEventListener("click", ()=>{

const inputUsername = document.getElementById("input-username");
const usernameInput = inputUsername.value;

const inputPassword = document.getElementById("input-password");
const passwordInput = inputPassword.value;

if(usernameInput == 'admin' && passwordInput=='admin123'){

 alert('Login Success');
 window.location.assign('home.html');
}
else{
     alert('Login Failed');
     return;
}

});