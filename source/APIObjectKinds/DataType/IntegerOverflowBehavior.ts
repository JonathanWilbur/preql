enum IntegerOverflowBehavior {
  ZERO = 'ZERO', // Set to zero.
  MIN = 'MIN', // Set to the minimum.
  MAX = 'MAX', // Set to the maximum.
  IGNORE = 'IGNORE', // Keep the original value / do not change it.
  ERROR = 'ERROR', // Throw an error.
};

export default IntegerOverflowBehavior;
