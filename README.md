# react-simple-video-player
A simple, material design video player component for React.

![Video player screenshot](https://github.com/rafaelklaessen/react-simple-video-player/raw/master/screenshots/screenshot.png "Screenshot of the video player")

## Install
`yarn add react-simple-video-player` or `npm install --save react-simple-video-player`

## Usage
### Basic example
```javascript
import VideoPlayer from 'react-simple-video-player';

const App = () => (
  <VideoPlayer url="/video.mp4" />
);
```

### Advanced example
```javascript
import VideoPlayer from 'react-simple-video-player';

const App = () => (
  <VideoPlayer
    url="/video.mp4"
    poster="/myPoster.png"
    width={400}
    height={300}
    autoplay
  />
);
```

## Props
`*` = Required

Prop | Description | default
---- | ----------- | -------
`url*`| Url of the video file to play |
`poster` | Url of the image to use as poster for the video |
`width` | Width of the video player | `640`
`height` | Height of the video player | `360`
`autosize` | If set to true, the video player will become 100% of the parent width and 100% of the parent height (if the parent does not have a height, the video player will automatically become the right height). `autosize` overrides the given `width` and `height` | `false`
`autoplay` | If set to true, the video will automatically play | `false`
`loop` | If set to true, the video will loop | `false`
`aspectRatio` | The aspect ratio of the video (see explanation below). | `16:9`

#### Usage of the `aspectRatio` prop
The `aspectRatio` prop can be used to automatically give the video player the correct height for the given width (or the correct width for the given height).

For example, in the following scenario:
```javascript
<VideoPlayer url="/video.mp4" width={400} aspectRatio="4:3" />
```
the video player would automatically become 300px high.

In the following scenario:
```javascript
<VideoPlayer url="/video.mp4" height={300} aspectRatio="4:3" />
```
the video player would automatically become 400px wide.

In the following scenario:
```javascript
<VideoPlayer url="/video.mp4" aspectRatio="4:3" />
```
the video player would automatically become 480px high (since the width defaults to 640px).

Notice that when an invalid `aspectRatio` is given, it'll be ignored.

## Notes
`react-simple-video-player` is built on top of `react-player`.
#### This project does *not* aim to provide a customisable video player.
Please use [react-player](https://www.npmjs.com/package/react-player) when you need customisability.
