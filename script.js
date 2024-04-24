const buttons = document.querySelectorAll(".categories button");

buttons.forEach((button) => {
  const menBtn = document.getElementById("menBtn");
  menBtn.classList.add("active");

  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");
  });
});

const productsContainer = document.getElementById("productsContainer");
const menBtn = document.getElementById("menBtn");
const womenBtn = document.getElementById("womenBtn");
const kidsBtn = document.getElementById("kidsBtn");

let categoriesData = null;

axios
  .get(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  )
  .then((res) => {
    categoriesData = res.data.categories;
    displayProducts("Men");
  })
  .catch((err) => {
    console.log(err);
  });

function calculateDiscount(price, compareAtPrice) {
  const discount = Math.round((1 - price / compareAtPrice) * 100);
  return discount.toFixed(2);
}

function displayProducts(category) {
  const categoryData = categoriesData.find(
    (cat) => cat.category_name === category
  );

  productsContainer.innerHTML = "";

  categoryData.category_products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");


    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;


    if (product.badge_text !== null) {
      const badge = document.createElement("div");
      badge.classList.add("badge");
      badge.textContent = product.badge_text;

      // Append badge to productDiv
      productDiv.appendChild(badge);
    }

    const titleAndVendorDiv = document.createElement("div");
    titleAndVendorDiv.classList.add("title-and-vendor");

    titleAndVendorDiv.innerHTML = `
        <h3 class='title'>${product.title}</h3>
        <ul class="vendor">
          <li>${product.vendor}</li>
        </ul>
      `;

    productDiv.appendChild(img);
    productDiv.appendChild(titleAndVendorDiv);

    productDiv.innerHTML += `
        <p class="price">${product.price}</p>
        <p class="compare-price">${product.compare_at_price}</p>
        <p class="discount">${calculateDiscount(
          product.price,
          product.compare_at_price
        )}%off</p>
        <button id="addToCartBtn">Add to Cart</button>
      `;

    productsContainer.appendChild(productDiv);
  });
}

menBtn.addEventListener("click", () => displayProducts("Men"));
womenBtn.addEventListener("click", () => displayProducts("Women"));
kidsBtn.addEventListener("click", () => displayProducts("Kids"));
