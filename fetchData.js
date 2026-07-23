let cardProduct = "";

// This was missing — fetchingData was used below but never defined.
const fetchingData = fetch("https://fakestoreapi.com/products").then((res) =>
  res.json(),
);

fetchingData.then((products) => {
  // Map product from API
  products.map(({ image, price, title, category, rating }) => {
    cardProduct += `
        <div class="card-3d">
            <div class="card-inner h-[520px] bg-gray-50 border border-gray-200 rounded-2xl shadow-xl overflow-hidden p-6 flex flex-col justify-between">

                <!-- Header -->
                <div class="flex justify-between items-start">
                    <span class="text-xs font-semibold bg-black text-white px-3 py-1 rounded-full">
                        PREMIUM
                    </span>

                    <button class="text-gray-500 hover:text-black transition">
                        
                    </button>
                </div>

                <!-- Product Image -->
                <div class="flex justify-center my-4">
                    <img
                        src="${image}"
                        alt="${title}"
                        class="product-image w-48 h-48 object-contain"
                    />
                </div>

                <!-- Product Info -->
                <div>
                    <h3 class="text-xl font-bold mb-1">${title}</h3>

                    <p class="text-gray-600 text-sm mb-2">
                        ${category}
                    </p>

                    <!-- Ratings -->
                    <div class="flex items-center space-x-2 mb-3">

                        <div class="flex text-yellow-400">
                            ⭐⭐⭐⭐☆
                        </div>

                        <span class="text-gray-500 text-sm">
                            ${rating.rate} (${rating.count} Reviews)
                        </span>

                    </div>

                    <!-- Price -->
                    <div class="flex justify-between items-center mb-4">
                        <div class="text-lg font-semibold text-red-500">
                            $${price}
                            <span class="line-through text-gray-400 text-sm">
                                $399
                            </span>
                        </div>

                        <span class="bg-black text-white text-xs px-2 py-1 rounded-full">
                            25% OFF
                        </span>
                    </div>

                    <!-- Buttons -->
                    <div class="flex space-x-3">
                        <button class="btn-3d flex-1 bg-black text-white py-2 rounded-xl font-semibold">
                            Add to Cart
                        </button>

                        <button class="btn-3d px-4 py-2 border border-black rounded-xl">
                            
                        </button>
                    </div>

                </div>
            </div>
        </div>
        `;
  });

  // Create DOM
  document.getElementById("card-container").innerHTML = cardProduct;
});
