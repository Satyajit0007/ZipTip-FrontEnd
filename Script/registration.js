const register_api = "https://ziptipapi-production.up.railway.app/users";
const uniqueKey =  (localStorage.getItem('uniqueKey'));

function reload(){

if(uniqueKey){
  window.location.href = "/HTML/AllRestaurent.html";
 return; 
}

}


function registerBtn(e) {
  e.preventDefault();
  let form = document.querySelector("#register-data");
  let name = form.name.value;
  let email = form.email.value;
  let mobileNo = form.phone.value;
  let password = form.pass.value;
 
   var nameRegex = /^[a-zA-Z ]{3,20}$/;
  var phoneRegex = /^[0-9]{10}$/;
  var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,12}$/;

   // Validate name field
  if (!nameRegex.test(name)) {
      if(name.length < 3){
        document.querySelector('#name-error').innerHTML = "**Name must have 3 character atleast";
        document.querySelector('#name').style.borderBottom = "2px solid #120420"
        return;
      }
      document.querySelector('#name-error').innerHTML = "**Name must not contain numbers or special characters"
      document.querySelector('#name').style.borderBottom = "2px solid #120420";
      return;
  }

  // Validate phone field
  if (!phoneRegex.test(mobileNo)) {

      document.querySelector('#phone').innerHTML = "**Mobile number must have 10 digits"
      document.querySelector('#name').style.borderBottom = "2px solid #120420";
      return;
  }

  // Validate password field
  if (!passRegex.test(password)) {
    document.querySelector('#pass').innerHTML =("**6-12 characters, 1 special character, 1 upper case, 1 lowercase,1 digit");
    document.querySelector('#pass').style.borderBottom = "2px solid #120420"; 
    return;
  }

  // Validate confirm password field
  if (password !== confirm_password) {
    document.querySelector('#cpass-error').innerHTML =("Confirm password must match to password.");
    document.querySelector('#cpass').style.borderBottom = "2px solid #120420";
    return;
  }

   
  let RegisterUserData = new RegisterUser( email, mobileNo, name, password);
  console.log("register data" , RegisterUserData);

    async function postDataAndReload(register_api, RegisterUserData) {
      try {
        const response = await fetch(register_api, {
          method: "POST",
          body: JSON.stringify(RegisterUserData),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        console.log("User data posted", data);
        location.reload();
      } catch (error) {
        console.error("Error in sending data", error);
      }
    }
    
    setTimeout(() => {
      postDataAndReload(register_api, RegisterUserData);
    }, 3000);


    
}

function RegisterUser(em,ph,n,pa) {
  this.name = n;
  this.email = em;
  this.mobileNo = ph;
  this.password = pa;
}






/////////////////// Typing aimation /////////////

const typewriter = document.querySelector('.typewriter');
const paragraphs = typewriter.querySelectorAll('p');

let delay = 0;
paragraphs.forEach((p, index) => {
  const text = p.textContent;
  p.textContent = '';

  for (let i = 0; i < text.length; i++) {
    setTimeout(() => {
      p.textContent += text[i];
      p.style.visibility = 'visible';
      p.style.opacity = 1;
    }, delay);
    delay += 40;
  }
});


///////// Log in - Registraion Toggle //////

const registrationForm = document.getElementById('registration-form');
const loginForm = document.getElementById('login-form');

function toggleLogin() {
  var loginButton = document.getElementById('login-nav');
  if (loginButton.getAttribute('onclick') === 'register()') {
          loginButton.setAttribute('onclick', 'login()');
          loginButton.innerHTML = 'Login';
  } else {
          loginButton.setAttribute('onclick', 'register()');
          loginButton.innerHTML = 'Register';
  }
}

function login() {
  registrationForm.style.display = 'none';
  loginForm.style.display = 'block';
  document.querySelector("#login-nav").innerText = "Register";
  toggleLogin();
}

function register() {
  registrationForm.style.display = 'block';
  loginForm.style.display = 'none';
  document.querySelector("#login-nav").innerText = "Login";
  toggleLogin();
}
