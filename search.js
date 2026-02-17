// Sample product data for search
const allProducts = [
    // Electronics from script.js
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        image: "https://placehold.co/300x300",
        category: "Electronics"
    },
    {
        id: 2,
        name: "Smartphone Case",
        price: 19.99,
        image: "https://placehold.co/300x300",
        category: "Electronics"
    },
    {
        id: 3,
        name: "Fitness Tracker Watch",
        price: 49.99,
        image: "https://placehold.co/300x300",
        category: "Electronics"
    },
    {
        id: 4,
        name: "Portable Power Bank",
        price: 29.99,
        image: "https://placehold.co/300x300",
        category: "Electronics"
    },
    {
        id: 12,
        name: "Bluetooth Speaker",
        price: 59.99,
        image: "https://placehold.co/300x300",
        category: "Electronics"
    },
    {
        id: 13,
        name: "Gaming Laptop",
        price: 1299.99,
        image: "https://placehold.co/300x300",
        category: "Electronics"
    },
    {
        id: 14,
        name: "Smartphone Pro",
        price: 899.99,
        image: "https://placehold.co/300x300",
        category: "Electronics"
    },
    {
        id: 15,
        name: "Wireless Earbuds",
        price: 129.99,
        image: "https://placehold.co/300x300",
        category: "Electronics"
    },
    {
        id: 16,
        name: "Tablet HD",
        price: 349.99,
        image: "https://placehold.co/300x300",
        category: "Electronics"
    },
    {
        id: 17,
        name: "Smart Watch Series 5",
        price: 299.99,
        image: "https://placehold.co/300x300",
        category: "Electronics"
    },
    {
        id: 18,
        name: "External SSD 1TB",
        price: 149.99,
        image: "https://placehold.co/300x300",
        category: "Electronics"
    },
    {
        id: 19,
        name: "4K Ultra HD Smart TV",
        price: 799.99,
        image: "https://placehold.co/300x300",
        category: "Electronics"
    },
    
    // From category.js
    {
        id: 5,
        name: "Coffee Maker",
        price: 89.99,
        image: "https://placehold.co/300x300",
        category: "Home & Kitchen"
    },
    {
        id: 6,
        name: "Desk Lamp",
        price: 24.99,
        image: "https://placehold.co/300x300",
        category: "Home & Kitchen"
    },
    {
        id: 7,
        name: "Backpack",
        price: 39.99,
        image: "https://placehold.co/300x300",
        category: "Clothing"
    },
    {
        id: 8,
        name: "Water Bottle",
        price: 14.99,
        image: "https://placehold.co/300x300",
        category: "Home & Kitchen"
    },
    {
        id: 9,
        name: "Novel Book",
        price: 12.99,
        image: "https://placehold.co/300x300",
        category: "Books"
    },
    {
        id: 10,
        name: "T-Shirt",
        price: 19.99,
        image: "https://placehold.co/300x300",
        category: "Clothing"
    },
    {
        id: 11,
        name: "Cookbook",
        price: 24.99,
        image: "https://placehold.co/300x300",
        category: "Books"
    },
    
    // Additional products
    {
        id: 20,
        name: "Jeans",
        price: 49.99,
        image: "https://placehold.co/300x300",
        category: "Clothing"
    },
    {
        id: 21,
        name: "Running Shoes",
        price: 89.99,
        image: "https://placehold.co/300x300",
        category: "Clothing"
    },
    {
        id: 22,
        name: "Blender",
        price: 39.99,
        image: "https://placehold.co/300x300",
        category: "Home & Kitchen"
    },
    {
        id: 23,
        name: "Science Fiction Novel",
        price: 14.99,
        image: "https://placehold.co/300x300",
        category: "Books"
    },
    {
        id: 24,
        name: "Biography",
        price: 19.99,
        image: "https://placehold.co/300x300",
        category: "Books"
    }
];

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

// Shopping cart array
let cart = [];

// DOM Elements
const searchResultsGrid = document.getElementById('search-results-grid');
const resultsCount = document.getElementById('results-count');
const searchTermDisplay = document.getElementById('search-term-display');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const priceSlider = document.getElementById('price-slider');
const priceValue = document.getElementById('price-value');
const sortSelect = document.getElementById('sort-select');

// Get search term from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('q') || '';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateAccountLink();
    initMobileMenu();
    
    // If there's a search term, perform the search
    if (searchTerm) {
        performSearch(searchTerm);
    }
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

// Set up event listeners
function setupEventListeners() {
    // Search input
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const term = this.value.trim();
                if (term !== '') {
                    performSearch(term);
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
    
    // Search button
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const term = searchInput.value.trim();
            if (term !== '') {
                performSearch(term);
                clearSuggestions();
            }
        });
    }
    
    // Price slider
    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            priceValue.textContent = this.value;
            // In a real app, you would filter products here
        });
    }
    
    // Sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // In a real app, you would sort products here
            showNotification(`Sorted by: ${this.value}`);
        });
    }
}

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
        searchInput.parentNode.style.position = 'relative';
        searchInput.parentNode.appendChild(suggestionsContainer);
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
            if (searchInput) {
                searchInput.value = match;
                performSearch(match);
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

// Perform search
function performSearch(term) {
    // Update search input value
    if (searchInput) {
        searchInput.value = term;
    }
    
    // Update display elements
    if (searchTermDisplay) {
        searchTermDisplay.textContent = term;
    }
    
    // Filter products
    const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
    );
    
    // Update results count
    if (resultsCount) {
        resultsCount.textContent = `Showing ${filteredProducts.length} results for "${term}"`;
    }
    
    // Render results
    renderSearchResults(filteredProducts);
    
    // Update URL without reloading the page
    const newUrl = `${window.location.pathname}?q=${encodeURIComponent(term)}`;
    window.history.replaceState({}, '', newUrl);
}

// Render search results
function renderSearchResults(products) {
    searchResultsGrid.innerHTML = '';
    
    if (products.length === 0) {
        searchResultsGrid.innerHTML = `
            <div class="no-results">
                <h3>No products found</h3>
                <p>Try adjusting your search term or browse our categories</p>
                <a href="category.html" class="btn-primary">Browse Categories</a>
            </div>
        `;
        return;
    }
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn-add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn-wishlist" onclick="addToWishlist(${product.id})">
                        <i class="fas fa-heart"></i> Wishlist
                    </button>
                </div>
            </div>
        `;
        searchResultsGrid.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    
    if (product) {
        // Add to cart in localStorage
        let cart = JSON.parse(localStorage.getItem('shopEasyCart') || '[]');
        cart.push({...product});
        localStorage.setItem('shopEasyCart', JSON.stringify(cart));
        
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

// Add product to wishlist
function addToWishlist(productId) {
    const product = allProducts.find(p => p.id === productId);
    
    if (product) {
        // Add to wishlist in localStorage
        let wishlist = JSON.parse(localStorage.getItem('shopEasyWishlist') || '[]');
        wishlist.push({...product});
        localStorage.setItem('shopEasyWishlist', JSON.stringify(wishlist));
        
        showNotification(`${product.name} added to wishlist!`);
    }
}

// Update cart count display
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    const cart = JSON.parse(localStorage.getItem('shopEasyCart') || '[]');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
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