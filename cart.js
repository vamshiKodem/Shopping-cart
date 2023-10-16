const cartId = document.getElementById("cartNumber");
const cartList = document.getElementById("item-list");
const clearCartButton = document.getElementsByClassName("clear-cart");
let basket = JSON.parse(localStorage.getItem("cart-data")) || [];
const removeItem = document.getElementsByClassName("bi bi-x-lg");

const calculate = () => {
  let total = 0;
  basket.forEach((value) => {
    total = value.item + total;
  });
  cartId.innerHTML = total;
};

calculate();

const generateCartList = () => {
  if (basket.length > 0) {
    return (cartList.innerHTML = basket
      .map((x) => {
        const search = items.find((y) => y.id === x.id);
        return `<div class="cart-list">
        <div class="image-div"></div>
        <div class="content-container">
          <div class="title-container">
            <div class="title-text">
              <h5>${search.title}</h5>
              <p>$${search.price}</p>
            </div>
            <i onclick="onRemoveItemClick(${x.id})" class="bi bi-x-lg"></i>
          </div>
          <div class="icon-container">
            <i onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
            <p id=${x.id} >${x.item}</p>
            <i onclick="increment(${x.id})" class="bi bi-plus-lg"></i>
          </div>
          <h4 id="price-${x.id}">$${x.item * search.price}</h4>
        </div>
      </div>`;
      })
      .join(""));
  } else {
    return `<h1>Please add list </h1>`;
  }
};

generateCartList();

const increment = (id) => {
  const isItemPresent = basket.find((item) => item.id === id);
  isItemPresent.item++;
  update(id);
  localStorage.setItem("cart-data", JSON.stringify(basket));
};

const decrement = (id) => {
  const isItemPresent = basket.find((item) => item.id === id);
  isItemPresent.item--;
  update(id);
  basket = basket.filter((item) => item.item !== 0);
  generateCartList();
  localStorage.setItem("cart-data", JSON.stringify(basket));
};

const update = (id) => {
  const search = basket.find((item) => item.id === id);
  const product = items.find((data) => id === data.id);
  document.getElementById(id).innerHTML = search.item;
  document.getElementById(`price-${id}`).innerHTML = `$${
    search.item * product.price
  }`;
};

const onClearButtonClick = () => {
  basket = [];
  generateCartList();
  localStorage.setItem("cart-data", JSON.stringify(basket));
};

const onRemoveItemClick = (id) => {
  basket = basket.filter((data) => data.id !== id);
  generateCartList();
  localStorage.setItem("cart-data", JSON.stringify(basket));
};
