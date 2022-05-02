require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica se fecthProducts é uma função', () => {
    const expected = 'function';
    expect(typeof fetchProducts).toBe(expected);
  });
  it('Verifica se ao executar fecthProducts com o argumento "computador", fetch deve ser chamada', async () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Com o argumento "computador", a função fetch utiliza o endpoint', async () => {
    await fetchProducts('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('O retorno da função fetchProducts deve uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
  it('Verifica se executar fetchProducts com argumento vazio retorna mensagem de erro', async () => {
      expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
