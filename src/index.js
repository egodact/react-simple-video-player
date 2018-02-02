import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import SizedPlayer from './SizedPlayer';

export default class VideoPlayer extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    poster: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    autosize: PropTypes.bool,
    autoplay: PropTypes.bool,
    aspectRatio: PropTypes.string
  };

  static defaultProps = {
    autoplay: false
  };

  state = { playing: this.props.autoplay };

  onPlay = () => this.setState({ playing: true });
  onPause = () => this.setState({ playing: false });

  render = () => (
    <SizedPlayer playing={this.state.playing} {...this.props} />
  );
}
