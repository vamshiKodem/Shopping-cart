const shop = document.getElementById("shop");
const cartId = document.getElementById("cartNumber");

let basket = JSON.parse(localStorage.getItem("cart-data")) || [];

const generateShop = () => {
  return (shop.innerHTML = items
    .map((item) => {
      const localData = basket.find((x) => x.id === item.id);
      return `<div id={cart-container-${item.id}} class="cart-container">
    <div class="img"></div>
    <div class="details">
      <h3 class="details-title">${item.title}</h3>
      <p>${item.description}</p>
      <div class="price-section">
        <h3>$ ${item.price}</h3>
        <div class="icon-container" >
          <i onclick="decrement(${item.id})" class="bi bi-dash-lg"></i>
          <p id=${item.id} >${localData ? localData.item : 0}</p>
          <i onclick="increment(${item.id})" class="bi bi-plus-lg"></i>
        </div>
      </div>
    </div>
  </div>`;
    })
    .join(""));
};

generateShop();

const increment = (id) => {
  const isItemPresent = basket.find((item) => item.id === id);
  if (isItemPresent) {
    isItemPresent.item++;
  } else {
    basket.push({ id, item: 1 });
  }
  localStorage.setItem("cart-data", JSON.stringify(basket));
  update(id);
};

const decrement = (id) => {
  const isItemPresent = basket.find((item) => item.id === id);
  if (isItemPresent === undefined) {
    alert("Not selected");
    return;
  } else {
    isItemPresent.item--;
  }
  update(id);
  basket = basket.filter((item) => item.item !== 0);
  localStorage.setItem("cart-data", JSON.stringify(basket));
};

const update = (id) => {
  const search = basket.find((item) => item.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculate();
};

const calculate = () => {
  let total = 0;
  basket.forEach((value) => {
    total = value.item + total;
  });
  cartId.innerHTML = total;
};

calculate();
