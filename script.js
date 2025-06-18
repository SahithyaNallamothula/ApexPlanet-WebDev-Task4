document.querySelectorAll('header nav a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.hash).scrollIntoView({ behavior: 'smooth' });
  });
});

const inputField = document.getElementById('todo-input'),
      addBtn = document.getElementById('add-btn'),
      listEl = document.getElementById('todo-list');
let todos = JSON.parse(localStorage.getItem('todos')) || [];
function renderTodos() {
  listEl.innerHTML = '';
  todos.forEach((t,i) => {
    const li = document.createElement('li');
    li.className = t.completed ? 'completed' : '';
    li.innerHTML = `<span>${t.text}</span><div><button onclick="toggle(${i})">✓</button><button onclick="del(${i})">✗</button></div>`;
    listEl.appendChild(li);
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}
window.toggle = i => { todos[i].completed = !todos[i].completed; renderTodos(); };
window.del = i => { todos.splice(i,1); renderTodos(); };
addBtn.onclick = () => {
  const v = inputField.value.trim();
  if (v) { todos.push({ text: v, completed: false }); inputField.value = ''; renderTodos(); }
};
renderTodos();

const products = [
  { name:"Phone", category:"Electronics", price:150000, rating:4.5 },
  { name:"Jeans", category:"Clothing", price:2449, rating:4.2 },
  { name:"Headphones", category:"Electronics", price:2000, rating:4.8 },
  { name:"T‑Shirt", category:"Clothing", price:999, rating:3.9 }
];
const grid = document.getElementById('product-grid'),
      fc = document.getElementById('filter-cat'),
      fp = document.getElementById('filter-price'),
      sd = document.getElementById('sort-by'),
      pd = document.getElementById('price-display');

function renderProducts(list) {
  grid.innerHTML = '';
  list.forEach(p => {
    const d = document.createElement('div');
    d.className = 'card';
    d.innerHTML = `<h4>${p.name}</h4><p>₹${p.price}</p><p>⭐ ${p.rating}</p>`;
    grid.appendChild(d);
  });
}

function updateProducts() {
  let filtered = products.filter(p =>
    (fc.value === 'all' || p.category === fc.value) &&
    p.price <= fp.value
  );
  if (sd.value === 'price-asc') filtered.sort((a,b) => a.price - b.price);
  if (sd.value === 'price-desc') filtered.sort((a,b) => b.price - a.price);
  if (sd.value === 'rating-desc') filtered.sort((a,b) => b.rating - a.rating);
  renderProducts(filtered);
}

[fc, fp, sd].forEach(el => el.addEventListener('input', () => {
  if (el === fp) pd.textContent = el.value;
  updateProducts();
}));
fp.dispatchEvent(new Event('input'));

document.getElementById('contactForm').onsubmit = e => {
  e.preventDefault();
  const nm = name.value.trim(), em = email.value.trim(),
        mg = message.value.trim(),
        status = document.getElementById('formStatus');
  if (nm.length < 5 || mg.length < 40 || !em.includes('@')) {
    status.textContent = "Please enter valid details.";
    status.style.color = "#CC9900";
  } else {
    status.textContent = "Message sent!";
    status.style.color = "#002F6C";
    e.target.reset();
  }
};
