import { getLocalStorage } from './utils.mjs';

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process.
    return items.map(item => ({
        id: item.Id,
        name: item.Name,
        price: item.FinalPrice,
        quantity: 1
    }));
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // calculate and display the total dollar amount of the items in the cart, and the number of items.
        const subtotalElement = document.querySelector(`${this.outputSelector} #subtotal`);

        if (this.list && Array.isArray(this.list) && this.list.length > 0) {
            this.itemTotal = this.list.reduce((total, item) => total + (item.FinalPrice || 0), 0);
            subtotalElement.innerText = this.itemTotal.toFixed(2);
        } else {
            subtotalElement.innerText = '0.00';
        }
    }

    calculateOrderTotal() {
        // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
        // Tax: Use 6% sales tax on the subtotal amount.
        this.tax = this.itemTotal * 0.06;

        // Shipping: Use $10 for the first item plus $2 for each additional item after that.
        const itemCount = this.list ? this.list.length : 0;
        if (itemCount > 0) {
            this.shipping = 10 + (itemCount - 1) * 2;
        } else {
            this.shipping = 0;
        }

        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

        tax.innerText = `${this.tax.toFixed(2)}`;
        shipping.innerText = `${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `${this.orderTotal.toFixed(2)}`;
    }

    async checkout(form) {
        // get the form element data by the form name
        const formData = formDataToJSON(form);

        // populate the JSON order object with the order Date, orderTotal, tax, shipping, and list of items
        const orderDate = new Date().toISOString();
        const orderData = {
            ...formData,
            orderDate: orderDate,
            items: packageItems(this.list),
            orderTotal: this.orderTotal.toFixed(2),
            shipping: this.shipping,
            tax: this.tax.toFixed(2)
        };

        console.log('Order data:', orderData);

        // call the checkout method in the ExternalServices module and send it the JSON order data.
        // We'll add this in the next step when we refactor ProductData to ExternalServices
        try {
            // Import ExternalServices dynamically to avoid circular dependencies
            const { default: ExternalServices } = await import('./ExternalServices.mjs');
            const services = new ExternalServices();
            const response = await services.checkout(orderData);
            return response;
        } catch (error) {
            console.error('Checkout error:', error);
            throw error;
        }
    }
}
