// ---------------- Portfolio Navigation ----------------
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
    document.getElementById(targetId).style.display = "block";
  });
});

// Show only the first section at start
document.querySelectorAll("section").forEach((sec, idx) => {
  sec.style.display = idx === 0 ? "block" : "none";
});

// ---------------- To-Do App with LocalStorage ----------------
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    };

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", () => {
  if (taskInput.value.trim()) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskInput.value.trim());
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    loadTasks();
  }
});

loadTasks();

// ---------------- Product Listing ----------------
const products = [
  { name: "Laptop", category: "electronics", price: 800, rating: 4.5 },
  { name: "T-Shirt", category: "clothing", price: 20, rating: 4.0 },
  { name: "Headphones", category: "electronics", price: 100, rating: 4.7 },
  { name: "Novel", category: "books", price: 15, rating: 4.2 },
  { name: "Jacket", category: "clothing", price: 50, rating: 4.3 }
];

const productList = document.getElementById("product-list");
const categoryFilter = document.getElementById("category-filter");
const sortOptions = document.getElementById("sort-options");

function displayProducts(items) {
  productList.innerHTML = "";
  items.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: $${p.price}</p>
      <p>Rating: ${p.rating}</p>
    `;
    productList.appendChild(div);
  });
}

function filterAndSort() {
  let filtered = [...products];
  const category = categoryFilter.value;
  const sort = sortOptions.value;

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(filtered);
}

categoryFilter.addEventListener("change", filterAndSort);
sortOptions.addEventListener("change", filterAndSort);

// Initial display
displayProducts(products);