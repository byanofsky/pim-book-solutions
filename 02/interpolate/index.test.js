const interpolate = require('./index');

test('Interpolate a single point', () => {
  const result = interpolate([[1, 2]]);
  expect(result.coeff).toEqual([2]);
});

test('Interpolate two points', () => {
  const result = interpolate([
    [1, 3],
    [2, 7]
  ]);
  expect(result.coeff).toEqual([-1, 4]);
});

test('Interpolate three points', () => {
  const result = interpolate([
    [1, 3],
    [5, 7],
    [8, 9]
  ]);
  expect(result.evaluate(1)).toBeCloseTo(3, 4);
  expect(result.evaluate(5)).toBeCloseTo(7, 4);
  expect(result.evaluate(8)).toBeCloseTo(9, 4);
});

test('Throws if no points', () => {
  expect(() => {
    interpolate([]);
  }).toThrow();
});

test('Throws if point x values not in increasing order', () => {
  expect(() => {
    interpolate([
      [5, 4],
      [3, 2]
    ]);
  }).toThrow();
});
