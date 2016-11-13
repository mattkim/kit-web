import React, { Component } from 'react';
import './Event.css';
import { get, post } from '../../lib/fetch';
import { exists } from '../../lib/validator';
import {
  createInputChangeHandler,
  dynamicDisplayValue,
  createListGroup,
} from '../../lib/input';
import {
  Button,
  Col,
  Form,
  FormControl,
  Grid,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { Button as IGButton } from 'react-bootstrap/lib/InputGroup'
import { browserHistory } from 'react-router'

class Event extends Component {
  static propTypes = {
    curr_user_uuid: React.PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      createdByEmail: "",
      inviteeEmail: "",
      currMessage: "",
      errorMessage: "",
      event: {
        uuid: "",
        created_by_user: {
          uuid: "",
          email: "",
        },
        invitees: [],
        messages: [],
      },
      currentUser: {
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInviteeSubmit = this.handleInviteeSubmit.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    // this.handlePokeSubmit = this.handlePokeSubmit.bind(this);
    this.loadEvent = this.loadEvent.bind(this)
  }

  componentDidMount() {
    this.loadEvent()
    // Really inefficient but works for now.
    setInterval(this.loadEvent, 10000)
  }

  // Initiliazers

  loadEvent() {
    if (exists(this.props.params.uuid)) {
      get(
        'event',
        { uuid: this.props.params.uuid }
      ).then((currEvent) => {
        if (currEvent) {
          this.setState({event: currEvent})
        }
      });
    }
  }

  // Handlers

  async updateEvent(event) {
    if (event.uuid) {
      this.createEvent(event);
    }
  }

  async createEvent(event) {
    this.setState({event})
    this.setState({event: await post('event/create', event)})
  }

  async handleMessageSubmit(e) {
    e.preventDefault();

    const event = this.state.event
    event.messages.push({
      created_by_user_uuid: this.props.curr_user_uuid,
      event_uuid: this.state.event.uuid,
      message: this.state.currMessage,
    });

    await this.updateEvent(event);

    this.setState({ currMessage: "" });
    e.target[0].value = '';
  }

  async handleInviteeSubmit(e) {
    e.preventDefault();

    if (!this.state.inviteeEmail) {
      return
    }

    const event = this.state.event
    event.invitees.push({email: this.state.inviteeEmail});

    this.updateEvent(event);

    this.setState({inviteeEmail: null});
    e.target[0].value = '';
  }

  async handleSubmit(e) {
    const event = this.state.event
    event.created_by_user.email = this.state.createdByEmail

    await this.createEvent(event)

    if (!this.props.params.uuid && this.state.event.uuid && this.state.event.created_by_user.uuid) {
      browserHistory.push({pathname: `/event/${this.state.event.uuid}`, query: {curr_user_uuid: this.state.event.created_by_user.uuid}})
    }
  }

  // Renderers

  renderInvitees() {
    return createListGroup(
      this.state.event.invitees,
      function(item) {
        return item.email;
      }
    );
  }

  renderActionButton() {
    if (exists(this.props.params.uuid)) {
      return (
        <div>
          <Button
            bsStyle="info" bsSize="large" block
          >
            Poke
          </Button>
        </div>
      )
    } else {
      return (
        <Button
          bsStyle="success" bsSize="large" block
          onClick={this.handleSubmit}
        >
          Create
        </Button>
      )
    }
  }

  render() {
    return (
      <div className='root'>
        <div className='container'>
          <Grid>
            <Row>
              <Col sm={0} md={3}/>
              <Col sm={12} md={6}>
                <FormControl
                  placeholder="My Email"
                  autoComplete="on"
                  onChange={createInputChangeHandler(this, 'createdByEmail')}
                  value={dynamicDisplayValue(this.state.createdByEmail, this.state.event.created_by_user.email)}
                />
                <br/>
              </Col>
              <Col sm={0} md={3}/>
            </Row>
            <Row>
              <Col sm={0} md={3}/>
              <Col sm={12} md={6}>
                {this.renderInvitees()}
                <Form onSubmit={this.handleInviteeSubmit}>
                  <InputGroup>
                    <FormControl
                      placeholder="Friend's Email"
                      autoComplete="on"
                      onChange={createInputChangeHandler(this, 'inviteeEmail')}
                    />
                    <IGButton>
                      <Button type="submit">
                        Send
                      </Button>
                    </IGButton>
                  </InputGroup>
                </Form>
                <br/>
              </Col>
              <Col sm={0} md={3}/>
            </Row>
            <Row>
              <Col sm={0} md={3}/>
              <Col sm={12} md={6}>
                <Form onSubmit={this.handleMessageSubmit}>
                  <InputGroup>
                    <FormControl
                      placeholder="Write a message"
                      autoComplete="off"
                      ref="nameInput"
                      onChange={createInputChangeHandler(this, 'currMessage')}
                    />
                    <IGButton>
                      <Button type="submit">
                        Send
                      </Button>
                    </IGButton>
                  </InputGroup>
                </Form>
                <br/>
              </Col>
              <Col sm={0} md={3}/>
            </Row>
            <Row>
              <Col sm={0} md={3}/>
              <Col sm={12} md={6}>
                {this.renderActionButton()}
              </Col>
              <Col sm={0} md={3}/>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Event
