// DOM Elements
const contactForm = document.getElementById('contactForm');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateCartCount();
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

// Set up event listeners
function setupEventListeners() {
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSubmitContactForm();
        });
    }
    
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

// Handle contact form submission
function handleSubmitContactForm() {
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    showNotification('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
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