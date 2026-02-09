import { getLocalStorage, setLocalStorage, loadHeaderFooter, updateCartCount } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  if (Array.isArray(cartItems) && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    // Add event listeners to remove buttons
    document.querySelectorAll('.cart-card__remove').forEach(button => {
      button.onclick = (e) => {
        const idToRemove = e.target.dataset.id;
        removeFromCart(idToRemove);
      };
    });

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + ((item.FinalPrice || 0) * (item.Quantity || 1)), 0);
    document.querySelector('#cart-total-amount').textContent = total.toFixed(2);
    document.querySelector('.cart-footer').classList.remove('hide');
  } else {
    document.querySelector('.product-list').innerHTML =
      '<p>Your cart is empty.</p>';
    document.querySelector('.cart-footer').classList.add('hide');
  }
}

function removeFromCart(id) {
  let cartItems = getLocalStorage('so-cart') || [];
  if (Array.isArray(cartItems)) {
    // Find index of the first item with matching id
    const index = cartItems.findIndex(item => item.Id === id);
    if (index !== -1) {
      cartItems.splice(index, 1);
      setLocalStorage('so-cart', cartItems);
      renderCartContents();
      updateCartCount();
    }
  }
}

function cartItemTemplate(item) {
  const image = item.Images?.PrimaryMedium || '';
  const color = item.Colors?.[0]?.ColorName || 'N/A';

  const newItem = `<li class="cart-card divider">
  <span class="cart-card__remove" data-id="${item.Id}">X</span>
  <a href="#" class="cart-card__image">
    <img
      src="${image}"
      alt="${item.Name || 'Product Image'}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name || 'Product'}</h2>
  </a>
  <p class="cart-card__color">${color}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity}</p>
  <p class="cart-card__price">$${(item.FinalPrice || 0).toFixed(2)}</p>
</li>`;

  return newItem;
}

renderCartContents();
