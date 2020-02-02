const Polynomial = require('./polynomial');

test('Creates polynomial with expected terms', () => {
  const terms = [2, 5, 3, 8];
  const p = new Polynomial(terms);
  expect(p.coeff).toEqual(terms);
});

test('Adds two polynomials', () => {
  const p1 = new Polynomial([2, 5, 3, 8]);
  const p2 = new Polynomial([1, 7, 4, 3]);
  const result = p1.add(p2);
  expect(result.coeff).toEqual([3, 12, 7, 11]);
});

test('Multiplies two polynomials of different degrees', () => {
  const p1 = new Polynomial([2]);
  const p2 = new Polynomial([3, 5]);
  const result = p1.multiply(p2);
  expect(result.coeff).toEqual([6, 10]);
});

test('Multiplies two polynomials of same degree 2', () => {
  const p1 = new Polynomial([2, 4]);
  const p2 = new Polynomial([3, 5]);
  const result = p1.multiply(p2);
  expect(result.coeff).toEqual([6, 22, 20]);
});

test('Multiplies two polynomials of same degree 3', () => {
  const p1 = new Polynomial([2, 4, 6]);
  const p2 = new Polynomial([1, 3, 5]);
  const result = p1.multiply(p2);
  expect(result.coeff).toEqual([2, 10, 28, 38, 30]);
});
