import React from 'react';
import GetIcon from './Icons';

class SoundBTN extends React.Component {
  constructor() {
    super();

    this.state = ({
      name: 'volumeMuteFill',
      className: 'sound-icon-false',
      justifyContent: 'flex-end',
      btn: false,
    });

    this.changeState = this.changeState.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const playBGM = localStorage.getItem('playBGM');
    this.changeState('btn', playBGM);
    this.changeState('name', 'volumeUpFill');
    this.changeState('className', 'sound-icon-true');
    this.changeState('justifyContent', 'flex-start');
  }

  componentDidUpdate() {
    const { btn } = this.state;
    localStorage.setItem('playBGM', btn);
  }

  getBGM() {
    const { btn } = this.state;
    if (!btn) return '';
    return (
      <audio
        src="/audio/bgm.mp3"
        autoPlay
        loop
      >
        <track kind="captions" />
      </audio>
    );
  }

  changeState(key, value) {
    this.setState({ [key]: value });
  }

  handleClick() {
    const { btn } = this.state;
    if (!btn) {
      this.setState({
        name: 'volumeUpFill',
        className: 'sound-icon-true',
        justifyContent: 'flex-start',
        btn: !btn,
      });
    } else {
      this.setState({
        name: 'volumeMuteFill',
        className: 'sound-icon-false',
        justifyContent: 'flex-end',
        btn: !btn,
      });
    }
  }

  render() {
    const { name, className, justifyContent } = this.state;
    return (
      <div className="sound-btn-container">
        <button
          type="button"
          className="sound-btn"
          style={ { justifyContent } }
          onClick={ () => this.handleClick() }
        >
          <div className={ className }>
            <GetIcon name={ name } />
          </div>
        </button>
        { this.getBGM() }
      </div>
    );
  }
}

export default SoundBTN;
