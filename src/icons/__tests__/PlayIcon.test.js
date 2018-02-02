import React from 'react';
import ReactDOM from 'react-dom';
import PlayIcon from '../PlayIcon';

describe('<PlayIcon />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PlayIcon />, div);
  });
});
