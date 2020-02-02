/**
 * Class to represent a Polynomial function.
 */
class Polynomial {
  constructor(coeff) {
    this.coeff = coeff;
  }

  /**
   * Adds 2 polynomials together and returns the resulting polynomial.
   * @param {Polynomial} other
   */
  add(other) {
    const newCoeff = [];
    const maxDegree = Math.max(this.coeff.length, other.coeff.length);
    for (let i = 0; i < maxDegree; i++) {
      newCoeff.push((this.coeff[i] || 0) + (other.coeff[i] || 0));
    }
    return new Polynomial(newCoeff);
  }

  /**
   * Multiplies 2 polyonmials together and returns the resulting polynomial.
   * @param {Polynomial} other
   */
  multiply(other) {
    const coeff = new Array(this.coeff.length + other.coeff.length - 1);
    coeff.fill(0);
    for (let i = 0; i < this.coeff.length; i++) {
      for (let j = 0; j < other.coeff.length; j++) {
        const product = this.coeff[i] * other.coeff[j];
        const index = i + j;
        coeff[index] += product;
      }
    }
    return new Polynomial(coeff);
  }

  /**
   * Evalutes the polynomial with the given value `x`.
   * @param {number} x
   * @return {number}
   */
  evaluate(x) {
    return this.coeff.reduce((previous, current, i) => {
      return previous + current * x ** i;
    }, 0);
  }
}

module.exports = Polynomial;
