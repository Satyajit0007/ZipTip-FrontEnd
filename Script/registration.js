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
 
  var nameRegex = /^[a-zA-Z ]*$/;
  var phoneRegex = /^[0-9]{10}$/;
  var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,12}$/;

  // Validate name field
  if (!nameRegex.test(name)) {
      alert("Name must not contain numbers or special characters.");
      return;
  }

  // Validate phone field
  if (!phoneRegex.test(mobileNo)) {
      alert("Mobile number must have 10 digits.");
      return;
  }

  // Validate password field
  if (!passRegex.test(password)) {
      alert("Password should be alphanumeric and must contain 6-12 characters having at least one special character, one upper case, one lowercase, and one digit.");
      return;
  }

  // Validate confirm password field
  // if (pass !== cpass) {
  //     alert("Confirm password must match to password.");
  //     return;
  // }

   
  let RegisterUserData = new RegisterUser( email, mobileNo, name, password);
  console.log("register data" , RegisterUserData);

    async function postDataAndReload(register_api, RegisterUserData) {
      try {
        const response = await fetch(register_api, {
          mode : 'no-cors',
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
