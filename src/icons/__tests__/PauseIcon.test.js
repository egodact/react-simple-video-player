import React from 'react';
import ReactDOM from 'react-dom';
import PauseIcon from '../PauseIcon';

describe('<PauseIcon />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PauseIcon />, div);
  });
});
