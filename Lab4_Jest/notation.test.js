const { mean } = require('./notation');

test('mean of [10, 20, 30] is 20', () => {
  expect(mean([10, 20, 30])).toBe(20);
});

test('mean of empty array is 0', () => {
  expect(mean([])).toBe(0);
});

test('mean of invalid input is 0', () => {
  expect(mean(null)).toBe(0);
});
