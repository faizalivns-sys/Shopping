// DOM Elements
const cartItems = document.getElementById('cart-items');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');
const cartCountElement = document.querySelector('.cart-count');

// Tax rate (8%)
const TAX_RATE = 0.08;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartCount();
    setupEventListeners();
    updateAccountLink();
    initMobileMenu();
});

// Initialize mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            
            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('show')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('show');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// Load cart from localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('shopEasyCart') || '[]');
    
    if (cart.length === 0) {
        // Show empty cart message
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart" style="font-size: 60px; color: #3498db; margin-bottom: 20px;"></i>
                <h2>Your Cart is Empty</h2>
                <p>Add some items to your cart</p>
                <a href="category.html" class="btn-primary">Continue Shopping</a>
            </div>
        `;
        updateSummary(0);
        return;
    }
    
    // Render cart items
    renderCartItems(cart);
    updateSummary(calculateTotal(cart));
}

// Render cart items
function renderCartItems(items) {
    cartItems.innerHTML = '';
    
    const cartList = document.createElement('div');
    cartList.className = 'cart-list';
    
    items.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <button class="btn-remove" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        `;
        cartList.appendChild(cartItem);
    });
    
    cartItems.appendChild(cartList);
}

// Calculate total amount
function calculateTotal(items) {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    return { subtotal, tax, total };
}

// Update order summary
function updateSummary(amounts) {
    if (typeof amounts === 'number') {
        // If only total is passed, calculate other values
        const subtotal = amounts / (1 + TAX_RATE);
        const tax = subtotal * TAX_RATE;
        amounts = { subtotal, tax, total: amounts };
    }
    
    if (subtotalElement) subtotalElement.textContent = `$${amounts.subtotal.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `$${amounts.tax.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${amounts.total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('shopEasyCart') || '[]');
    
    if (index >= 0 && index < cart.length) {
        const item = cart[index];
        
        // Remove from cart
        cart.splice(index, 1);
        localStorage.setItem('shopEasyCart', JSON.stringify(cart));
        
        // Update UI
        loadCart();
        updateCartCount();
        
        showNotification(`${item.name} removed from cart!`);
    }
}

// Update cart count display
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('shopEasyCart') || '[]');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Set up event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm !== '') {
                    // Redirect to search results page
                    window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
                }
            } else {
                // Show search suggestions
                showSuggestions(this.value);
            }
        });
        
        // Clear suggestions when focus is lost
        searchInput.addEventListener('blur', function() {
            // Small delay to allow clicks on suggestions
            setTimeout(() => {
                clearSuggestions();
            }, 200);
        });
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput ? searchInput.value.trim() : '';
            if (searchTerm !== '') {
                // Redirect to search results page
                window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
                clearSuggestions();
            }
        });
    }
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cart = JSON.parse(localStorage.getItem('shopEasyCart') || '[]');
            if (cart.length > 0) {
                showNotification('Proceeding to checkout...');
                // In a real app, this would redirect to a checkout page
                setTimeout(() => {
                    alert('In a real application, this would redirect to a secure checkout page.');
                }, 1000);
            } else {
                showNotification('Your cart is empty!', 'error');
            }
        });
    }
}

// Product names for search suggestions
const productNames = [
    "Wireless Bluetooth Headphones",
    "Smartphone Case",
    "Fitness Tracker Watch",
    "Portable Power Bank",
    "Coffee Maker",
    "Desk Lamp",
    "Backpack",
    "Water Bottle",
    "Novel Book",
    "T-Shirt",
    "Cookbook",
    "Bluetooth Speaker",
    "Gaming Laptop",
    "Smartphone Pro",
    "Wireless Earbuds",
    "Tablet HD",
    "Smart Watch Series 5",
    "External SSD 1TB",
    "4K Ultra HD Smart TV",
    "Jeans",
    "Running Shoes",
    "Blender",
    "Science Fiction Novel",
    "Biography",
    "Digital Camera",
    "Wireless Mouse",
    "Mechanical Keyboard",
    "Noise Cancelling Headphones",
    "Smart Home Hub",
    "Robot Vacuum Cleaner",
    "Electric Kettle",
    "Yoga Mat",
    "Fitness Dumbbells",
    "Winter Jacket",
    "Sunglasses",
    "Leather Wallet",
    "Smart Thermostat",
    "Air Purifier",
    "Electric Toothbrush",
    "Wireless Charger",
    "Action Camera",
    "Gaming Console",
    "Wireless Gaming Mouse",
    "Mechanical Gaming Keyboard",
    "USB-C Hub",
    "Smartphone Tripod",
    "Bluetooth Car Kit",
    "Smart Door Lock",
    "VR Headset",
    "Drone with Camera",
    "Instant Pot",
    "Espresso Machine",
    "Food Dehydrator",
    "Air Fryer",
    "Stand Mixer",
    "Yoga Blocks",
    "Resistance Bands",
    "Dumbbell Set",
    "Treadmill",
    "Exercise Bike"
];

// Show search suggestions
function showSuggestions(term) {
    if (!term.trim()) {
        clearSuggestions();
        return;
    }
    
    // Find matching product names
    const matches = productNames.filter(name => 
        name.toLowerCase().includes(term.toLowerCase())
    ).slice(0, 8); // Increased to 8 suggestions
    
    if (matches.length === 0) {
        clearSuggestions();
        return;
    }
    
    // Create or update suggestions container
    let suggestionsContainer = document.getElementById('search-suggestions');
    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.id = 'search-suggestions';
        suggestionsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
            max-height: 300px;
            overflow-y: auto;
        `;
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.parentNode.style.position = 'relative';
            searchInput.parentNode.appendChild(suggestionsContainer);
        }
    }
    
    // Populate suggestions
    suggestionsContainer.innerHTML = '';
    matches.forEach((match, index) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.innerHTML = `
            <div style="display: flex; align-items: center; padding: 12px 15px; cursor: pointer; border-bottom: 1px solid #eee; transition: background-color 0.2s;">
                <div style="margin-right: 10px; color: #e74c3c;">
                    <i class="fas fa-search"></i>
                </div>
                <div>
                    <div style="font-weight: 500;">${match}</div>
                    <div style="font-size: 12px; color: #7f8c8d;">Product</div>
                </div>
            </div>
        `;
        
        // Hover effect
        suggestionItem.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
        });
        
        suggestionItem.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'white';
        });
        
        // Click to search
        suggestionItem.addEventListener('click', function() {
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = match;
                // Redirect to search results page
                window.location.href = `search.html?q=${encodeURIComponent(match)}`;
                clearSuggestions();
                searchInput.focus();
            }
        });
        
        suggestionsContainer.appendChild(suggestionItem);
    });
}

// Clear search suggestions
function clearSuggestions() {
    const suggestionsContainer = document.getElementById('search-suggestions');
    if (suggestionsContainer) {
        suggestionsContainer.remove();
    }
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: type === 'error' ? '#e74c3c' : '#27ae60',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: '1000',
        opacity: '0',
        transition: 'opacity 0.3s'
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Update account link based on login status
function updateAccountLink() {
    const accountLink = document.getElementById('account-link');
    const accountText = document.getElementById('account-text');
    
    if (accountLink && accountText) {
        const userData = localStorage.getItem('shopEasyUser');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                if (user.isLoggedIn) {
                    accountLink.href = 'account.html';
                    accountText.textContent = 'My Account';
                } else {
                    accountLink.href = 'login.html';
                    accountText.textContent = 'Account';
                }
            } catch (e) {
                accountLink.href = 'login.html';
                accountText.textContent = 'Account';
            }
        } else {
            accountLink.href = 'login.html';
            accountText.textContent = 'Account';
        }
    }
}