# WDD 330 Personal Development

**Name:** Isabella Silva

## Course Outcomes
The following are the course outcomes of WDD 330:
1. Become more efficient at applying your innate curiosity and creativity.
2. Become more dexterous at exploring your environment.
3. Become a person who enjoys helping and learning from others.
4. Use a divide and conquer approach to design solutions for programming problems.
5. Finding and troubleshooting bugs you and others will have in the code you write.
6. Developing and debugging HTML, CSS, and JavaScript programs that use medium complexity web technologies.

## Personal Development Outcomes

| Outcome | Rating (0-3) | Week # | Description of Example |
| :--- | :---: | :---: | :--- |
| **Become more efficient at applying your innate curiosity and creativity.** | 3 | Week 02 | I was curious about how to make my rendering logic more reusable. Instead of writing a specific loop inside my `ProductList` class, I researched and implemented a generic `renderListWithTemplate` function in `utils.mjs` that can accept any template function and list of data, making my code much cleaner and reusable for future components. |
| | | Week 03 | I went beyond the required tasks to implement a real-time "Cart Count Badge" in the header. I used CSS absolute positioning and a dynamic `updateCartCount` utility, and I even designed custom SVGs for the home page categories to give the site a more premium, branded feel. |
| | | Week 04 | I wanted to improve the user experience during checkout errors. Instead of default browser alerts, I created a custom, reusable `alertMessage` utility function that dynamically injects styled, dismissible alerts into the page. This required creative DOM manipulation and CSS styling to ensure it looked professional and didn't disrupt the layout. |
| **Become more dexterous at exploring your environment.** | 3 | Week 02 | I had to explore the Vite build configuration (`vite.config.js`) to support our new dynamic routing structure. I learned how to configure the `rollupOptions` input to handle multiple entry points and discovered that I needed to move my static JSON and image assets to a public/ directory so Vite would serve them correctly in the final build. |
| | | Week 03 | I explored the use of environment variables in Vite (`.env`) to securely manage the API server URL. I also had to quickly adapt to the external API's data structure (like the nested `Images.PrimaryLarge` object) which was different from our initial local JSON files. |
| | | Week 04 | I dove deep into HTML5 Constraint Validation API. I learned how to use `checkValidity()` and `reportValidity()` alongside `pattern` attributes for complex fields like credit cards and zip codes. I also learned how to inspect and handle structured error responses from the backend API (e.g. 400 Bad Request with specific field errors). |
| **Become a person who enjoys helping and learning from others.** | 3 | Week 02 | When implementing the "Cart Total" feature, I made sure to implement it in a separate branch (`is--cart-total`) and keep the logic modular in `cart.js`. This "divide and conquer" structure makes it much easier for my teammates to review my Pull Request and merge it without conflicts, rather than dumping all changes into one file or branch. |
| | | Week 03 | During the refactoring of `ProductData.mjs`, I converted the entire class to work with the external API instead of local files. I ensured the methods used clean async/await patterns so that when my teammates pull my changes, their own components will work seamlessly with the live data. |
| | | Week 04 | As the driver for the Checkout implementation, I coordinated the refactoring of `ProductData` to `ExternalServices`. I made sure to update all imports across the codebase so that my team's work wouldn't break. I also implemented a robust `CheckoutProcess` module that my teammates can easily extend if needed. |
| **Use a divide and conquer approach to design solutions for programming problems.** | 3 | Week 02 | For the Dynamic Product List requirements, I broke the problem down into four distinct steps: 1) Create the HTML template literal function, 2) Build the `ProductList` class to manage data fetching, 3) Create a utility to inject the HTML, and 4) Initialize it in `main.js`. Tackling these one by one made a complex refactor very manageable. |
| | | Week 03 | To implement the "Remove from Cart" feature, I broke it into three manageable steps: 1) Enhancing the cart template with a dynamic "X" button, 2) Writing the `removeFromCart` logic to splice the local storage array, and 3) Using event delegation to update the UI without a page refresh. |
| | | Week 04 | For the Checkout feature, I separated concerns strictly: `CheckoutProcess.mjs` handles business logic and calculations, `ExternalServices.mjs` handles API communication, and `checkout.js` handles UI events and validation. This modular approach made debugging the order total calculations much easier than having one giant script. |
| **Finding and troubleshooting bugs you and others will have in the code you write.** | 3 | Week 02 | While working on the Cart Total feature, I anticipated a potential bug where the page might crash if the cart was empty or the local storage key didn't exist. I specifically added a check `if (cartItems && cartItems.length > 0)` and an else block to handle the empty state gracefully by hiding the total and displaying a friendly message. |
| | | Week 03 | I discovered and fixed a pathing bug where product detail links were broken on the new category pages. I realized that relative paths like `product_pages/index.html` were trying to look inside the product_listing folder. I fixed this by implementing absolute paths (`/product_pages/index.html`) to ensure links work from any level of the site. |
| | | Week 04 | During testing, I found a bug where shipping was calculated based on unique items rather than total quantity (e.g. 2 identical tents only charged shipping for 1 item). I troubleshooted this by logging the cart array and fixed it by implementing a `reduce` function to calculate the total item count correctly before applying shipping rules. |
