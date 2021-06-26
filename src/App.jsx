import React from 'react'
import './App.scss'
import Settings from './components/settings/settings';
import CurrentTimer from './components/current-timer/current-timer';
import sound from './sound.wav';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakTime: Number.parseInt(this.props.defaultBreakLength, 10),
      sessionTime: Number.parseInt(this.props.defaultSessionLength, 10),
      timeLabel: 'Session',
      timer: Number.parseInt(this.props.defaultSessionLength, 10) * 60,
      timerFunction: null,
      isRunning: false,
      soundFile: new Audio(sound)
    };

    this.incrementBreakTime = this.incrementBreakTime.bind(this);
    this.decrementBreakTime = this.decrementBreakTime.bind(this);
    this.incrementSessionTime = this.incrementSessionTime.bind(this);
    this.decrementSessionTime = this.decrementSessionTime.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.playSound = this.playSound.bind(this);
    this.reset = this.reset.bind(this);
    this.startSession = this.startSession.bind(this);
    this.timerControl = this.timerControl.bind(this);
  }

  incrementBreakTime = () => {
    // should not be able to set a length to > 60
    if (this.state.breakTime < 60 && !this.state.isRunning) {
      this.setState({
        breakTime: this.state.breakTime + 1
      })
    }
  }

  decrementBreakTime = () => {
    // should not be able to set a length to <= 0
    if (this.state.breakTime > 1 && !this.state.isRunning) {
      this.setState({
        breakTime: this.state.breakTime - 1
      })
    }
  }

  incrementSessionTime = () => {
    // should not be able to set a length to > 60
    if (this.state.sessionTime < 60 && !this.state.isRunning) {
      this.setState({
        sessionTime: this.state.sessionTime + 1,
        timer: (this.state.sessionTime + 1) * 60
      });
    }
  }

  decrementSessionTime = () => {
    // should not be able to set a length to <= 0
    if (this.state.sessionTime > 1 && !this.state.isRunning) {
      this.setState({
        sessionTime: this.state.sessionTime - 1,
        timer: (this.state.sessionTime - 1) * 60
      });
    }
  }

  decrementTimer() {
    this.setState({ timer: this.state.timer - 1 });
  }

  playSound(timer) {
    const { soundFile } = this.state;
    soundFile.type = 'audio/wav';

    if (timer === 0) {
      var playPromise = soundFile.play();
      console.log(playPromise);
      playPromise.data = soundFile;

      if (playPromise !== undefined) {
        playPromise.then(function () {
          console.log("Playing");
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }

  reset() {
    this.setState({
      breakTime: 5,
      sessionTime: 25,
      timeLabel: 'Session',
      timer: 1500,
      timerFunction: null,
      isRunning: false
    });

    this.state.timerFunction && clearInterval(this.state.timerFunction);

    this.sound.pause();
    this.sound.currentTime = 0;
  }

  timerControl() {
    if (this.state.timer === 0) {
      this.playSound(this.state.timer);
    } else if (this.state.timer === -1) {
      if (this.state.timeLabel === 'Session') {
        this.setState({
          timeLabel: 'Break',
          timer: this.state.breakTime * 60
        });
      } else {
        this.setState({
          timeLabel: 'Session',
          timer: this.state.sessionTime * 60
        });
      }
    }
  }

  startSession() {
    if (!this.state.isRunning) {
      this.setState({
        isRunning: !this.state.isRunning,
        timerFunction: setInterval(() => {
          this.decrementTimer();
          this.timerControl();
        }, 1000)
      })
    } else {
      this.state.timerFunction && clearInterval(this.state.timerFunction);

      this.sound.pause();
      this.sound.currentTime = 0;
      this.setState({
        isRunning: !this.state.isRunning,
        timerFunction: null
      });
    }
  }

  render() {
    return (
      <div className="app">
        <div className="app__container">
          <h1>Tomato Clock</h1>
          <div className="app__settings">
            <Settings
              title={'Break Time'}
              labelID={'break-label'}
              incrementID={'break-increment'}
              decrementID={'break-decrement'}
              valueID={'break-length'}
              time={this.state.breakTime}
              status={this.state.isRunning}
              increment={this.incrementBreakTime}
              decrement={this.decrementBreakTime}
            />
            <Settings
              title={'Session Time'}
              labelID={'session-label'}
              incrementID={'session-increment'}
              decrementID={'session-decrement'}
              valueID={'session-length'}
              time={this.state.sessionTime}
              status={this.state.isRunning}
              increment={this.incrementSessionTime}
              decrement={this.decrementSessionTime}
            />
          </div>
          <CurrentTimer
            status={this.state.isRunning}
            currentTime={this.state.timer}
            reset={this.reset}
            start={this.startSession}
            timeLabel={this.state.timeLabel}
          />
          <audio id="beep" preload="auto" ref={(audio) => { this.sound = audio; }} src="soundFile"
          />
        </div>
      </div>
    )
  }
}

export default App
