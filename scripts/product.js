const container = document.getElementById("product-detail-container");

function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function fetchProduct() {
    const id = getProductId();

    if (!id) {
        container.innerHTML = "<p>Product not found.</p>";
        return;
    }

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await response.json();
        renderProduct(product);
    } catch (error) {
        container.innerHTML = "<p>Failed to load product.</p>";
        console.error(error);
    }
}

function renderProduct(product) {

    container.innerHTML = `
        <div class="product-detail-layout">
            <div class="detail-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="detail-info">
                <h2>${product.title}</h2>
                <p class="price">$${product.price}</p>

                <select id="size-select">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                </select>

                <div>
                    <button id="decrease">−</button>
                    <input type="number" id="quantity" value="1" min="1">
                    <button id="increase">+</button>
                </div>

                <p>Total: $<span id="total-price"></span></p>

                <button id="add-to-cart">Add to Cart</button>
            </div>
        </div>
    `;

    // 🔥 NOW elements exist — select them here
    const sizeSelect = document.getElementById("size-select");
    const quantityInput = document.getElementById("quantity");
    const increaseBtn = document.getElementById("increase");
    const decreaseBtn = document.getElementById("decrease");
    const totalPriceElement = document.getElementById("total-price");

    let basePrice = product.price;

    function updateTotalPrice() {
        const quantity = parseInt(quantityInput.value);
        totalPriceElement.textContent =
            (basePrice * quantity).toFixed(2);
    }

    sizeSelect.addEventListener("change", () => {
        if (sizeSelect.value === "L") {
            basePrice = product.price + 5;
        } else {
            basePrice = product.price;
        }

        updateTotalPrice();
    });

    increaseBtn.addEventListener("click", () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
        updateTotalPrice();
    });

    decreaseBtn.addEventListener("click", () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            updateTotalPrice();
        }
    });

    quantityInput.addEventListener("input", () => {
        if (quantityInput.value < 1) quantityInput.value = 1;
        updateTotalPrice();
    });

    document.getElementById("add-to-cart")
        .addEventListener("click", () => {
            addToCart({
                ...product,
                selectedSize: sizeSelect.value,
                quantity: parseInt(quantityInput.value)
            });
        });

    updateTotalPrice();
}

fetchProduct();
