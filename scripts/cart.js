function addToCart(product) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(item => 
        item.id === product.id &&
        item.selectedSize === product.selectedSize &&
        item.selectedColor === product.selectedColor
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
}

function showCartSuccess() {
    const success = document.getElementById("cart-success");
    success.style.display = "block";

    setTimeout(() => {
        success.style.display = "none";
    }, 2000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

updateCartCount();
