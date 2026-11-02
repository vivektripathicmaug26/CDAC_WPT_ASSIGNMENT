let menu = [
    {id: 1, name: "Masala Chai", price: 30},
    {id: 2, name: "Cold Coffee", price: 80},
    {id: 3, name: "Grilled Sandwich", price: 100},
    {id: 4, name: "Study Combo", price: 120},
    {id: 5, name: "Chocolate Muffin", price: 60}
];
let cart = [];
let placingOrder = false;

// Build menu options using the item data.
function loadMenu() {
    let select = document.getElementById("menu-item");
    for (let item of menu) {
        let option = document.createElement("option");
        option.setAttribute("value", item.id);
        option.textContent = item.name + " - Rs. " + item.price;
        select.appendChild(option);
    }
}

// Add a selected item with a positive whole-number quantity.
function addToOrder() {
    if (placingOrder) return;
    let id = parseInt(document.getElementById("menu-item").value);
    let input = document.getElementById("quantity").value.trim();
    let quantity = parseInt(input);
    let error = document.getElementById("error");
    if (!/^[0-9]+$/.test(input) || !Number.isSafeInteger(quantity) || quantity <= 0) {
        error.textContent = "Please enter a positive whole-number quantity.";
        return;
    }
    error.textContent = "";
    document.getElementById("order-message").textContent = "";
    for (let item of menu) {
        if (item.id == id) {
            cart.push({id: item.id, name: item.name, price: item.price, quantity: quantity});
            break;
        }
    }
    showOrder();
}

// Rebuild the order list and connect each Remove button.
function showOrder() {
    let list = document.getElementById("order-list");
    list.innerHTML = "";
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let line = document.createElement("li");
        line.textContent = item.name + " x " + item.quantity + " = Rs. " + item.price * item.quantity;
        let button = document.createElement("button");
        button.textContent = "Remove";
        button.onclick = function() {
            if (placingOrder) return;
            cart.splice(i, 1);
            line.remove();
            showOrder();
            document.getElementById("order-message").textContent = "";
        };
        line.appendChild(button);
        list.appendChild(line);
    }
    showBill();
}

// Run a supplied callback rule on an amount.
function applyRule(amount, rule) {
    return rule(amount);
}

// Calculate subtotal, discount, delivery and final total.
function showBill() {
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    let discountRate = 0;
    if (subtotal >= 1000) discountRate = 0.15;
    else if (subtotal >= 500) discountRate = 0.10;
    else if (subtotal >= 200) discountRate = 0.05;

    let discount = applyRule(subtotal, function(amount) {
        return amount * discountRate;
    });
    let delivery = 0;
    let area = document.getElementById("delivery-area").value;
    switch (area) {
        case "pickup": delivery = 0; break;
        case "nearby": delivery = 20; break;
        case "city": delivery = 50; break;
        default: delivery = 0;
    }
    if (cart.length == 0) delivery = 0;
    let total = applyRule(subtotal, amount => amount - discount + delivery);
    let itemText = quantity == 1 ? "1 item" : quantity + " items";
    document.getElementById("item-count").textContent = itemText;
    document.getElementById("bill").textContent = `Subtotal: Rs. ${subtotal.toFixed(2)}
Discount (${discountRate * 100}%): Rs. ${discount.toFixed(2)}
Delivery: Rs. ${delivery.toFixed(2)}
Final Total: Rs. ${total.toFixed(2)}`;
}

// Simulate a server placing an order after two seconds.
function submitOrder() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (cart.length == 0) reject(new Error("Your cart is empty. Add an item first."));
            else resolve("CC" + Date.now());
        }, 2000);
    });
}

// Handle the order promise and display its result.
async function placeOrder() {
    if (placingOrder) return;
    placingOrder = true;
    let button = document.getElementById("place-button");
    let message = document.getElementById("order-message");
    button.disabled = true;
    message.textContent = "Placing your order...";
    try {
        let number = await submitOrder();
        message.textContent = "Demo order placed! Order number: " + number;
        cart = [];
        showOrder();
    } catch (error) {
        message.textContent = error.message;
    } finally {
        placingOrder = false;
        button.disabled = false;
    }
}

// Display a special offer three seconds after the page loads.
function showOffer() {
    document.getElementById("offer").style.display = "block";
}

loadMenu();
showBill();
setTimeout(showOffer, 3000);
