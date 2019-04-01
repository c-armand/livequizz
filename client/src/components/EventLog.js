import React, { Component } from 'react'

class EventLog extends Component {
  constructor(props) {
    super(props)
    this.eventList = React.createRef();
  }

  componentDidUpdate() {
    this.eventList.current.scrollTo(0, this.eventList.current.getElementsByTagName('ul')[0].scrollHeight);
  }

  render() {
    const eventItems = this.props.events.map(e => {
      return (
        <li key={e.id}>{e.content}</li>
      )
    })

    return (
      <div className="EventLog p-3">
        <div className="log-title pl-3 pb-2 pt-2">Journal</div>
        <div className="log-container" ref={this.eventList}>
          <ul>
            {eventItems}
          </ul>
        </div>
      </div>
    )
  }
}

export default EventLog;
