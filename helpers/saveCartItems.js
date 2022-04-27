let storageValue = '';
const saveCartItems = (cartItem, value) => {
  if (value === 'add') {
    storageValue += `${JSON.stringify(cartItem)}`;
    localStorage.setItem('cartItems', storageValue);
  } if (value === 'remove') {
    const newValue = [];
    const array = cartItem.innerText.split('|');
    array.forEach((item) => {
      newValue.push(item.split(': ')[1]);
    });
    const obj = { 
      sku: newValue[0].replace(' ', ''),
      name: newValue[1],
      salePrice: parseFloat(newValue[2].replace('$', ''), 10),
    };
    console.log(JSON.stringify(obj));
    localStorage.setItem('cartItems', localStorage.getItem('cartItems')
    .replace(JSON.stringify(obj), ''));
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
