const { first, last, concatStrings, chunk } = require('./utils');

test('first n elements', () => {
  expect(first([1,2,3,4], 2)).toEqual([1,2]);
});

test('last n elements', () => {
  expect(last([1,2,3,4], 2)).toEqual([3,4]);
});

test('concat strings', () => {
  expect(concatStrings(["Red","Green"])).toBe("RedGreen");
});

test('chunk array', () => {
  expect(chunk([1,2,3,4,5], 2)).toEqual([[1,2],[3,4],[5]]);
});
