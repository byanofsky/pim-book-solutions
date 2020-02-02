const Polynomial = require('./polynomial');

/**
 * Given `n+1` points, returns the unique polynomial of degree at most `n` passing through the given points.
 * Calculates the single term for each point i and then sums each term into a final polynomial.
 * @param {Point[]} points the points which the poynomial must pass through
 * @return {Polynomial} the polynomial which passes through the given points
 */
const interplote = points => {
  if (points.length === 0) {
    throw new Error('Must provide at least 1 point');
  }
  if (!isXPointIncreasing(points)) {
    throw new Error('Points must have x values in increasing value');
  }
  const terms = points.map((_, i) => singleTerm(points, i));
  return sum(terms);
};

/**
 * Calculates a single term of the polynomial interpolation formula as the product of the resulting value
 * of the formula for each point j that is not point i.
 * The formula for each point of the single term is:
 * ```
 * (x - xj) / (xi - xj)
 * ```
 * To allow using our polynomial class, this formula is represented as:
 * ```
 * (-xj)/(xi-xj) + 1/(xi-xj) * x
 * ```
 * Returns a polynomial that represents the single term.
 * @param {*} points
 * @param {*} i
 */
const singleTerm = (points, i) => {
  const xi = points[i][0];
  const yi = points[i][1];
  let term = new Polynomial([1]);
  points.forEach((point, j) => {
    if (j === i) {
      return;
    }
    const xj = point[0];
    term = term.multiply(new Polynomial([-xj / (xi - xj), 1 / (xi - xj)]));
  });
  return term.multiply(new Polynomial([yi]));
};

const sum = terms => {
  return terms.reduce(
    (previous, current) => previous.add(current),
    new Polynomial([0])
  );
};

/**
 * Returns true if the given points have `x` values in increasing order.
 * @param {Point[]} points an array of points
 * @return {boolean}
 */
const isXPointIncreasing = points => {
  for (let i = 1; i < points.length; i++) {
    if (!(points[i - 1] < points[i])) {
      return false;
    }
  }
  return true;
};

module.exports = interplote;
