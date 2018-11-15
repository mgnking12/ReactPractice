// https://facebook.github.io/create-react-app/docs/running-tests
// https://jestjs.io/docs/en/using-matchers

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
