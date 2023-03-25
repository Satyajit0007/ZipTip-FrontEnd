const product_api = "https://ziptipapi-production.up.railway.app/restaurents";
                  
                  
fetch(product_api , {
    method : "GET",
})                
.then(res => res.json())
.then(data => {   
    console.log(data);
    //console.log(data[0].adminId);
    // adminID(data[0].adminId);
    append(data); 
})                
.catch(err => {    
    console.log(err);
})                
  


let productGrid = document.querySelector("#product-grid");

function append(data) {
  productGrid.innerHTML = "";

  data.forEach(el => {
    let div = document.createElement("div");
    div.classList.add("product");

    let image = document.createElement("img");
    image.src = el.image; 

    let name = document.createElement("h4");
    name.innerText = el.name;

    let address = document.createElement("p");
    address.innerText = `${el.buildingNo}, ${el.buildingName}, ${el.state}`;

    div.addEventListener("click" , ()=>{
      localStorage.setItem('restaurentId', el.adminId);
      window.location.href ="/ZipTip-FrontEnd/HTML/Restaurent.html";

    })

    div.append(image, name, address);
    productGrid.append(div);
  });
}



let uuid= (localStorage.getItem('uniqueKey'));

fetch(`https://ziptipapi-production.up.railway.app/users/${uuid}`,{
 
  method : 'GET',

}).then(res => res.json())
.then(data => {
  console.log();
  userNameUpdateUI(data);

})
.catch(err => console.log(err));



function userNameUpdateUI(data){
  
  if(!uuid){

     let container = document.querySelector('#user_details');
     container.innerHTML = "";
                             
    let button = document.createElement('button');
    button.innerText = 'Login';
    button.style.padding = '0.7rem 5rem';
    button.style.border = 'none';
    button.style.fontWeight = '600';
    button.style.background='#4d2b6e';
    button.style.color = '#fff';
    button.style.borderRadius= '0.5rem';
    button.style.cursor = 'pointer';
    button.style.marginLeft= '60%'
    button.addEventListener('click',()=> {
      window.location.href= "/ZipTip-FrontEnd/index.html";
    })                        
    container.append(button);
return;
  }
  let container = document.querySelector('#user_details');
  container.innerHTML = "";


  let userIcon = document.createElement('img');
  userIcon.src= "/ZipTip-FrontEnd/user.png"
  let name = document.createElement('p');
  name.innerText = data.name;
  let userdiv = document.createElement('div');
  userdiv.append(userIcon,name);

  let orderIcon = document.createElement('img');
  orderIcon.src = "/ZipTip-FrontEnd/file.png";
  let order = document.createElement('p');
  order.innerText = 'Orders';
  let orderdiv = document.createElement('div');
  orderdiv.append(orderIcon,order);


 
  container.append(userdiv,orderdiv);

  
}