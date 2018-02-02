import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import ReactPlayer from 'react-player';

const PlayerContainer = glamorous.div(({ width, height, autosize }) => {
  if (autosize) return { width: '100%', height: '100%' };
  return { width, height };
});

export default class VideoPlayer extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    autosize: PropTypes.bool,
    autoplay: PropTypes.bool,
    aspectRatio: PropTypes.string
  };

  static defaultProps = {
    autosize: false,
    autoplay: false,
    aspectRatio: '16:9'
  };

  state = { playing: this.props.autoplay };

  onPlay = () => this.setState({ playing: true });
  onPause = () => this.setState({ playing: false });

  parseAspectRatio = (aspectRatio) => {
    const ratioArr = aspectRatio.split(':');
    const ratio = ratioArr.map(str => Number(str));
    if (ratio.length !== 2 || Number.isNaN(ratio[0]) || Number.isNaN(ratio[1])) {
      console.warn('Invalid aspect ratio supplied to react-simple-video-player, defaulting to 16:9');
      return [16, 9];
    }
    return ratio;
  };

  render = () => {
    const { ...options } = this.props;
    const aspectRatio = this.parseAspectRatio(options.aspectRatio);

    if (!options.autosize && !options.width && !options.height) {
      options.width = 640;
      options.height = options.width / aspectRatio[0] * aspectRatio[1];
    }

    if (!options.autosize && options.width && !options.height) {
      options.height = options.width / aspectRatio[0] * aspectRatio[1];
    }

    if (!options.autosize && options.height && !options.width) {
      options.width = options.height / aspectRatio[1] * aspectRatio[0];
    }

    return (
      <PlayerContainer
        width={options.width}
        height={options.height}
        autosize={options.autosize}
      >
        <ReactPlayer url={this.props.url} width="100%" height="100%" />
      </PlayerContainer>
    );
  };
}
