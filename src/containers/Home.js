import React, { Component } from 'react';
import { Input, Row, Col } from 'reactstrap';
import Bidoncrypter from '../bidoncrypter';
import { Range } from 'rc-slider';

// Components
import PageWrapper from '../components/PageWrapper';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paddingValues: [0, 3],
      toEncrypt: '',
      encrypted: '',
    };
  }

  componentDidMount() {
    document.title = 'Bidoncrypter';
  }

  /**
   * Handles the event change for the slider.
   * Limits the left hand to +2 padding, as the encrypter will ignore anything more.
   * When using the right hand value, needs to remove 3 as base value is 3 for the sake of slider.
   * @param values
   */
  handleSliderChange = values => {
    if (values[0] > 2) {
      values[0] = 2;
    }

    this.setState({ paddingValues: values });
    this.bidoncrypt(this.state.toEncrypt, values[0], values[1] - 3);
  };

  /**
   * Handles the event change. Calls the encrypter function.
   * @param event
   */
  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });

    this.bidoncrypt(value, this.state.paddingValues[0], this.state.paddingValues[1] - 3);
  };

  /**
   * Encrypts the string.
   */
  bidoncrypt = (string, leftPadding, rightPadding) => {
    const encrypted = Bidoncrypter.encrypt(string, { leftPadding, rightPadding });
    this.setState({ encrypted });
  };

  render() {
    return (
      <PageWrapper>
        <Row>
          <Col xs={12} className="text-left">
            <span>Left hand padding: {this.state.paddingValues[0]}</span>
            <span className="float-right">
              Right hand padding: {this.state.paddingValues[1] - 3}
            </span>
          </Col>
          <Col xs={12} className="mb-3">
            <Range
              allowCross={false}
              pushable={1}
              min={0}
              max={5}
              value={this.state.paddingValues}
              onChange={this.handleSliderChange}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Input
              value={this.state.toEncrypt}
              onChange={this.handleInputChange}
              type="text"
              name="toEncrypt"
              id="toEncrypt"
              placeholder="Please insert text to encrypt"
            />
          </Col>
        </Row>
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
