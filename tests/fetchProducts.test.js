require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // 1 - Teste se fetchProducts é uma função;
  it('Verifica se fecthProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  // 2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;
  it('Verifica se ao executar fecthProducts com o argumento "computador", fetch deve ser chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  // 3 - Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"
  it('Com o argumento "computador", a função fetch utiliza o endpoint', async () => {
    await fetchProducts('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  // 4 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.
  it('O retorno da função fetchProducts deve uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
  // 5 - Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error('mensagem esperada aqui') para comparar com o objeto retornado da API.
  it('Verifica se executar fetchProducts com argumento vazio retorna mensagem de erro', () => {
    try {
      fetchProducts();      
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
