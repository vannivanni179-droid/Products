/**
 * fetchData.js
 * Responsible only for talking to the API and returning parsed JSON.
 * Rendering logic lives in productDitial.js.
 */

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";

/**
 * Fetches the product list.
 * @returns {Promise<Array>} resolves to an array of product objects,
 *          or rejects with an Error if the request/parse fails.
 */
function fetchProducts() {
  return fetch(PRODUCTS_API_URL).then((res) => {
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    return res.json();
  });
}
