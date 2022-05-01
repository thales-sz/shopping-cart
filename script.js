const itemsSection = document.querySelector('.items');
const cartItem = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// função para remover o item do carrinho de compras 
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
  saveCartItems(obj, 'remove');
  cartItem.removeChild(event.target);
}

// função para criar o item a ser inserido no carrinho de compras
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// função que faz a requisição do item pelo ID e adiciona no carrinho (Função do evento de click do botão).
const call2 = async (e) => {
  const item = await fetchItem(e.target.parentNode.firstChild.innerText);
  const obj = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  const itemFinal = createCartItemElement(obj);
  cartItem.appendChild(itemFinal);
  saveCartItems(obj, 'add'); 
};

// função para criar os elementos
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

// função para criar cada item da lista de produtos 
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

window.onload = async (e) => { 
  await e.preventDefault();
  await getSavedCartItems(createCartItemElement);
};
