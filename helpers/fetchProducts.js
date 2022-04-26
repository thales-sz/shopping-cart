const fetchProducts = async (valor) => {
  const QUERY = valor;
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  const response = await fetch(url);
  const result = await response.json();
  return result.results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
