// Write your code here
import {Component} from 'react'

import './index.css'


class DigitalTimer extends Component {
  state = {
  count: 25,
  isTimeRunning: false,
  timeelapsedseconds: 0,
}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.IntervalId)

  increment = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }
  decrement = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }
  resettime = () => {
    this.clearTimerInterval()
    this.setState({count: 25, isTimeRunning: false, timeelapsedseconds: 0})
  }
  incrementTimeElapsedInSeconds = () => {
    const {count, timeelapsedseconds} = this.state

    const isTimercompleted = timeelapsedseconds === count * 60
    if (isTimercompleted) {
      this.clearTimerInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        timeelapsedseconds: prevState.timeelapsedseconds + 1,
      }))
    }
  }

  getelapsedsecondsintimeformat = () => {
    const {count, timeelapsedseconds} = this.state
    const totalremaingseconds = count * 60 - timeelapsedseconds

    const minutes = Math.floor(totalremaingseconds / 60)
    const seconds = Math.floor(totalremaingseconds % 60)

    const stringifiedminutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedseconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedminutes}:${stringifiedseconds}`
  }
  startorpausetimer = () => {
    const {count, isTimeRunning, timeelapsedseconds} = this.state

    const isTimercompleted = timeelapsedseconds === count * 60
    if (isTimercompleted) {
      this.setState({timeelapsedseconds: 0})
    }
    if (isTimeRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  render() {
    const {isTimeRunning, count, timeelapsedseconds} = this.state
    const isButtonDisable = timeelapsedseconds > 0
    const labeltext = isTimeRunning ? 'Running' : 'Paused'
    const startorpauseimg = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const spalttext = isTimeRunning ? 'pause icon' : 'play icon'

    return (
      <div className="app-container">
        <div className="bg-container">
          <h1>Digital Timer</h1>
          <div>
            <div className="image-bg">
              <div className="image-bg2">
                <h1>{this.getelapsedsecondsintimeformat()}</h1>
                <p>{labeltext}</p>
              </div>
            </div>
            <div className="button-bg">
              <div className="btn-bg2">
                <button
                  className="btn-bg3"
                  type="button"
                  onClick={this.startorpausetimer}
                >
                  <img src={startorpauseimg} className="icon" alt={spalttext} />
                  <p>{isTimeRunning ? 'Pause' : 'Start'}</p>
                </button>
                <button
                  className="btn-bg4"
                  type="button"
                  onClick={this.resettime}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="icon"
                    alt="reset icon"
                  />
                  <p>Reset</p>
                </button>
              </div>
              <p>Set Timer limit</p>
              <div>
                <button
                  type="button"
                  className="btn1"
                  onClick={this.decrement}
                  disabled={isButtonDisable}
                >
                  -
                </button>
                <button type="button" className="btn2">
                  <p>{count}</p>
                </button>
                <button
                  type="button"
                  className="btn3"
                  onClick={this.increment}
                  disabled={isButtonDisable}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
