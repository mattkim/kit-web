import React, { Component } from 'react';
import { Link } from 'react-router';
import './Home.css';
import TiCoffee from 'react-icons/lib/ti/coffee';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <div className='root'>
        <div className='container'>
          <Grid>
            <Row>
              <br />
              <Col xs={2} sm={4} md={4} lg={4} />
              <Col xs={8} sm={4} md={4} lg={4} className='centerText'>
                <br/>
                <br/>
                <p>
                  Hey! Keep in touch with our friends.
                  <br/>
                  <br/>
                  Creating events will help us meet up more often and grow stronger relationships.
                  <br/>
                  Testing.
                </p>
                <br/>
                <br/>
                <Link to="/event">
                  <TiCoffee className='superLarge'/>
                  <h1>Create Event</h1>
                </Link>
              </Col>
              <Col xs={2} sm={4} md={4} lg={4} />
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home;
