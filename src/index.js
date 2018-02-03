import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import SizedPlayer from './SizedPlayer';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';

const Player = glamorous.div({
  position: 'relative',
  lineHeight: 0,
  display: 'inline-block'
}, ({ autosize }) => {
  if (autosize) return { width: '100%', height: '100%' };
});

const overlayStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
};

const Overlay = glamorous.div(overlayStyles, {
  backgroundColor: 'rgba(0, 0, 0, .5)',
  opacity: 0,
  transition: 'all 450ms cubic-bezier(.23, 1, .32, 1) 0ms',
  cursor: 'pointer'
}, ({ shown }) => {
  if (shown) return { opacity: 1 };
});

const InnerOverlay = glamorous.div(overlayStyles);

const PlayButton = glamorous.div({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 72,
  height: 72
});

export default class VideoPlayer extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    poster: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    autosize: PropTypes.bool,
    autoplay: PropTypes.bool,
    loop: PropTypes.bool,
    aspectRatio: PropTypes.string
  };

  static defaultProps = {
    loop: false,
    autoplay: false
  };

  state = {
    playing: this.props.autoplay,
    overlayShown: !this.props.autoplay
  };

  onPlay = () => {
    this.setState({
      playing: true,
      overlayShown: false
    });
  };

  onPause = () => {
    this.setState({
      playing: false,
      overlayShown: true
    });
  };

  onMouseOver = () => this.setState({ overlayShown: true });

  onMouseLeave = () => {
    if (!this.state.playing) {
      this.setState({ overlayShown: true });
      return;
    }

    this.setState({ overlayShown: false });
  };

  render = () => {
    const playing = this.state.playing;
    const autosize = this.props.autosize;
    return (
      <Player
        autosize={autosize}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
      >
        <SizedPlayer playing={playing} {...this.props} />
        <Overlay
          shown={this.state.overlayShown}
          onClick={playing ? this.onPause : this.onPlay}
        >
          <PlayButton>
            {playing ? <PauseIcon /> : <PlayIcon />}
          </PlayButton>
          <InnerOverlay />
        </Overlay>
      </Player>
    );
  }
}
