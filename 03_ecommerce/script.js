document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 },
  ];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  let cart = [];
  if (localStorage.getItem("cart") !== null) {
    cart = JSON.parse(localStorage.getItem("cart"));
    renderCart();
  }

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    const productName = document.createElement("span");
    productName.textContent = `${product.name} - $ ${product.price}`;
    const addProductBtn = document.createElement("button");
    addProductBtn.setAttribute("data-id", product.id);
    addProductBtn.textContent = `Add to Cart`;
    productDiv.appendChild(productName);
    productDiv.appendChild(addProductBtn);

    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const getCartItem = products.filter((elem) => elem.id === productId);
      addToCart(...getCartItem);
    }
  });

  function addToCart(item) {
    cart.push(item);
    renderCart();
  }

  function renderCart() {
    cartItems.innerText = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item, idx) => {
        totalPrice += item.price;
        const itemInCart = document.createElement("div");
        itemInCart.innerHTML = `
        <span>${item.name}  ${item.price}</span> 
        <button class="material-icons" data-id=${idx} >&#xe872;</button>
        `;
        itemInCart.classList.add("itemsIncart");
        cartItems.appendChild(itemInCart);
        totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
        setLocally();
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }
  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout successfully");
    emptyCartMessage.classList.remove("hidden");
    cartTotalMessage.classList.add("hidden");
    renderCart();
    setLocally();
  });

  //delete from cart functionality

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const removeItemId = parseInt(e.target.getAttribute("data-id"));
      console.log(removeItemId);
      cart = cart.filter((elem, idx) => idx !== removeItemId);
      console.log(cart);
      setLocally();
      renderCart();
    }
  });
  function setLocally() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
