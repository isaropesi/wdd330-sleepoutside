import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const checkout = new CheckoutProcess('so-cart', '.order-summary');
checkout.init();

// Listen for zip code input to calculate totals
document.querySelector('#zip').addEventListener('blur', () => {
    checkout.calculateOrderTotal();
});

// Handle form submission
document.querySelector('#checkout-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;

    try {
        const response = await checkout.checkout(form);
        console.log('Checkout response:', response);
        alert('Order submitted successfully!');
        // Clear the cart after successful checkout
        localStorage.removeItem('so-cart');
        // Redirect to home or order confirmation page
        window.location.href = '/';
    } catch (error) {
        console.error('Checkout failed:', error);
        alert('There was an error processing your order. Please try again.');
    }
});
