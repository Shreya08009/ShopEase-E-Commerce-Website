const products = [
    {
        id: 1,
        name: "Smartphone",
        price: 15999,
        category: "electronics",
        image: "📱"
    },
    {
        id: 2,
        name: "Laptop",
        price: 49999,
        category: "electronics",
        image: "💻"
    },
    {
        id: 3,
        name: "Headphones",
        price: 1999,
        category: "electronics",
        image: "🎧"
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 2999,
        category: "electronics",
        image: "⌚"
    },
    {
        id: 5,
        name: "T-Shirt",
        price: 799,
        category: "fashion",
        image: "👕"
    },
    {
        id: 6,
        name: "Shoes",
        price: 2499,
        category: "fashion",
        image: "👟"
    },
    {
        id: 7,
        name: "Backpack",
        price: 1299,
        category: "fashion",
        image: "🎒"
    },
    {
        id: 8,
        name: "Table Lamp",
        price: 999,
        category: "home",
        image: "💡"
    }
];

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");

function displayProducts(productArray) {

    if (!productList) return;

    productList.innerHTML = "";

    if (productArray.length === 0) {
        productList.innerHTML = "<p>No products found.</p>";
        return;
    }

    productArray.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">${product.image}</div>

            <h3>${product.name}</h3>

            <p class="price">₹${product.price}</p>

            <button class="btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        productList.appendChild(card);
    });
}

function filterProducts() {

    const searchText = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filtered = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchText);

        const matchesCategory =
            category === "all" ||
            product.category === category;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filtered);
}

function addToCart(productId) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = products.find(p => p.id === productId);

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(product.name + " added to cart!");

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }
}

if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", filterProducts);
}

displayProducts(products);