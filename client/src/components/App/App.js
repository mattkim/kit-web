import React, { Component } from 'react';
import { Link } from 'react-router';
import {
  Row,
  Col,
} from 'react-bootstrap';

class App extends Component {
  render() {
    return(
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} className={'centerText'}>
            <span className={'strongText'}>
              <Link to="/">
                <h2>KiT</h2>
              </Link>
            </span>
          </Col>
        </Row>
        {this.props.children}
      </div>
    )
  }
}

export default App
