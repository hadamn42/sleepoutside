import { setLocalStorage, getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  //has to be a funciton here or the buttons will not add back in for some reason
  removeIt();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="remove-item" id="${item.Id}">X</button>
</li>`;

  return newItem;
}

// removeFromCart();
renderCartContents();

// Adding in the remove button
function removeIt() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
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
