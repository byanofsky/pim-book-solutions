const interpolate = require('../interpolate');
const Polynomial = require('../interpolate/polynomial');

/** Maximum value for random coefficients */
const MAX_COEFF = 1000;

/**
 * Encode a given string as a number.
 * @param {String} secret the secret to encode
 * @returns {Number} returns a numeric representation of the secret
 * TODO: Need encoding protocol to allow encode and decode, such as Huffman encoding
 */
const encode = secret =>
  secret
    .split('')
    .reduce((previous, current) => previous + current.charCodeAt(0), 0);

/**
 * Creates a secret polynomial which protects the given secret value. The polynomial will have degree k-1, thereby requiring
 * at least k shared points in order to determine the secret.
 * @param {String} secret
 * @param {Number} k
 * @returns {Polynomial}
 */
const createSecretPolynomial = (secret, k) => {
  /** Required degree to enforce k */
  const d = k - 1;
  /** The coefficients for the polynomial to reveal the secret */
  const coeffs = [secret];
  for (let i = 0; i < d; i++) {
    // Random coeff between 1 and MAX_COEFF
    const rand = Math.floor(Math.random() * (MAX_COEFF - 1)) + 1;
    coeffs.push(rand);
  }

  return new Polynomial(coeffs);
};

/**
 * Given a secret polynomial, returns `n` shared points.
 * ```
 * [
 *   [1, f(1)],
 *   [2, f(2)],
 *   ...,
 *   [n, f(n)]
 * ]
 * ```
 * @param {Polynomial} secretPolynomial
 * @param {Number} n
 */
const getSharedPoints = (secretPolynomial, n) => {
  const points = [];
  for (let i = 0; i < n; i++) {
    points.push([i + 1, secretPolynomial.evaluate(i + 1)]);
  }
  return points;
};

/** Minimum number of points required to reveal secret */
const k = 3;
const n = 5;

const secret = encode('My name is Brandon');

const f = createSecretPolynomial(secret, k);
const sharedPoints = getSharedPoints(f, n);

const g = interpolate(sharedPoints);

console.log('Encoded secret:', secret);
console.log('Secret returned by g:', g.evaluate(0));
console.log('Are equal:', secret === g.evaluate(0));
