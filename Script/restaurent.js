  const restaurent_item_api = `https://ziptip-production.up.railway.app/allProduct/${localStorage.getItem('restaurentId')}`

  fetch(restaurent_item_api, {
    // mode : 'no-cors',
    method: "GET",
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      append(data)
    })
    .catch(err => console.log(err));

  let itemList = document.querySelector("#item-list");

  let append = (data) => {
    itemList.innerHTML = "";
    data.forEach(el => {
      let img = document.createElement('img');
      img.src = el.image;

      let btn = document.createElement('button');
      btn.innerText = "ADD"
      btn.addEventListener("click", () => {
        let uuid= (localStorage.getItem('uniqueKey'));
        if(uuid){
            cartAppend(el);
            updateCartUI();
        }else{
            alert('Hi User, Its Look Like Your Are Not Logged In. Please LogIn to Add The Item Into The Cart')
        }
        
      })

      let title = document.createElement('h3');
      title.innerText = el.itemName;



      let desc = document.createElement('p');
      desc.innerText = el.itemDescription;

      let price = document.createElement('h3');
      price.innerText = `₹${el.itemPrice}`;
      price.setAttribute('class', 'white-back')

      let img_div = document.createElement('div');
      img_div.setAttribute('id', "image_div");
      img_div.append(img, btn);

      let item_desc = document.createElement('div');
      item_desc.setAttribute('id', 'item_desc');
      item_desc.append(title, desc, price)

      let div = document.createElement('div');
      div.append(item_desc, img_div);
      div.setAttribute('id', 'list')

      itemList.append(div);
    });
  }



  let cartList = JSON.parse(localStorage.getItem('cart')) || [];
  

  function cartAppend(data) {

    const existingData = cartList.find(el => el.itemId === data.itemId);
   
    if (!existingData) {
      let uuid = localStorage.getItem('uniqueKey')
      cartList.push({ ...data, qnty: 1, total_price: data.itemPrice , key : uuid});
      localStorage.setItem('cart', JSON.stringify(cartList));
          
      updateCartUI();
    } else {
      alert("Item already present in the cart");
    }
  }



function updateCartUI(){

  let cart_container = document.querySelector("#cart");
  let heading = document.createElement('h1');
  heading.innerText = "Cart";

  cart_container.innerHTML = "";
  let div = document.createElement('div');
  div.setAttribute('id', "cart_item")
  let item_count = document.createElement('p');

  item_count.innerText = cartList.length;
  let total_price = 0;
  total_individual_price = 0;

  cartList.forEach(el => {
   
    let name = document.createElement('p');
    name.innerText = el.itemName;

    let price = document.createElement('p');
    let item_number = document.createElement('div');
    item_number.setAttribute('id', 'item_number');
    let data = JSON.parse(localStorage.getItem('cart'));
    data.forEach(element => {
      if (el.itemId === element.itemId) {
        item_number.innerText = element.qnty;
        price.innerText = `₹ ${el.itemPrice}`;
        price.setAttribute('class', 'cart_price');
        total_individual_price = element.itemPrice;
      }
    })


    ///////////////// Decrement Button ///////////////
    let decre = document.createElement('div');
    decre.innerText = '-';
    decre.setAttribute('id', 'decre');
    decre.addEventListener('click', () => {
      if (el.qnty > 1){
        el.qnty--;
        el.itemPrice = el.total_price * el.qnty;
        localStorage.setItem('cart', JSON.stringify(cartList));
        let data = JSON.parse(localStorage.getItem('cart'));
        data.forEach(element => {
          if (el.itemId === element.itemId) {
            item_number.innerText = element.qnty;
          }
        });

        updateCartUI();
      } else {
        return;
      }
     
    });



    ////////////////  Increment Button  //////////////////
    let incre = document.createElement('div');
    incre.innerText = '+';
    incre.setAttribute('id', 'incre');
    incre.addEventListener('click', () => {
      el.qnty++;
      el.itemPrice = el.total_price * el.qnty;
      localStorage.setItem('cart', JSON.stringify(cartList));
      let data = JSON.parse(localStorage.getItem('cart'));
      data.forEach(element => {
        if (el.itemId === element.itemId) {
          item_number.innerText = element.qnty;
          total_individual_price = element.itemPrice;
        }
      })
         updateCartUI();
    });
    
    total_price += total_individual_price;

    let btn_div = document.createElement('div');
    btn_div.append(decre, item_number, incre);
    btn_div.setAttribute('id', 'btn_div');
    
    let div3 = document.createElement('div');
    div3.append(name, btn_div, price);
    div.append(div3);
  });

  cartUpdate();

  function cartUpdate() {
    let new_total_price = total_price;
    let procced_btn = document.createElement('button');
    procced_btn.setAttribute('id', 'procced_btn');
    procced_btn.addEventListener('click', proceed);
    cart_container.innerHTML = " ";
    procced_btn.innerHTML = `&nbsp; ₹${new_total_price}`;
    cart_container.append(
      heading,
      `Items(${cartList.length})`,
      div,
      `Total : ₹ ${new_total_price}`,
      procced_btn
    );
  }
}


let cartItem = JSON.parse(localStorage.getItem('cart'));
console.log(!cartItem);
if(!cartItem){

let h3 = document.createElement('h1');
h3.innerText = "Cart is Emplty";
let div = document.createElement('div');

let image = document.createElement('img');
image.src = "../no-results.png";
image.style.width =  '300px'
div.append(image);
document.querySelector("#cart").append(h3,div);
document.querySelector("#cart").style.display = 'flex';
document.querySelector("#cart").style.flexDirection = 'column'
document.querySelector("#cart").style.alignItem = 'center'
document.querySelector("#cart").style.textAlign = 'center'
}else{
updateCartUI();
}


function proceed() {
  console.log("clicked on pay")
    let uuid= (localStorage.getItem('uniqueKey'));
    let cartItem = JSON.parse(localStorage.getItem('cart'));
    cartItem.forEach(el=> {
        const cart_api =  `https://ziptip-production.up.railway.app/addtocart?key=${uuid}&id=${el.itemId}&qty=${el.qnty}`;
        fetch(cart_api, {
            mode : 'no-cors',
            method : 'POST',
            header : {
                'Content-Type' : 'apllication.json',
            }
        })
    })

    window.location.href ="../HTML/Payment.html";
}

  
////////////////  Updating Restaurent UI /////////

let restaurentById = `https://ziptip-production.up.railway.app/restaurents/${localStorage.getItem('restaurentId')}`

fetch(restaurentById,{
  // mode : 'no-cors',
  method : 'GET'
}).then(res => res.json())
.then(data => {
  console.log("res dada",data);
  updateRestaurentUI(data);
})
.then(err => console.log(err));


function updateRestaurentUI(el){
  let img_container = document.querySelector('#img_container');
  img_container.innerHTML = "";
  let restaurent_desc = document.querySelector('#restaurent_desc');
  restaurent_desc.innerHTML = "";
  let image = document.createElement('img');
  image.src = el.image;
  let res_name = document.createElement('h3');
  res_name.innerText = el.name;

  let res_building = document.createElement('p');
  res_building.innerText = `${el.buildingNo}, ${el.buildingName}, ${el.landMark}`

  
  state = `${el.state} `;
  let category = document.createElement('h3');
  category.innerText = `Veg | No-Veg`;
  let rating = document.createElement('h4');
  rating.innerText = `rating : 3.5/5 (30% off)`;
  img_container.append(image);
  restaurent_desc.append(res_name,res_building,state,category,rating);

}

let uuid= (localStorage.getItem('uniqueKey'));

fetch(`https://ziptip-production.up.railway.app/users/${uuid}`,{
  // mode : 'no-cors',
  method : 'GET'
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
    button.style.marginLeft= '60%';
    button.addEventListener('click',()=> {
      window.location.href= "/index.html";
    })
    container.append(button);
return;
  }
  let container = document.querySelector('#user_details');
  container.innerHTML = "";


  let userIcon = document.createElement('img');
  userIcon.src= "../user.png"
  let name = document.createElement('p');
  name.innerText = data.name;
  let userdiv = document.createElement('div');
  userdiv.append(userIcon,name);

  let orderIcon = document.createElement('img');
  orderIcon.src = "../file.png";
  let order = document.createElement('p');
  order.innerText = 'Orders';
  let orderdiv = document.createElement('div');
  orderdiv.append(orderIcon,order);

  let callIcon = document.createElement('img');
  callIcon.src = "../calling-app.png";
  let restaurentContact = document.createElement('p');
  restaurentContact.innerText = 'Call Restaurent';
  let calldiv = document.createElement('div');
  calldiv.append(callIcon,restaurentContact);
 
  container.append(userdiv,orderdiv,calldiv);

  
}