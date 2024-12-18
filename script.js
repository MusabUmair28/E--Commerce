// Product Data
const products = [
    { id: 1, name: "Glory Smartwatch", price: 25.99, image: "https://zerolifestyle.co/cdn/shop/files/Layer_3_B.webp?v=1719928924&width=400" },
    { id: 2, name: "Men's Tree Runners", price: 35.99, image: "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_947,f_auto,q_auto/https://www.allbirds.com/cdn/shop/files/A11053_24Q3_Tree_Dasher_Relay_Deep_Navy_Deep_Navy_PDP_SINGLE_3Q-2000x2000.png?v=1724093992" },
    { id: 3, name: "Product C", price: 45.99, image: "https://www.junaidjamshed.com/media/catalog/product/j/j/jjks-90499_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds" },
    { id: 4, name: "Product D", price: 55.99, image: "https://www.junaidjamshed.com/media/catalog/product/a/d/addicted_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds" },
  ];
  
  // State Management
  let cart = [];
  
  // DOM Elements
  const productGrid = document.getElementById("product-grid");
  const cartModal = document.getElementById("cart-modal");
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartIcon = document.getElementById("cart-btn");
  
  // Display Products
  function displayProducts() {
    productGrid.innerHTML = "";
    products.forEach((product) => {
      const productEl = document.createElement("div");
      productEl.className = "product";
      productEl.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productGrid.appendChild(productEl);
    });
  }
  
  // Add to Cart with Animation
  function addToCart(id) {
    const product = products.find((p) => p.id === id);
    cart.push(product);
    updateCart();
  
    // Get the button and cart icon for animation
    const addToCartButton = document.querySelector(`button[onclick="addToCart(${id})"]`);
    
    // Create a flying image element for the animation
    const flyingImage = document.createElement("img");
    flyingImage.src = product.image;
    flyingImage.style.position = "absolute";
    flyingImage.style.width = "50px";
    flyingImage.style.height = "50px";
    flyingImage.style.borderRadius = "50%";
    flyingImage.style.zIndex = 1000; // Ensure it is above other elements
    flyingImage.style.pointerEvents = "none"; // Avoid interaction
  
    // Get button position
    const buttonRect = addToCartButton.getBoundingClientRect();
    flyingImage.style.top = `${buttonRect.top}px`;
    flyingImage.style.left = `${buttonRect.left}px`;
  
    // Append flying image to the body
    document.body.appendChild(flyingImage);
  
    // Get cart icon position
    const cartRect = cartIcon.getBoundingClientRect();
  
    // Animate flying image to the cart
    flyingImage.animate(
      [
        { top: `${buttonRect.top}px`, left: `${buttonRect.left}px`, opacity: 1 },
        { top: `${cartRect.top}px`, left: `${cartRect.left}px`, opacity: 0 }
      ],
      {
        duration: 800,
        easing: "ease-in-out",
      }
    );
  
    // Remove flying image after animation
    setTimeout(() => flyingImage.remove(), 800);
  }
  
  // Update Cart
  function updateCart() {
    cartCount.innerText = cart.length;
    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.innerHTML = `
        <p>${item.name} - $${item.price.toFixed(2)}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItems.appendChild(cartItem);
    });
  }
  
  // Remove from Cart
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }
  
  // Show Cart
  cartIcon.addEventListener("click", () => {
    cartModal.classList.remove("hidden");
  });
  
  // Hide Cart
  document.getElementById("close-cart").addEventListener("click", () => {
    cartModal.classList.add("hidden");
  });
  
  // Checkout
  document.getElementById("checkout-btn").addEventListener("click", () => {
    alert("Checkout Complete!");
    cart = [];
    updateCart();
    cartModal.classList.add("hidden");
  });
  
  // Initialize
  displayProducts();
  