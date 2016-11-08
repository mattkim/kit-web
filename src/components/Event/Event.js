import React, { Component } from 'react'
// import { get } from '../../lib/fetch';
// import { exists } from '../../lib/validator'

class Event extends Component {
  static propTypes = {
    curr_user_uuid: React.PropTypes.string,
    // TODO: is it still possible to nodeify this?
    // apiUrl: React.PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      inputs: {
        createdByEmail: "",
        inviteeEmail: "",
        currMessage: "",
      },
      errors: {
        errorMessage: "",
      },
      event: {
      },
      currentUser: {
      },
    }

    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleInviteeSubmit = this.handleInviteeSubmit.bind(this);
    // this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    // this.handlePokeSubmit = this.handlePokeSubmit.bind(this);
    this.loadEvent = this.loadEvent.bind(this)
  }

  componentDidMount() {
    this.loadEvent()

    // Really inefficient but works for now.
    setInterval(this.loadEvent, 10000)
  }

  loadEvent() {
    console.log(this.props.params.uuid)
    // if (exists(this.props.params.uuid)) {
    //   get(
    //     `${this.props.apiUrl}/event`,
    //     ["uuid"],
    //     { uuid: this.props.uuid }
    //   ).then((currEvent) => {
    //     if (currEvent) {
    //       this.setState({event: currEvent});
    //     }
    //   });
    // }
  }

  render() {
    return (
      <div >
        <h2>Welcome to React</h2>
      </div>
    );
  }
}

export default Event
