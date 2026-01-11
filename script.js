const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search");
const cartCountEl = document.querySelector("#cart-count");

const modal = document.querySelector("#modal");
const modalImg = document.querySelector("#modal-img");
const modalTitle = document.querySelector("#modal-title");
const modalPrice = document.querySelector("#modal-price");
const closeBtn = document.querySelector(".close");
const addCartBtn = document.querySelector(".modal-content button");

let cartItems = [];
let currentProduct = null;

/* 🔥 WORKING IMAGE URLS */
const productList = [
  {
    id: 101,
    name: "Laptop",
    price: 55000,
    category: "electronics",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
  },
  {
  id: 102,
  name: "Earbuds",
  price: 3000,
  category: "electronics",
  img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80"
},
  {
    id: 103,
    name: "Jacket",
    price: 2200,
    category: "fashion",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 104,
    name: "Sneakers",
    price: 4500,
    category: "fashion",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  }
];

/* 🧩 Render Products */
function renderProducts(products) {
  productGrid.innerHTML = products.map(p => `
    <div class="product">
      <img src="${p.img}" alt="${p.name}"
           onerror="this.src='https://via.placeholder.com/300'">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <button class="view-btn" data-id="${p.id}">View</button>
    </div>
  `).join("");
}

/* Initial Load */
renderProducts(productList);

/* 🔍 Search */
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = productList.filter(p =>
    p.name.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

/* 🖱️ Product Click (Event Delegation) */
productGrid.addEventListener("click", e => {
  if (e.target.classList.contains("view-btn")) {
    const id = Number(e.target.dataset.id);
    openModal(id);
  }
});

/* 📦 Open Modal */
function openModal(id) {
  currentProduct = productList.find(p => p.id === id);
  if (!currentProduct) return;

  modalImg.src = currentProduct.img;
  modalTitle.textContent = currentProduct.name;
  modalPrice.textContent = `₹${currentProduct.price}`;
  modal.style.display = "block";
}

/* ❌ Close Modal */
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

/* 🛒 Add To Cart */
addCartBtn.addEventListener("click", () => {
  cartItems.push(currentProduct);
  cartCountEl.textContent = cartItems.length;
  modal.style.display = "none";
});

/* 🧪 Category Filter */
document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.textContent.toLowerCase();
    if (category === "all") {
      renderProducts(productList);
    } else {
      renderProducts(productList.filter(p => p.category === category));
    }
  });
});
