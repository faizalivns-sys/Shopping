// DOM Elements
const registerForm = document.getElementById('register-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('reg-email');
const passwordInput = document.getElementById('reg-password');
const confirmPasswordInput = document.getElementById('confirm-password');
const termsCheckbox = document.getElementById('terms');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
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

// Set up event listeners
function setupEventListeners() {
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegistration();
        });
    }
}

// Handle registration form submission
function handleRegistration() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    const termsAccepted = termsCheckbox.checked;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!termsAccepted) {
        showNotification('Please accept the Terms & Conditions and Privacy Policy', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Password validation
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters long', 'error');
        return;
    }
    
    // Confirm password validation
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Simulate registration process
    simulateRegistration(name, email, password);
}

// Simulate registration process
function simulateRegistration(name, email, password) {
    // Show loading state
    const submitButton = registerForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Creating Account...';
    submitButton.disabled = true;
    
    // Simulate API delay
    setTimeout(() => {
        // Check if email already exists (in a real app, this would be an API call)
        const existingUsers = JSON.parse(localStorage.getItem('shopEasyUsers') || '[]');
        const userExists = existingUsers.some(user => user.email === email);
        
        if (userExists) {
            showNotification('An account with this email already exists', 'error');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            return;
        }
        
        // Save user data
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password, // In a real app, this would be hashed
            registeredAt: new Date().toISOString()
        };
        
        existingUsers.push(newUser);
        localStorage.setItem('shopEasyUsers', JSON.stringify(existingUsers));
        
        // Also save as current user (simulate login after registration)
        const currentUser = {
            email: email,
            isLoggedIn: true,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('shopEasyUser', JSON.stringify(currentUser));
        
        // Success
        showNotification('Account created successfully! Redirecting...', 'success');
        
        // Redirect to account page after a short delay
        setTimeout(() => {
            window.location.href = 'account.html';
        }, 1500);
    }, 1500);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: '1000',
        opacity: '0',
        transition: 'opacity 0.3s',
        fontWeight: '500'
    });
    
    // Set colors based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#27ae60';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#3498db';
        notification.style.color = 'white';
    }
    
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
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
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

// Search functionality
const registerSearchInput = document.getElementById('search-input');
const registerSearchButton = document.getElementById('search-button');

if (registerSearchInput) {
    registerSearchInput.addEventListener('keyup', function(e) {
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
    registerSearchInput.addEventListener('blur', function() {
        // Small delay to allow clicks on suggestions
        setTimeout(() => {
            clearSuggestions();
        }, 200);
    });
}

if (registerSearchButton) {
    registerSearchButton.addEventListener('click', function() {
        const searchTerm = registerSearchInput ? registerSearchInput.value.trim() : '';
        if (searchTerm !== '') {
            // Redirect to search results page
            window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
            clearSuggestions();
        }
    });
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
        registerSearchInput.parentNode.style.position = 'relative';
        registerSearchInput.parentNode.appendChild(suggestionsContainer);
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
            if (registerSearchInput) {
                registerSearchInput.value = match;
                // Redirect to search results page
                window.location.href = `search.html?q=${encodeURIComponent(match)}`;
                clearSuggestions();
                registerSearchInput.focus();
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