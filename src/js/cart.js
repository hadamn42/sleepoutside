import { setLocalStorage, getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  // cartCount(cartItems);
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  //has to be a funciton here or the buttons will not add back in for some reason
  totalCheck();
  removeIt();
  subtractItem();
  addItem();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.Qty}</p>
  <button class="less-qty" data-id="${item.Id}">-</button><button class="more-qty" data-id="${item.Id}">+</button>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="remove-item" id="${item.Id}">X</button>
</li>`;

  return newItem;
}

// removeFromCart();
renderCartContents();

// Adding in the remove button the subtractItem and addItem functions work similarly
function removeIt() {
  // calls all the buttons because I don't know how to do it one by one (keeps getting a bunch and this works well enough)
  const removeButtons = document.querySelectorAll(".remove-item");

  // adds the event listener for each button and sets off the removal function
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let prodList = getLocalStorage("so-cart");
      let prodId = button.id;
      offList(prodList, prodId);
    });
  });
}

function offList(prodList, prodId) {
  let prodIndex = "";
  for (var i in prodList) {
    if (prodList[i].Id == prodId && prodIndex == "") {
      prodIndex = i;
    }
  }

  prodList.splice(prodIndex, 1);
  setLocalStorage("so-cart", prodList);
  renderCartContents();
}

// removes an item from the cart
function subtractItem(){
  const lessButtons = document.querySelectorAll(".less-qty");
  lessButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let prodId = button.dataset.id;
      addRemove(prodId, ".less-qty");
    });
  });
}

// adds item from the cart
function addItem(){
  const moreButtons = document.querySelectorAll(".more-qty");
  moreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let prodId = button.dataset.id;
      addRemove(prodId, ".more-qty");
    });
  });
}

// either adds or removes one of an item from the cart.
function addRemove (targetProdId, butClass){
  const cartList = getLocalStorage("so-cart");
  
  //creates the array number so we can mess with the array directly 
  let upItem = cartList.indexOf(cartList.find(i => i.Id == targetProdId));
  // console.log(upItem);

  // did this just to shorten the math in the "if"s. Probably not needed but it is a bit cleaner
  let qty = cartList[upItem].Qty;

  // went with less first so it does technically default to adding stuff. Yay?
  if(butClass == ".less-qty"){

    // don't use a variable here, we need to manipulate the array directly
    cartList[upItem].Qty = qty - 1;

    // check to see whether we're at 0 or not
    if (cartList[upItem].Qty == 0){
      offList(cartList, targetProdId);
    };
  }else{
    // console.log(cartList[upItem]);
    cartList[upItem].Qty = qty + 1;
  };
  setLocalStorage("so-cart", cartList);
  renderCartContents();
}

// adding a total based on the quantity and price
function totalCheck(){
  const total = document.querySelector(".cart-total");
  const cart = document.querySelector(".product-list");
  const cartFooter = document.getElementById("cart-footer");
  if (cart.innerHTML !== ""){
    const till = totalCalc();
    // console.log(till);
    total.innerHTML = total.innerHTML.slice(0, 8) + till;
    cartFooter.classList.remove("cart-footer-hide");
    cartFooter.classList.add("cart-footer-show");
  }else{
    if(cartFooter.classList !== ""){
      cartFooter.classList.add("cart-footer-hide");
    };
  };
}

function totalCalc(){
  const cartList = getLocalStorage("so-cart");
  let total = 0;
  cartList.map((item) => {
    total = total + (item.Qty * item.FinalPrice);
    // console.log(total);
  });
  return total.toFixed(2);

}