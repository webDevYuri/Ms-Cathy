document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS = AOS || {}; // Declare AOS if it's not already defined
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Shopping Cart
    let cart = [];
    const cartCount = document.getElementById('cart-count');
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Animate hamburger menu
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('transform'));
        spans[0].classList.toggle('rotate-45');
        spans[0].classList.toggle('translate-y-2');
        spans[1].classList.toggle('opacity-0');
        spans[2].classList.toggle('-rotate-45');
        spans[2].classList.toggle('-translate-y-2');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('transform', 'rotate-45', 'translate-y-2', 'opacity-0', '-rotate-45', '-translate-y-2'));
        });
    });
    
    // Sticky Header and Active Section Indicator
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    
    window.addEventListener('scroll', function() {
        // Sticky header
        if (window.scrollY > 100) {
            header.classList.add('bg-black');
            header.classList.remove('bg-opacity-80');
            header.classList.add('bg-opacity-95');
            header.classList.add('py-2');
            header.classList.remove('py-4');
            header.classList.add('shadow-xl');
        } else {
            header.classList.add('bg-opacity-80');
            header.classList.remove('bg-opacity-95');
            header.classList.add('py-4');
            header.classList.remove('py-2');
            header.classList.remove('shadow-xl');
        }
        
        // Active section indicator
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('nav-active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('nav-active');
            }
        });
    });
    
    // Menu Filtering
    const menuItems = document.querySelectorAll('.menu-item');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(btn => {
                btn.classList.remove('active', 'text-purple-light', 'border-purple-light');
                btn.classList.add('border-transparent');
            });
            
            // Add active class to clicked button
            this.classList.add('active', 'text-purple-light', 'border-purple-light');
            this.classList.remove('border-transparent');
            
            const category = this.getAttribute('data-category');
            
            // Filter menu items with animation
            menuItems.forEach(item => {
                // First hide all items with fade out
                item.classList.add('opacity-0');
                item.classList.add('scale-95');
                
                setTimeout(() => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.classList.remove('opacity-0');
                            item.classList.remove('scale-95');
                        }, 50);
                    } else {
                        item.classList.add('hidden');
                    }
                }, 300);
            });
        });
    });
    
    // Set first tab as active
    tabBtns[0].classList.add('active', 'text-purple-light', 'border-purple-light');
    tabBtns[0].classList.remove('border-transparent');
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('opacity-100', 'translate-x-0');
            testimonial.classList.add('opacity-0', 'translate-x-12');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('bg-purple-light');
        });
        
        // Show current testimonial and activate dot
        testimonials[index].classList.remove('opacity-0', 'translate-x-12');
        testimonials[index].classList.add('opacity-100', 'translate-x-0');
        dots[index].classList.add('bg-purple-light');
        
        currentIndex = index;
    }
    
    // Initialize first testimonial
    showTestimonial(0);
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    // Dot click
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
    
    // Auto slide testimonials
    let testimonialInterval = setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
    
    // Stop auto slide on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', function() {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
        testimonialInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    });
    
    // Reservation Form Submission
    const bookingForm = document.getElementById('bookingForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(function() {
                bookingForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
            }, 1500);
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterSuccess = document.getElementById('newsletterSuccess');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(function() {
                newsletterForm.classList.add('hidden');
                newsletterSuccess.classList.remove('hidden');
            }, 1500);
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible');
            backToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cart Functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartModal = document.getElementById('cartModal');
    const closeCartModal = cartModal.querySelector('.close-modal');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const emptyCartContainer = document.querySelector('.cart-items-container');
    const cartItems = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const serviceChargeElement = document.getElementById('serviceCharge');
    const totalElement = document.getElementById('total');
    const viewCartBtn = document.getElementById('viewCartBtn');
    const continueShoppingBtn = document.getElementById('continueShoppingBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const orderSuccess = document.getElementById('orderSuccess');
    const closeOrderBtn = document.getElementById('closeOrderBtn');
    const orderReference = document.getElementById('orderReference');
    
    // Add to cart
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const id = menuItem.getAttribute('data-id');
            const name = menuItem.getAttribute('data-name');
            const price = parseFloat(menuItem.getAttribute('data-price'));
            
            // Check if item is already in cart
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id,
                    name,
                    price,
                    quantity: 1
                });
            }
            
            // Update cart count
            updateCartCount();
            
            // Show success message
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check mr-2"></i>Added to Order';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
        });
    });
    
    // Update cart count
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
    }
    
    // View cart
    viewCartBtn.addEventListener('click', function() {
        renderCart();
        cartModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    // Close cart modal
    closeCartModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    });
    
    // Close cart modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });
    
    // Continue shopping
    continueShoppingBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    });
    
    // Render cart
    function renderCart() {
        if (cart.length === 0) {
            cartItemsContainer.classList.add('hidden');
            emptyCartContainer.classList.remove('hidden');
            return;
        }
        
        cartItemsContainer.classList.remove('hidden');
        emptyCartContainer.classList.add('hidden');
        
        // Clear cart items
        cartItems.innerHTML = '';
        
        // Add cart items
        cart.forEach(item => {
            const tr = document.createElement('tr');
            tr.classList.add('cart-item', 'border-b', 'border-gray-200');
            
            const subtotal = item.price * item.quantity;
            
            tr.innerHTML = `
                <td class="p-4">
                    <div class="font-medium">${item.name}</div>
                    <div class="text-sm text-gray-500">₱${item.price.toFixed(2)}</div>
                </td>
                <td class="p-4">
                    <div class="quantity-control">
                        <button class="decrease-quantity" data-id="${item.id}"><i class="fas fa-minus"></i></button>
                        <input type="number" value="${item.quantity}" min="1" readonly>
                        <button class="increase-quantity" data-id="${item.id}"><i class="fas fa-plus"></i></button>
                    </div>
                </td>
                <td class="p-4 text-right">₱${item.price.toFixed(2)}</td>
                <td class="p-4 text-right">₱${subtotal.toFixed(2)}</td>
                <td class="p-4 text-center">
                    <button class="remove-item text-red-500 hover:text-red-700" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            cartItems.appendChild(tr);
        });
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.decrease-quantity').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                decreaseQuantity(id);
            });
        });
        
        document.querySelectorAll('.increase-quantity').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                increaseQuantity(id);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                removeItem(id);
            });
        });
        
        // Update totals
        updateTotals();
    }
    
    // Decrease quantity
    function decreaseQuantity(id) {
        const item = cart.find(item => item.id === id);
        
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeItem(id);
            return;
        }
        
        updateCartCount();
        renderCart();
    }
    
    // Increase quantity
    function increaseQuantity(id) {
        const item = cart.find(item => item.id === id);
        item.quantity += 1;
        
        updateCartCount();
        renderCart();
    }
    
    // Remove item
    function removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        
        updateCartCount();
        renderCart();
    }
    
    // Update totals
    function updateTotals() {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const serviceCharge = subtotal * 0.1;
        const total = subtotal + serviceCharge;
        
        subtotalElement.textContent = `₱${subtotal.toFixed(2)}`;
        serviceChargeElement.textContent = `₱${serviceCharge.toFixed(2)}`;
        totalElement.textContent = `₱${total.toFixed(2)}`;
    }
    
    // Checkout
    checkoutBtn.addEventListener('click', function() {
        // Add loading state
        this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
        this.disabled = true;
        
        // Generate random order reference
        const randomRef = Math.floor(100000 + Math.random() * 900000);
        orderReference.textContent = `MS-CATHY-${randomRef}`;
        
        // Simulate checkout
        setTimeout(function() {
            cartItemsContainer.classList.add('hidden');
            orderSuccess.classList.remove('hidden');
            
            // Reset button state
            checkoutBtn.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i>Proceed to Checkout';
            checkoutBtn.disabled = false;
            
            // Clear cart
            cart = [];
            updateCartCount();
        }, 1500);
    });
    
    // Close order success
    closeOrderBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
        
        // Reset cart modal
        setTimeout(function() {
            orderSuccess.classList.add('hidden');
            renderCart();
        }, 500);
    });
});