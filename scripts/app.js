const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const productGrid = document.getElementById("product-grid");
const loadingMessage = document.getElementById("loading-message");
const errorMessage = document.getElementById("error-message");

hamburger.addEventListener("click", () => {
    if (navMenu.style.display === "block") {
        navMenu.style.display = "none"; 
    } else {
        navMenu.style.display = "block";
    }
});

async function fetchProducts() {
    try {
        loadingMessage.style.display = "block";
        errorMessage.style.display = "none";

        const cachedProducts = localStorage.getItem("products");

        if (cachedProducts) {
            const products = JSON.parse(cachedProducts);
            renderProducts(products);
            loadingMessage.style.display = "none";
            return;
        }

        const response = await fetch("https://fakestoreapi.com/products?limit=8");

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const products = await response.json();

        localStorage.setItem("products", JSON.stringify(products));

        renderProducts(products);

        loadingMessage.style.display = "none";

    } catch (error) {
        console.error("Error:", error);

        loadingMessage.style.display = "none";
        errorMessage.style.display = "block";
    }
}

function renderProducts(products) {
    productGrid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                <h3>${product.title.substring(0, 40)}...</h3>
            </a>
            <p class="price">$${product.price}</p>
            <button class="add-btn">Add to Cart</button>
        `;

        const button = card.querySelector(".add-btn");

        button.addEventListener("click", () => {
            addToCart({
                ...product,
                quantity: 1
            });
        });

        productGrid.appendChild(card);
    });
}

fetchProducts();