// DOM Elements
const wishlistItems = document.getElementById('wishlist-items');
const cartCountElement = document.querySelector('.cart-count');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadWishlist();
    updateCartCount();
    setupEventListeners();
    updateAccountLink();
});

// Load wishlist from localStorage
function loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('shopEasyWishlist') || '[]');
    
    if (wishlist.length === 0) {
        // Show empty wishlist message
        wishlistItems.innerHTML = `
            <div class="empty-wishlist">
                <i class="fas fa-heart" style="font-size: 60px; color: #e74c3c; margin-bottom: 20px;"></i>
                <h2>Your Wishlist is Empty</h2>
                <p>Save items that you like in your wishlist</p>
                <a href="category.html" class="btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    // Render wishlist items
    renderWishlistItems(wishlist);
}

// Render wishlist items
function renderWishlistItems(items) {
    wishlistItems.innerHTML = '';
    
    const wishlistGrid = document.createElement('div');
    wishlistGrid.className = 'products-grid';
    
    items.forEach((item, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="product-image">
            <div class="product-info">
                <h3>${item.name}</h3>
                <div class="product-price">$${item.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn-add-to-cart" onclick="addToCart(${index})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn-remove-wishlist" onclick="removeFromWishlist(${index})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
        wishlistGrid.appendChild(productCard);
    });
    
    wishlistItems.appendChild(wishlistGrid);
}

// Add item to cart
function addToCart(index) {
    const wishlist = JSON.parse(localStorage.getItem('shopEasyWishlist') || '[]');
    
    if (index >= 0 && index < wishlist.length) {
        const item = wishlist[index];
        
        // Add to cart
        let cart = JSON.parse(localStorage.getItem('shopEasyCart') || '[]');
        cart.push(item);
        localStorage.setItem('shopEasyCart', JSON.stringify(cart));
        
        // Remove from wishlist
        wishlist.splice(index, 1);
        localStorage.setItem('shopEasyWishlist', JSON.stringify(wishlist));
        
        // Update UI
        loadWishlist();
        updateCartCount();
        
        showNotification(`${item.name} added to cart!`);
    }
}

// Remove item from wishlist
function removeFromWishlist(index) {
    const wishlist = JSON.parse(localStorage.getItem('shopEasyWishlist') || '[]');
    
    if (index >= 0 && index < wishlist.length) {
        const item = wishlist[index];
        
        // Remove from wishlist
        wishlist.splice(index, 1);
        localStorage.setItem('shopEasyWishlist', JSON.stringify(wishlist));
        
        // Update UI
        loadWishlist();
        
        showNotification(`${item.name} removed from wishlist!`);
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
function showNotification(message) {
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
        backgroundColor: '#27ae60',
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