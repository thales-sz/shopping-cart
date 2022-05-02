let storageValue = '';
const saveCartItems = (cartItem, value) => {
  if (value === 'add') {
    storageValue += `${JSON.stringify(cartItem)}`;
    localStorage.setItem('cartItems', storageValue);
  } if (value === 'remove') {
    let newStorage = localStorage.getItem('cartItems');
    const remover = JSON.stringify(cartItem);
    newStorage = newStorage.replace(remover, '');
    storageValue = newStorage;
    localStorage.setItem('cartItems', newStorage);
  } 
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
