const itemsSection = document.querySelector('.items');
const cartItem = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartItemClickListener(event) {
  console.log('o evento ta funcionando meu amigo!');
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
  const sku = item.id;
  const name = item.title;
  const salePrice = item.price;
  cartItem.appendChild(createCartItemElement({ sku, name, salePrice }));
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
  const array = await fetchProducts('computador');
  array.results.forEach((product) => {
    const sku = product.id;
    const name = product.title;
    const image = product.thumbnail;
    itemsSection.appendChild(createProductItemElement({ sku, name, image }));
  });
};
call1();

window.onload = () => { };
