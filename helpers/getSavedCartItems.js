const cartI = document.querySelector('.cart__items');

const getSavedCartItems = (func) => {
  let cartItems = localStorage.getItem('cartItems');
  cartItems = cartItems.split('}');
  cartItems.length -= 1;
  cartItems.forEach((item) => {
    let aux = item;
    aux += '}';
    console.log(aux);
    cartI.appendChild(func(JSON.parse(aux)));
  });
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
