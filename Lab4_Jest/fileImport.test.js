console.log = jest.fn();

// require will automatically run the code
require('./fileImport');

test('prints correct average', () => {
  expect(console.log).toHaveBeenCalledWith("Moyenne:", 14);
});

test('prints the notes array', () => {
  expect(console.log).toHaveBeenCalledWith("Notes:", [10, 14, 16, 12, 18]);
});
