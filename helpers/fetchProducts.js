const fetchProducts = async (valor) => {
  try { 
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${valor}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
