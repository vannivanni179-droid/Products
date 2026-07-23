/**
 * productDitial.js
 * Consumes fetchProducts() from fetchData.js and renders product cards.
 */

function buildStars(rate) {
  const fullStars = Math.round(rate);
  const filled = "⭐".repeat(Math.max(0, Math.min(5, fullStars)));
  const empty = "☆".repeat(5 - Math.max(0, Math.min(5, fullStars)));
  return filled + empty;
}

function buildCard({ image, price, title, category, rating }, index) {
  const stars = buildStars(rating?.rate ?? 0);
  const originalPrice = (price * 1.25).toFixed(2);

  return `
    <div class="product-card cursor-pointer h-[520px] bg-gray-50 border border-gray-200 rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden p-6 flex flex-col justify-between transition-shadow duration-300" data-index="${index}">

            <!-- Header -->
            <div class="flex justify-between items-start">
                <span class="text-xs font-semibold bg-black text-white px-3 py-1 rounded-full">
                    PREMIUM
                </span>

                <button class="wishlist-btn text-gray-500 hover:text-black transition" aria-label="Add to wishlist" title="Add to wishlist">
                    ♡
                </button>
            </div>

            <!-- Product Image -->
            <div class="flex justify-center my-4">
                <img
                    src="${image}"
                    alt="${title}"
                    class="w-48 h-48 object-contain hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
            </div>

            <!-- Product Info -->
            <div>
                <h3 class="text-xl font-bold mb-1 line-clamp-2">${title}</h3>

                <p class="text-gray-600 text-sm mb-2 capitalize">
                    ${category}
                </p>

                <!-- Ratings -->
                <div class="flex items-center space-x-2 mb-3">
                    <div class="flex text-yellow-400">
                        ${stars}
                    </div>
                    <span class="text-gray-500 text-sm">
                        ${rating?.rate ?? "N/A"} (${rating?.count ?? 0} Reviews)
                    </span>
                </div>

                <!-- Price -->
                <div class="flex justify-between items-center mb-4">
                    <div class="text-lg font-semibold text-blue-700">
                        $${price}
                        <span class="line-through text-gray-400 text-sm">
                            $${originalPrice}
                        </span>
                    </div>

                    <span class="bg-blue text-white text-xs px-2 py-1 rounded-full">
                        25% OFF
                    </span>
                </div>

                <!-- Buttons -->
                <div class="flex space-x-3">
                    <button class="add-to-cart-btn flex-1 bg-black text-white py-2 rounded-xl font-semibold hover:opacity-85 active:scale-95 transition">
                        Add to Cart
                    </button>

                    <button class="view-detail-btn px-4 py-2 border border-black rounded-xl hover:opacity-85 active:scale-95 transition" aria-label="View details" title="View details">
                        🔍
                    </button>
                </div>

            </div>
        </div>
    `;
}

// Keep the last-fetched products around so the modal can look one up by index
// without re-fetching.
let currentProducts = [];

function renderProducts(products) {
  currentProducts = products;
  const container = document.getElementById("card-container");
  container.innerHTML = products.map(buildCard).join("");
}

function renderError(message) {
  const container = document.getElementById("card-container");
  container.innerHTML = `
    <p class="col-span-full text-center text-blue-700">
      Couldn't load products: ${message}. Please try again later.
    </p>
  `;
}

function buildModalBody({ image, price, title, category, description, rating }) {
  const stars = buildStars(rating?.rate ?? 0);
  const originalPrice = (price * 1.25).toFixed(2);

  return `
    <img src="${image}" alt="${title}" class="w-full sm:w-56 h-56 object-contain flex-shrink-0" />
    <div class="flex flex-col">
      <span class="text-xs font-semibold bg-black text-white px-3 py-1 rounded-full w-fit mb-2">
        PREMIUM
      </span>
      <h2 class="text-2xl font-bold mb-1">${title}</h2>
      <p class="text-gray-600 text-sm mb-2 capitalize">${category}</p>
      <div class="flex items-center space-x-2 mb-3">
        <div class="flex text-yellow-400">${stars}</div>
        <span class="text-gray-500 text-sm">${rating?.rate ?? "N/A"} (${rating?.count ?? 0} Reviews)</span>
      </div>
      <div class="text-lg font-semibold text-blue-700 mb-4">
        $${price}
        <span class="line-through text-gray-400 text-sm">$${originalPrice}</span>
      </div>
      <p class="text-gray-700 text-sm mb-4">${description ?? "No description available."}</p>
      <button class="mt-auto bg-black text-white py-2 rounded-xl font-semibold hover:opacity-85 active:scale-95 transition">
        Add to Cart
      </button>
    </div>
  `;
}

function openModal(index) {
  const product = currentProducts[index];
  if (!product) return;
  document.getElementById("modal-body").innerHTML = buildModalBody(product);
  const modal = document.getElementById("product-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {
  const modal = document.getElementById("product-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

// Event delegation: one listener handles clicks on any current or future card.
document.getElementById("card-container").addEventListener("click", (e) => {
  // Ignore clicks on the wishlist/add-to-cart buttons so they don't also open the modal.
  if (e.target.closest(".wishlist-btn") || e.target.closest(".add-to-cart-btn")) {
    return;
  }
  const card = e.target.closest(".product-card");
  if (card) {
    openModal(Number(card.dataset.index));
  }
});

document.getElementById("modal-close").addEventListener("click", closeModal);

// Click on the dark overlay (outside the white panel) also closes the modal.
document.getElementById("product-modal").addEventListener("click", (e) => {
  if (e.target.id === "product-modal") closeModal();
});

// Escape key closes the modal.
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

fetchProducts()
  .then(renderProducts)
  .catch((err) => renderError(err.message));
