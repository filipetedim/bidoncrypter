import React, { Component } from 'react';
import { Input, Row, Col } from 'reactstrap';
import Bidoncrypter from '../bidoncrypter';

// Components
import PageWrapper from '../components/PageWrapper';

class Home extends Component {
  constructor(props) {
    super(props);

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

  /**
   * Encrypts the string.
   */
  bidoncrypt = (string, leftPadding, rightPadding) => {
    this.setState({ encrypted: Bidoncrypter.encrypt(string, { leftPadding, rightPadding }) });
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
