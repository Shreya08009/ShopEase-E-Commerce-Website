function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems) return;

    const cart = getCart();

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="cart-item">
                <h3>Your cart is empty.</h3>
                <a href="products.html" class="btn">
                    Continue Shopping
                </a>
            </div>
        `;

        cartTotal.textContent = "0";
        return;
    }

    let total = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <span style="font-size:35px">${item.image}</span>
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Subtotal: ₹${itemTotal}</p>
            </div>

            <button onclick="removeFromCart(${item.id})">
                Remove
            </button>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.textContent = total;
}

function removeFromCart(productId) {

    let cart = getCart();

    cart = cart.filter(item => item.id !== productId);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
    updateCartCount();
}

function clearCart() {

    if (confirm("Are you sure you want to clear the cart?")) {

        localStorage.removeItem("cart");

        displayCart();
        updateCartCount();
    }
}

function checkout() {

    const cart = getCart();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for shopping with ShopEase!");

    localStorage.removeItem("cart");

    displayCart();
    updateCartCount();
}

document.addEventListener("DOMContentLoaded", function () {

    displayCart();
    updateCartCount();

});