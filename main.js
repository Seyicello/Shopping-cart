const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// Start when the document is ready
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start();
}

// =============== START ====================
function start() {
    addEvents();
}

// ============= UPDATE & RERENDER ===========
function update() {
    addEvents();
    updateTotal();
}

// =============== ADD EVENTS ===============
function addEvents() {
    // Open cart when clicking on the cart icon
    let cartIcons = document.querySelectorAll(".add-cart");
    cartIcons.forEach((icon) => {
        icon.addEventListener("click", handle_openCart);
    });
    // Toggle "liked" state when clicking on a like button
    let likeButtons = document.querySelectorAll(".like-button");
    likeButtons.forEach((button) => {
        button.addEventListener("click", handle_toggleLike);
    });

    // Open cart when clicking on any product image
    let productImages = document.querySelectorAll(".product-img");
    productImages.forEach((image) => {
        image.addEventListener("click", handle_openCart);
    });
    // Remove items from cart
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    // Change item quantity
    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach((input) => {
        input.addEventListener("change", handle_changeItemQuantity);
    });

    // Add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach((btn) => {
        btn.addEventListener("click", handle_addCartItem);
    });

    // Buy Order
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
}

// ============= HANDLE EVENTS FUNCTIONS =============
let itemsAdded = [];

function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    // handle item is already exist
    if (itemsAdded.find((el) => el.title == newToAdd.title)) {
        alert("This Item Is Already Exist!");
        return;
    } else {
        itemsAdded.push(newToAdd);
    }

    // Add product to cart
    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
}

const menuIcon = document.getElementById('menu-icon');
const menu = document.querySelector('.menu');
const menuClose = document.getElementById('menu-close'); // This line is sufficient

menuIcon.addEventListener('click', () => {
    // Toggle the 'active' class to open/close the menu
    menu.classList.toggle('active');
});

menuClose.addEventListener("click", () => {
    menu.classList.remove("active");
});

function handle_openCart() {
    cart.classList.add("active");
}

function handle_openCart() {
    cart.classList.add("active");
}


function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
        (el) =>
            el.title !=
            this.parentElement.querySelector(".cart-product-title").innerHTML
    );

    update();
}

const moonIcon = document.getElementById('moon-icon');
const body = document.body;
const darkOverlay = document.getElementById('dark-overlay'); // Get the overlay element
const navContainer = document.querySelector('.nav'); // Get the nav container element

moonIcon.addEventListener('click', () => {
    body.classList.toggle('dark-mode'); 
    navContainer.classList.toggle('dark-mode'); 
    darkOverlay.style.backgroundColor = body.classList.contains('dark-mode') ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)'; 
});


function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value); // to keep it integer

    update();
}

function handle_buyOrder() {
    if (itemsAdded.length <= 0) {
        alert("There is No Order to Place Yet! \nPlease Make an Order first.");
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "";
    alert("Your Order is Placed Successfully");
    itemsAdded = [];

    update();
}

// =========== UPDATE & RERENDER FUNCTIONS =========

function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector(".cart-price");
        let priceText = priceElement.innerHTML.replace("₦", "").replace(/,/g, "").trim(); // Remove ₦ and commas
        let price = parseFloat(priceText); // Parse as a float
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    // Format and display total price in Nigerian Naira
    totalElement.innerHTML = formatNaira(total);

}

function handle_toggleLike() {
    this.classList.toggle("liked");
}


// Function to format Nigerian Naira
function formatNaira(amount) {
    return amount.toLocaleString("en-NG", { style: "currency", currency: "NGN" });
}

// ============= HTML COMPONENTS =============
function CartBoxComponent(title, price, imgSrc) {
    return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div> <!-- No ₦ symbol here -->
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- REMOVE CART  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}
