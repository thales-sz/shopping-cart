const fetchProducts = async (valor = undefined) => {
  const QUERY = valor;
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;

  if (url.endsWith('undefined')) {
    throw new Error('You must provide an url');
  }
  const response = await fetch(url);
  const result = await response.json();
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
