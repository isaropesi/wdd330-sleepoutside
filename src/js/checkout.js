import { loadHeaderFooter, alertMessage } from './utils.mjs';
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

    // Check form validity
    const chk_status = form.checkValidity();
    form.reportValidity();

    // Only proceed if form is valid
    if (!chk_status) {
        return;
    }

    try {
        const response = await checkout.checkout(form);
        console.log('Checkout response:', response);
        // Clear the cart after successful checkout
        localStorage.removeItem('so-cart');
        // Redirect to success page
        window.location.href = '/checkout/success.html';
    } catch (error) {
        console.error('Checkout failed:', error);
        // Display detailed error message from server
        let errorMessage = 'There was an error processing your order. Please try again.';

        if (error.message && typeof error.message === 'object') {
            // Server returned detailed error information
            errorMessage = '';
            for (let key in error.message) {
                errorMessage += `${key}: ${error.message[key]}\n`;
            }
        } else if (error.message) {
            errorMessage = error.message;
        }

        alertMessage(errorMessage);
    }
});
