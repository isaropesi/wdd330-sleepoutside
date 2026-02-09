import { setLocalStorage, getLocalStorage, updateCartCount, alertMessage } from './utils.mjs';

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // once we have the product details we can render out the HTML
        this.renderProductDetails('main');
        // once the HTML is rendered we can add a listener to the Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that in the callback function.
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));
    }
    addToCart() {
        let cart = getLocalStorage('so-cart');
        if (!Array.isArray(cart)) {
            cart = [];
        }
        cart.push(this.product);
        setLocalStorage('so-cart', cart);
        updateCartCount();
        // Show success message
        alertMessage(`${this.product.Name} has been added to your cart!`, false);
    }
    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.querySelector('#productName').innerText = this.product.Brand.Name;
        element.querySelector('#productNameWithoutBrand').innerText =
            this.product.NameWithoutBrand;
        element.querySelector('#productImage').src = this.product.Images.PrimaryLarge;
        element.querySelector('#productImage').alt = this.product.Name;
        element.querySelector('#productFinalPrice').innerText =
            '$' + this.product.FinalPrice;
        element.querySelector('#productColorName').innerText =
            this.product.Colors[0].ColorName;
        element.querySelector('#productDescriptionHtmlSimple').innerHTML =
            this.product.DescriptionHtmlSimple;
        element.querySelector('#addToCart').dataset.id = this.product.Id;
    }
}
