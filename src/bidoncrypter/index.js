require('./polyfill.js');

const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '+'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç', 'º'],
  ['<', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-'],
];

const settings = {
  hands: {
    left: { min: 0, max: 4 },
    right: { min: 5, max: 10 },
  },
  leftPadding: 0,
  rightPadding: 0,
};

/**
 * Calculates the hand paddings. (Below are absolute values)
 * Right + Left = padding
 * 2 + 0 = 2    CHECK
 * 2 + 1 = 3    FAIL
 * 2 + 2 = 4    FAIL
 * 1 + 0 = 1    CHECK
 * 1 + 1 = 2    CHECK
 * 1 + 2 = 3    FAIL
 * 0 + 0 = 0    CHECK
 * 0 + 1 = 0    CHECK
 * 0 + 2 = 2    CHECK
 *
 */
const calculateHandPaddings = (left, right) => {
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
  if (!opts) {
    // TODO clone global opts
  }

  const paddings = calculateHandPaddings(settings.leftPadding, settings.rightPadding);

  const encrypted = [...string].reduce((result, key) => {
    const keyIndexes = getKeyIndexes(keys, key);
  }, '');

  return string;
};

const set = () => 'bye';

module.exports = { set, encrypt };
