const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Verifica se é função', () => {
    expect(typeof getSavedCartItems).toBe('function');
  });
  it('Verifica se chamada a função localStorage é chamado', async () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('Verifica se chamada a função localStorage é chamado', async () => {
    getSavedCartItems();
    expect(appendChild).toHaveBeenCalled();
  });
});
