require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Verifica se é função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Executar fetchItem e ver se fetch é chamado', async () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Com o argumento "MLB1615760527", a função fetch utiliza o endpoint', async () => {
    await fetchItem('MLB1615760527');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('O retorno de fetchItem("MLB1615760527") deve ser igual a "item"', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  it('Verifica se executar fetchItem com argumento vazio retorna mensagem de erro', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
});
});
