
/* GAME QUEST - IMPROVED SHOPPING CART */


let cart = JSON.parse(localStorage.getItem("gameQuestCart") || "{}");


const cartItems = document.getElementById("cart-items");
const cartTotalDisplay = document.getElementById("cart-total");
const cartMessage = document.getElementById("cart-message");

const products = document.querySelectorAll(".product-card");

// Update what the customer sees

function updateCart() {
    localStorage.setItem("gameQuestCart", JSON.stringify(cart));

    if (!cartItems || !cartTotalDisplay || !cartMessage) {
        return;
    }

    cartItems.innerHTML = "";


    let total = 0;

    for (const name in cart) {
        const product = cart[name];

        const subtotal = product.price * product.quantity;

        total += subtotal;

        
const cartItem = document.createElement("div");
cartItem.className = "cart-row";

const productInfo = document.createElement("span");
productInfo.textContent =
    name + " — $" + subtotal.toFixed(2) + " CAD";

const controls = document.createElement("div");
controls.className = "quantity-controls";

const minusButton = document.createElement("button");
minusButton.type = "button";
minusButton.textContent = "−";
minusButton.setAttribute("aria-label", "Remove one " + name);

const quantityText = document.createElement("span");
quantityText.textContent = product.quantity;

const plusButton = document.createElement("button");
plusButton.type = "button";
plusButton.textContent = "+";
plusButton.setAttribute("aria-label", "Add one " + name);

minusButton.addEventListener("click", () => {
    cart[name].quantity--;

    if (cart[name].quantity === 0) {
        delete cart[name];
    }

    updateCart();
});

plusButton.addEventListener("click", () => {
    cart[name].quantity++;
    updateCart();
});

controls.appendChild(minusButton);
controls.appendChild(quantityText);
controls.appendChild(plusButton);

cartItem.appendChild(productInfo);
cartItem.appendChild(controls);
cartItems.appendChild(cartItem);

    }

    cartTotalDisplay.textContent =
        "$" + total.toFixed(2) + " CAD";

    if (Object.keys(cart).length === 0) {
        cartMessage.textContent =
            "Your cart is empty. Add a product to get started!";
    } else {
        cartMessage.textContent =
            "Products added to your demo cart!";
    }
}

// Add products to the cart
products.forEach((product) => {
    const button = product.querySelector(".add-to-cart");

    button.addEventListener("click", () => {
        const name = product.querySelector("h3").textContent;

        const priceText = product.querySelector(".price").textContent;
        const price = parseFloat(priceText.replace("$", ""));

        if (cart[name]) {
            cart[name].quantity++;
        } else {
            cart[name] = {
                price: price,
                quantity: 1
            };
        }

        updateCart();
    });
});

// Clear the entire cart
const clearCartButton = document.getElementById("clear-cart");


clearCartButton?.addEventListener("click", () => {

    cart = {};
    updateCart();
});



/* LOAD SAVED CART WHEN PAGE OPENS */
updateCart();
