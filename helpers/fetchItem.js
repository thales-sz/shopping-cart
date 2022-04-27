const fetchItem = async (id = undefined) => {
  const ItemID = id;
  const url = `https://api.mercadolibre.com/items/${ItemID}`;

  if (url.endsWith('undefined')) {
    throw new Error('You must provide an url');
  }
  const request = await fetch(url);
  const result = await request.json();
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
