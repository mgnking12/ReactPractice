import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';


//  you can use ReactDOM.render() multiple times across your application, but in a plain React application, you would only use it once tobootstrap the component tree. ////// This is always going to expect two arguments, the first, a components to render JSX or simple JSX itself, the second, where to place the React App in our HTML file. 
ReactDOM.render(<App />, document.getElementById('root'));

// Hot Module Replacement, shows your changes in the browser without having to reloading the page //////// The most useful benefit of HMR is that you can keep the application state after the applicationreloads.
if (module.hot) {
module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
