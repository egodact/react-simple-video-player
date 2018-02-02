import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import ReactPlayer from 'react-player';

const PlayerContainer = glamorous.div(({ width, height, autosize }) => {
  if (autosize) return { width: '100%', height: '100%' };
  return { width, height };
});

const parseAspectRatio = (aspectRatio) => {
  const ratioArr = aspectRatio.split(':');
  const ratio = ratioArr.map(str => Number(str));
  if (ratio.length !== 2 || Number.isNaN(ratio[0]) || Number.isNaN(ratio[1])) {
    // eslint-disable-next-line
    console.warn('Invalid aspect ratio supplied to react-simple-video-player, defaulting to 16:9');
    return [16, 9];
  }
  return ratio;
};

const SizedPlayer = ({ url, poster, playing, ...props }) => {
  const { ...options } = props;
  const aspectRatio = parseAspectRatio(options.aspectRatio);

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

  const config = poster ? { file: { attributes: { poster } } } : {};

  return (
    <PlayerContainer
      width={options.width}
      height={options.height}
      autosize={options.autosize}
    >
      <ReactPlayer
        url={url}
        config={config}
        playing={playing}
        width="100%"
        height="100%"
      />
    </PlayerContainer>
  );
};

SizedPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  poster: PropTypes.string,
  playing: PropTypes.bool.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  autosize: PropTypes.bool,
  aspectRatio: PropTypes.string
};

SizedPlayer.defaultProps = {
  autosize: false,
  aspectRatio: '16:9'
};

export default SizedPlayer;
