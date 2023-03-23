const Login_api = "https://ziptip-production.up.railway.app/userlogin";



function loginBtn(e) {
  e.preventDefault();
  let form = document.querySelector("#login-data");
  let mobileNo = form.login_phone.value;
  let password = form.login_pass.value;
  

  let UserData = new LoginUser( mobileNo, password);
  console.log("login data", UserData);
  

 
    form.phone.value =" ";
    form.pass.value =" ";
   
   
   fetch(Login_api, {
      
      method : "POST",
      mode : 'no-cors',
      body :  JSON.stringify(UserData),
      headers : {
        "Content-Type" : "application/json"
      }
     
   }).then(response => { 
    if (response.ok) {
      // check if response is valid JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        return response.text(); // handle non-JSON response
      }
    } else {
      throw new Error('Login failed. Please try again.');
    }
    })
   .then(data => {
    if (typeof data === 'string') {
      console.log("log in", data); 
    } else {
      console.log('User login Data', data);
      localStorage.setItem('uniqueKey', data.uuid)
    
    }
    window.location.href = '../HTML/AllRestaurent.html';
   })
   .catch(err=> console.log(err));

}

function LoginUser( ph, pa) {

  this.mobileNo = ph;
  this.password = pa;
}


