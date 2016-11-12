import React from 'react';
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

function handleInputChange(t, key, e) {
  const m = {};
  m[key] = e.target.value;
  t.setState(m);
}

function createInputChangeHandler(t, key) {
  return createInputHandler(t, key, handleInputChange);
}

function createInputHandler(t, key, handler) {
  return handler.bind(this, t, key);
}

function createListGroupItems(items, itemTransform) {
  const listGroupItems = [];

  items.forEach(item => {
    listGroupItems.push(
      <ListGroupItem>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            {itemTransform(item)}
          </Col>
        </Row>
      </ListGroupItem>
    );
  });

  return listGroupItems;
}

function createListGroup(items, itemTransform) {
  if (!items){
    return null
  }

  return (
    <ListGroup>
      {createListGroupItems(items, itemTransform)}
    </ListGroup>
  );
}

function validEmail(email) {
  if (!email) {
    return false;
  }

  if (email.match('.+@.+\\..+')) {
    return true;
  }

  return false;
}

function dynamicDisplayValue(inputVal, stateVal) {
  if (inputVal) {
    return inputVal;
  }

  return stateVal;
}

export { dynamicDisplayValue, handleInputChange, createInputChangeHandler, createListGroup, validEmail };
