const itemsSection = document.querySelector('.items');
const cartItem = document.querySelector('.cart__items');
const price = document.querySelector('.total-price');
const clearButton = document.querySelector('.empty-cart');
let subtotal = parseInt(localStorage.getItem('valor'), 10);

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function clearCart() {
  saveCartItems('', 'all');
  localStorage.setItem('valor', 0);
  cartItem.innerHTML = '';
  price.innerHTML = 0;
}

const totalPrice = (value, op) => {
  if (Number.isNaN(subtotal)) subtotal = 0;
  if (op === 'sum') {
    subtotal += value.salePrice;
    localStorage.setItem('valor', subtotal);
    price.innerHTML = `${subtotal}`;
  } if (op === 'sub') {
    subtotal -= value.salePrice;
    localStorage.setItem('valor', subtotal);
    price.innerHTML = `${subtotal}`;
  } if (op === '') {
    price.innerHTML = `${localStorage.getItem('valor')}`;
  } 
};

async function cartItemClickListener(event) {
  let id = event.target.innerText.split('|');
  id = id[0].split(':');
  id = id[1].replace(' ', '');
  id = id.replace(' ', '');
  const item = await fetchItem(id);
  const obj = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  totalPrice(obj, 'sub');
  saveCartItems(obj, 'remove');
  cartItem.removeChild(event.target);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const call2 = async (e) => {
  const item = await fetchItem(e.target.parentNode.firstChild.innerText);
  const obj = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  const itemFinal = createCartItemElement(obj);
  cartItem.appendChild(itemFinal);
  totalPrice(obj, 'sum');
  saveCartItems(obj, 'add'); 
};

function createCustomElement(element, className, innerText) {
  if (element === 'button') {
    const e = document.createElement(element);
    e.addEventListener('click', call2);
    e.className = className;
    e.innerText = innerText;
    return e;
  }
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const call1 = async () => {
  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.innerHTML = 'carregando...';
  itemsSection.appendChild(loading);
  const array = await fetchProducts('computador');
  itemsSection.removeChild(loading);
  array.results.forEach((product) => {
    const sku = product.id;
    const name = product.title;
    const image = product.thumbnail;
    itemsSection.appendChild(createProductItemElement({ sku, name, image }));
  });
};
call1();

clearButton.addEventListener('click', clearCart);

window.onload = async (e) => { 
  await e.preventDefault();
  await getSavedCartItems(createCartItemElement);
  totalPrice(subtotal, '');
};
