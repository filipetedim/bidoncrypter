require('./polyfill.js');

const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '+'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç', 'º'],
  ['<', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-'],
];

/**
 * Settings
 */
const settings = {
  hands: {
    left: { min: 0, max: 4 },
    right: { min: 5, max: 10 },
  },
  leftPadding: 0,
  rightPadding: 0,
};

/**
 * Validates the settings and throw errors if anything is broken.
 */
const validateSettings = ({ leftPadding, rightPadding }) => {
  if (isNaN(leftPadding)) {
    throw new Error('Left padding must be a number');
  }
  if (isNaN(rightPadding)) {
    throw new Error('Right padding must be a number');
  }
};

/**
 * Calculates the hand paddings.
 * The numbers below are to be read in their absolute values.
 *  _____________________
 * | R + L = Padding     |
 * |---------------------|
 * | -2 + 0 = 2    CHECK |
 * | -2 + 1 = 3    FAIL  |
 * | -2 + 2 = 4    FAIL  |
 * | -1 + 0 = 1    CHECK |
 * | -1 + 1 = 2    CHECK |
 * | -1 + 2 = 3    FAIL  |
 * |  0 + 0 = 0    CHECK |
 * |  0 + 1 = 0    CHECK |
 * |  0 + 2 = 2    CHECK |
 *  ---------------------
 */
const calculateHandPaddingsBalance = (left, right) => {
  // Limit values
  left = left < 0 ? 0 : left > 2 ? 2 : left;
  right =
    right > 2
      ? 2
      : right >= 0
        ? right
        : Math.abs(right) + Math.abs(left) <= 2
          ? right
          : left === 2 && right === -1
            ? 0
            : right + left;

  return { left, right };
};

/**
 * Gets the key indexes in the keyboard.
 */
const getKeyIndexes = (keys, key) => {
  let indexes = null;

  keys.forEach((line, lineIndex) => {
    const keyIndex = line.findIndex(lineKey => lineKey === key);

    if (keyIndex > -1) {
      indexes = { line: lineIndex, key: keyIndex };
    }
  });

  return indexes;
};

/**
 * Encrypts the string using the module settings.
 */
const encrypt = (string, opts) => {
  validateSettings(opts);

  // Assigns from opts or defaults to settings
  const leftPadding = opts.leftPadding || settings.leftPadding;
  const rightPadding = opts.rightPadding || settings.rightPadding;

  // Get correct maximum paddings
  const paddings = calculateHandPaddingsBalance(leftPadding, rightPadding);

  return [...string].reduce((result, key) => {
    const keyIndexes = getKeyIndexes(keys, key);

    // If no known key, return the same
    if (!keyIndexes) {
      return result + key;
    }

    // Left hand
    if (keyIndexes.key <= settings.hands.left.max) {
      keyIndexes.key = keyIndexes.key + paddings.left;
    }
    // Right hand
    else {
      const rightPaddedIndex = keyIndexes.key + paddings.right;
      keyIndexes.key =
        rightPaddedIndex > settings.hands.right.max ? settings.hands.right.max : rightPaddedIndex;
    }

    return result + keys[keyIndexes.line][keyIndexes.key];
  }, '');
};

/**
 * Sets the global settings.
 * Only the params are allowed settings, and default to the current settings.
 * @param leftPadding
 * @param rightPadding
 */
const set = ({ leftPadding = settings.leftPadding, rightPadding = settings.rightPadding }) => {
  validateSettings({ leftPadding, rightPadding });

  settings.leftPadding = leftPadding;
  settings.rightPadding = rightPadding;
};

module.exports = { set, encrypt };
