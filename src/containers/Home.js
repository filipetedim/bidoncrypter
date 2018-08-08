import React, { Component } from 'react';
import { Input, Row, Col } from 'reactstrap';
import Bidoncrypter from '../bidoncrypter';

// Components
import PageWrapper from '../components/PageWrapper';

class Home extends Component {
  constructor(props) {
    super(props);

    this.keys = [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '+'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç', 'º'],
      ['<', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-'],
    ];
    this.hands = {
      left: { min: 0, max: 4 },
      right: { min: 5, max: 10 },
    };

    this.state = {
      toEncrypt: '',
      encrypted: '',
    };
  }

  componentDidMount() {
    document.title = 'Bidoncrypter';
  }

  /**
   * Handles the event change. Calls the encrypter function.
   * @param event
   */
  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });

    this.bidoncrypt(value, 0, 1);
  };

  getKeyIndexes = (keys, key) => {
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
  calculateHandPaddings = (left, right) => {
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
   * Encrypts the string.
   */
  bidoncrypt = (string, leftPadding, rightPadding) => {
    const paddings = this.calculateHandPaddings(leftPadding, rightPadding);

    const encrypted = [...string].reduce((result, key) => {
      const keyIndexes = this.getKeyIndexes(this.keys, key);

      // If no known key, return the same
      if (!keyIndexes) {
        return result + key;
      }

      // Left hand
      if (keyIndexes.key <= this.hands.left.max) {
        keyIndexes.key = keyIndexes.key + paddings.left;
      }
      // Right hand
      else {
        const rightPaddedIndex = keyIndexes.key + paddings.right;
        keyIndexes.key =
          rightPaddedIndex > this.hands.right.max ? this.hands.right.max : rightPaddedIndex;
      }

      return result + this.keys[keyIndexes.line][keyIndexes.key];
    }, '');

    this.setState({ encrypted: Bidoncrypter.encrypt(string) });
  };

  render() {
    return (
      <PageWrapper>
        <Input
          value={this.state.toEncrypt}
          onChange={this.handleInputChange}
          type="text"
          name="toEncrypt"
          id="toEncrypt"
          placeholder="Please insert text to encrypt"
        />
        <Row className="text-left mt-3">
          <Col xs={12} className="font-weight-bold">
            Encrypted bidonese:
          </Col>
          <Col>{this.state.encrypted}</Col>
        </Row>
      </PageWrapper>
    );
  }
}

export default Home;
